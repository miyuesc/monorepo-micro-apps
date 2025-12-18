/**
 * HTTP 请求模块的公共类型定义
 */

/** 请求方法类型 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

/** 请求配置选项 */
export interface RequestConfig<D = any> {
  /** 请求 URL */
  url?: string
  /** 请求方法 */
  method?: HttpMethod
  /** 基础 URL */
  baseURL?: string
  /** 请求头 */
  headers?: Record<string, string>
  /** URL 查询参数 */
  params?: Record<string, any>
  /** 请求体数据 */
  data?: D
  /** 请求超时时间（毫秒） */
  timeout?: number
  /** 响应类型 */
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer' | 'stream'
  /** 是否携带凭证 */
  withCredentials?: boolean
  /** 是否启用流式响应 */
  stream?: boolean
  /** 流式响应回调（当 stream 为 true 时有效） */
  onStream?: (chunk: string) => void
  /** 请求取消信号 */
  signal?: AbortSignal
}

/** 创建实例的配置选项 */
export interface CreateConfig {
  /** 基础 URL */
  baseURL?: string
  /** 默认请求头 */
  headers?: Record<string, string>
  /** 默认超时时间（毫秒） */
  timeout?: number
  /** 是否携带凭证 */
  withCredentials?: boolean
}

/** 响应结果 */
export interface HttpResponse<T = any> {
  /** 响应数据 */
  data: T
  /** HTTP 状态码 */
  status: number
  /** HTTP 状态文本 */
  statusText: string
  /** 响应头 */
  headers: Record<string, string>
  /** 请求配置 */
  config: RequestConfig
}

/** 请求拦截器处理函数 */
export type RequestInterceptorFulfilled<T = RequestConfig> = (config: T) => T | Promise<T>

/** 请求拦截器错误处理函数 */
export type RequestInterceptorRejected = (error: any) => any

/** 响应拦截器处理函数 */
export type ResponseInterceptorFulfilled<T = HttpResponse> = (response: T) => T | Promise<T>

/** 响应拦截器错误处理函数 */
export type ResponseInterceptorRejected = (error: any) => any

/** 拦截器选项 */
export interface InterceptorOptions {
  /** 拦截器优先级，数值越大优先级越高，默认为 0 */
  priority?: number
}

/** 拦截器项 */
export interface InterceptorItem<F, R> {
  /** 唯一标识 */
  id: number
  /** 成功处理函数 */
  fulfilled: F
  /** 错误处理函数 */
  rejected?: R
  /** 优先级 */
  priority: number
}

/** 拦截器管理器接口 */
export interface InterceptorManager<F, R> {
  /** 添加拦截器，返回拦截器 ID */
  use: (fulfilled: F, rejected?: R, options?: InterceptorOptions) => number
  /** 移除拦截器 */
  eject: (id: number) => void
  /** 清空所有拦截器 */
  clear: () => void
  /** 获取所有拦截器（按优先级排序） */
  getAll: () => Array<InterceptorItem<F, R>>
}

/** HTTP 客户端实例接口 */
export interface HttpClient {
  /** 请求拦截器管理器 */
  interceptors: {
    request: InterceptorManager<RequestInterceptorFulfilled, RequestInterceptorRejected>
    response: InterceptorManager<ResponseInterceptorFulfilled, ResponseInterceptorRejected>
  }

  /** 发送请求 */
  request: <T = any, D = any>(config: RequestConfig<D>) => Promise<HttpResponse<T>>

  /** GET 请求 */
  get: <T = any>(url: string, params?: Record<string, any>, config?: RequestConfig) => Promise<HttpResponse<T>>

  /** POST 请求 */
  post: <T = any, D = any>(url: string, data?: D, config?: RequestConfig<D>) => Promise<HttpResponse<T>>

  /** PUT 请求 */
  put: <T = any, D = any>(url: string, data?: D, config?: RequestConfig<D>) => Promise<HttpResponse<T>>

  /** DELETE 请求 */
  delete: <T = any>(url: string, config?: RequestConfig) => Promise<HttpResponse<T>>

  /** PATCH 请求 */
  patch: <T = any, D = any>(url: string, data?: D, config?: RequestConfig<D>) => Promise<HttpResponse<T>>

  /** HEAD 请求 */
  head: <T = any>(url: string, config?: RequestConfig) => Promise<HttpResponse<T>>

  /** OPTIONS 请求 */
  options: <T = any>(url: string, config?: RequestConfig) => Promise<HttpResponse<T>>

  /** 设置默认配置 */
  setConfig: (config: Partial<CreateConfig>) => void

  /** 获取当前配置 */
  getConfig: () => CreateConfig
}

/** HTTP 模块导出接口（包含 create 方法和默认实例方法） */
export interface HttpModule extends HttpClient {
  /** 创建/获取单例实例 */
  create: (config?: CreateConfig) => HttpClient
}
