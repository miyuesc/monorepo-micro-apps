import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import type {
  CreateConfig,
  HttpClient,
  HttpModule,
  HttpResponse,
  InterceptorItem,
  InterceptorManager,
  InterceptorOptions,
  RequestConfig,
  RequestInterceptorFulfilled,
  RequestInterceptorRejected,
  ResponseInterceptorFulfilled,
  ResponseInterceptorRejected,
} from './types'

/** 创建拦截器管理器 */
function createInterceptorManager<F, R>(): InterceptorManager<F, R> {
  const interceptors: Array<InterceptorItem<F, R>> = []
  let idCounter = 0

  return {
    use(fulfilled: F, rejected?: R, options: InterceptorOptions = {}): number {
      const id = idCounter++
      interceptors.push({
        id,
        fulfilled,
        rejected,
        priority: options.priority ?? 0,
      })
      return id
    },

    eject(id: number): void {
      const index = interceptors.findIndex(item => item.id === id)
      if (index !== -1) {
        interceptors.splice(index, 1)
      }
    },

    clear(): void {
      interceptors.length = 0
    },

    getAll(): Array<InterceptorItem<F, R>> {
      // 按优先级从高到低排序
      return [...interceptors].sort((a, b) => b.priority - a.priority)
    },
  }
}

/** 将通用 RequestConfig 转换为 AxiosRequestConfig */
function toAxiosConfig<D = any>(config: RequestConfig<D>): AxiosRequestConfig<D> {
  const axiosConfig: AxiosRequestConfig<D> = {
    url: config.url,
    method: config.method,
    baseURL: config.baseURL,
    headers: config.headers,
    params: config.params,
    data: config.data,
    timeout: config.timeout,
    withCredentials: config.withCredentials,
    signal: config.signal,
  }

  // 处理 responseType
  if (config.stream) {
    axiosConfig.responseType = 'stream'
  }
  else if (config.responseType && config.responseType !== 'stream') {
    axiosConfig.responseType = config.responseType
  }

  return axiosConfig
}

/** 将 AxiosResponse 转换为通用 HttpResponse */
function toHttpResponse<T>(response: AxiosResponse<T>, config: RequestConfig): HttpResponse<T> {
  const headers: Record<string, string> = {}
  if (response.headers) {
    Object.entries(response.headers).forEach(([key, value]) => {
      if (typeof value === 'string') {
        headers[key] = value
      }
    })
  }

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers,
    config,
  }
}

/** 处理流式响应 */
async function handleStreamResponse<T>(
  response: AxiosResponse,
  config: RequestConfig,
  onStream?: (chunk: string) => void,
): Promise<HttpResponse<T>> {
  const stream = response.data
  let fullContent = ''

  // 处理 Node.js 环境的流
  if (stream && typeof stream.on === 'function') {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line node/prefer-global/buffer
      stream.on('data', (chunk: Buffer) => {
        const text = chunk.toString()
        fullContent += text
        onStream?.(text)
      })

      stream.on('end', () => {
        resolve(toHttpResponse({ ...response, data: fullContent as T }, config))
      })

      stream.on('error', reject)
    })
  }

  // 处理浏览器环境的 ReadableStream
  if (stream && typeof stream.getReader === 'function') {
    const reader = stream.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done)
        break
      const text = decoder.decode(value, { stream: true })
      fullContent += text
      onStream?.(text)
    }

    return toHttpResponse({ ...response, data: fullContent as T }, config)
  }

  return toHttpResponse(response, config)
}

