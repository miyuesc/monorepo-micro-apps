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

/** 构建完整 URL */
function buildUrl(baseURL: string | undefined, url: string, params?: Record<string, any>): string {
  let fullUrl = url

  // 处理 baseURL
  if (baseURL && !url.startsWith('http://') && !url.startsWith('https://')) {
    fullUrl = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL
    fullUrl += url.startsWith('/') ? url : `/${url}`
  }

  // 处理 query params
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })
    const queryString = searchParams.toString()
    if (queryString) {
      fullUrl += fullUrl.includes('?') ? `&${queryString}` : `?${queryString}`
    }
  }

  return fullUrl
}

/** 将响应头转换为对象 */
function headersToObject(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {}
  headers.forEach((value, key) => {
    result[key] = value
  })
  return result
}

/** 处理流式响应 */
async function handleStreamResponse<T>(
  response: Response,
  config: RequestConfig,
  onStream?: (chunk: string) => void,
): Promise<HttpResponse<T>> {
  const body = response.body
  if (!body) {
    return {
      data: '' as T,
      status: response.status,
      statusText: response.statusText,
      headers: headersToObject(response.headers),
      config,
    }
  }

  const reader = body.getReader()
  const decoder = new TextDecoder()
  let fullContent = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done)
      break
    const text = decoder.decode(value, { stream: true })
    fullContent += text
    onStream?.(text)
  }

  return {
    data: fullContent as T,
    status: response.status,
    statusText: response.statusText,
    headers: headersToObject(response.headers),
    config,
  }
}

/** 解析响应数据 */
async function parseResponse<T>(response: Response, responseType?: string): Promise<T> {
  switch (responseType) {
    case 'text':
      return await response.text() as T
    case 'blob':
      return await response.blob() as T
    case 'arraybuffer':
      return await response.arrayBuffer() as T
    case 'json':
    default:
      // 尝试解析 JSON，失败则返回文本
      const text = await response.text()
      try {
        return JSON.parse(text) as T
      }
      catch {
        return text as T
      }
  }
}

/** 创建 Fetch HTTP 客户端 */
function createFetchClient(createConfig: CreateConfig = {}): HttpClient {
  let config: CreateConfig = { ...createConfig }

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

    // 构建 fetch 配置
    const url = buildUrl(mergedConfig.baseURL, mergedConfig.url || '', mergedConfig.params)

    const fetchInit: RequestInit = {
      method: mergedConfig.method || 'GET',
      headers: mergedConfig.headers,
      credentials: mergedConfig.withCredentials ? 'include' : 'same-origin',
      signal: mergedConfig.signal,
    }

    // 处理请求体
    if (mergedConfig.data !== undefined && !['GET', 'HEAD'].includes(fetchInit.method || '')) {
      if (typeof mergedConfig.data === 'object' && !(mergedConfig.data instanceof FormData) && !(mergedConfig.data instanceof Blob)) {
        fetchInit.body = JSON.stringify(mergedConfig.data)
        // 如果没有设置 Content-Type，自动添加
        if (!mergedConfig.headers?.['Content-Type'] && !mergedConfig.headers?.['content-type']) {
          fetchInit.headers = {
            ...fetchInit.headers,
            'Content-Type': 'application/json',
          }
        }
      }
      else {
        fetchInit.body = mergedConfig.data as BodyInit
      }
    }

    // 处理超时
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let abortController: AbortController | undefined

    if (mergedConfig.timeout && mergedConfig.timeout > 0) {
      abortController = new AbortController()
      const originalSignal = mergedConfig.signal

      // 如果已经有外部 signal，需要同时监听
      if (originalSignal) {
        originalSignal.addEventListener('abort', () => {
          abortController?.abort()
        })
      }

      fetchInit.signal = abortController.signal
      timeoutId = setTimeout(() => {
        abortController?.abort()
      }, mergedConfig.timeout)
    }

    try {
      const response = await fetch(url, fetchInit)

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      let httpResponse: HttpResponse<T>

      // 处理流式响应
      if (mergedConfig.stream) {
        httpResponse = await handleStreamResponse<T>(response, mergedConfig, mergedConfig.onStream)
      }
      else {
        const data = await parseResponse<T>(response, mergedConfig.responseType)
        httpResponse = {
          data,
          status: response.status,
          statusText: response.statusText,
          headers: headersToObject(response.headers),
          config: mergedConfig,
        }
      }

      // 检查 HTTP 错误状态码
      if (!response.ok) {
        const error = new Error(`HTTP Error: ${response.status} ${response.statusText}`) as Error & { response: HttpResponse<T> }
        error.response = httpResponse
        throw error
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
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      // 处理超时错误
      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError = new Error('Request timeout')
        timeoutError.name = 'TimeoutError'
        throw timeoutError
      }

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
    _instance = createFetchClient(config)
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
const fetchHttp: HttpModule = {
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

export default fetchHttp
export { create, getInstance }
export type * from './types'