/** 创建 Axios HTTP 客户端 */
function createAxiosClient(createConfig: CreateConfig = {}): HttpClient {
  let config: CreateConfig = { ...createConfig }

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.baseURL,
    headers: config.headers,
    timeout: config.timeout,
    withCredentials: config.withCredentials,
  })

  const requestInterceptors = createInterceptorManager<RequestInterceptorFulfilled, RequestInterceptorRejected>()
  const responseInterceptors = createInterceptorManager<ResponseInterceptorFulfilled, ResponseInterceptorRejected>()

  /** 执行请求 */
  async function request<T = any, D = any>(requestConfig: RequestConfig<D>): Promise<HttpResponse<T>> {
    // 合并配置
    let mergedConfig: RequestConfig<D> = {
      baseURL: config.baseURL,
      headers: { ...config.headers, ...requestConfig.headers },
      timeout: config.timeout ?? requestConfig.timeout,
      withCredentials: config.withCredentials,
      ...requestConfig,
    }

    // 执行请求拦截器（按优先级从高到低）
    const reqInterceptors = requestInterceptors.getAll()
    for (const interceptor of reqInterceptors) {
      try {
        mergedConfig = await interceptor.fulfilled(mergedConfig)
      }
      catch (error) {
        if (interceptor.rejected) {
          await interceptor.rejected(error)
        }
        throw error
      }
    }

    const axiosConfig = toAxiosConfig(mergedConfig)

    try {
      const response = await axiosInstance.request<T>(axiosConfig)

      let httpResponse: HttpResponse<T>

      // 处理流式响应
      if (mergedConfig.stream) {
        httpResponse = await handleStreamResponse<T>(response, mergedConfig, mergedConfig.onStream)
      }
      else {
        httpResponse = toHttpResponse(response, mergedConfig)
      }

      // 执行响应拦截器（按优先级从高到低）
      const resInterceptors = responseInterceptors.getAll()
      for (const interceptor of resInterceptors) {
        try {
          httpResponse = await interceptor.fulfilled(httpResponse) as HttpResponse<T>
        }
        catch (error) {
          if (interceptor.rejected) {
            await interceptor.rejected(error)
          }
          throw error
        }
      }

      return httpResponse
    }
    catch (error) {
      // 执行响应拦截器的错误处理
      const resInterceptors = responseInterceptors.getAll()
      for (const interceptor of resInterceptors) {
        if (interceptor.rejected) {
          try {
            await interceptor.rejected(error)
          }
          catch {
            // 继续执行下一个拦截器
          }
        }
      }
      throw error
    }
  }

  const client: HttpClient = {
    interceptors: {
      request: requestInterceptors,
      response: responseInterceptors,
    },

    request,

    get<T = any>(url: string, params?: Record<string, any>, requestConfig: RequestConfig = {}): Promise<HttpResponse<T>> {
      return request<T>({ ...requestConfig, url, method: 'GET', params })
    },

    post<T = any, D = any>(url: string, data?: D, requestConfig: RequestConfig<D> = {}): Promise<HttpResponse<T>> {
      return request<T, D>({ ...requestConfig, url, method: 'POST', data })
    },

    put<T = any, D = any>(url: string, data?: D, requestConfig: RequestConfig<D> = {}): Promise<HttpResponse<T>> {
      return request<T, D>({ ...requestConfig, url, method: 'PUT', data })
    },

    delete<T = any>(url: string, requestConfig: RequestConfig = {}): Promise<HttpResponse<T>> {
      return request<T>({ ...requestConfig, url, method: 'DELETE' })
    },

    patch<T = any, D = any>(url: string, data?: D, requestConfig: RequestConfig<D> = {}): Promise<HttpResponse<T>> {
      return request<T, D>({ ...requestConfig, url, method: 'PATCH', data })
    },

    head<T = any>(url: string, requestConfig: RequestConfig = {}): Promise<HttpResponse<T>> {
      return request<T>({ ...requestConfig, url, method: 'HEAD' })
    },

    options<T = any>(url: string, requestConfig: RequestConfig = {}): Promise<HttpResponse<T>> {
      return request<T>({ ...requestConfig, url, method: 'OPTIONS' })
    },

    setConfig(newConfig: Partial<CreateConfig>): void {
      config = { ...config, ...newConfig }
      // 更新 axios 实例的默认配置
      if (newConfig.baseURL !== undefined) {
        axiosInstance.defaults.baseURL = newConfig.baseURL
      }
      if (newConfig.headers) {
        Object.assign(axiosInstance.defaults.headers.common, newConfig.headers)
      }
      if (newConfig.timeout !== undefined) {
        axiosInstance.defaults.timeout = newConfig.timeout
      }
      if (newConfig.withCredentials !== undefined) {
        axiosInstance.defaults.withCredentials = newConfig.withCredentials
      }
    },

    getConfig(): CreateConfig {
      return { ...config }
    },
  }

  return client
}

/** 单例实例 */
let _instance: HttpClient | undefined

/** 创建或获取单例实例 */
function create(config?: CreateConfig): HttpClient {
  if (!_instance) {
    _instance = createAxiosClient(config)
  }
  else if (config) {
    _instance.setConfig(config)
  }
  return _instance
}

/** 获取单例实例 */
function getInstance(): HttpClient {
  return _instance || create()
}

/** 默认导出模块 */
const axiosHttp: HttpModule = {
  create,

  get interceptors() {
    return getInstance().interceptors
  },

  request<T = any, D = any>(config: RequestConfig<D>): Promise<HttpResponse<T>> {
    return getInstance().request<T, D>(config)
  },

  get<T = any>(url: string, params?: Record<string, any>, config?: RequestConfig): Promise<HttpResponse<T>> {
    return getInstance().get<T>(url, params, config)
  },

  post<T = any, D = any>(url: string, data?: D, config?: RequestConfig<D>): Promise<HttpResponse<T>> {
    return getInstance().post<T, D>(url, data, config)
  },

  put<T = any, D = any>(url: string, data?: D, config?: RequestConfig<D>): Promise<HttpResponse<T>> {
    return getInstance().put<T, D>(url, data, config)
  },

  delete<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    return getInstance().delete<T>(url, config)
  },

  patch<T = any, D = any>(url: string, data?: D, config?: RequestConfig<D>): Promise<HttpResponse<T>> {
    return getInstance().patch<T, D>(url, data, config)
  },

  head<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    return getInstance().head<T>(url, config)
  },

  options<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    return getInstance().options<T>(url, config)
  },

  setConfig(config: Partial<CreateConfig>): void {
    getInstance().setConfig(config)
  },

  getConfig(): CreateConfig {
    return getInstance().getConfig()
  },
}

export default axiosHttp
export { create, getInstance }
export type * from './types'
