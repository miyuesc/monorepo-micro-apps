import type { AxiosInstance, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

let _instance: AxiosInstance | undefined

export type AxiosInterceptorType = 'requestSuccess' | 'requestError' | 'responseSuccess' | 'responseError'

export function create<T>(config?: CreateAxiosDefaults<T>): AxiosInstance {
  if (!_instance)
    return axios.create(config)
  return _instance
}

export function getInstance(): AxiosInstance {
  return _instance || create()
}

// export function addInterceptor<V>(onFulfilled?: ((value: V) => V | Promise<V>) | null, onRejected?: ((error: any) => any) | null, options?: AxiosInterceptorOptions): number {
//   const id = getInstance().interceptors.request.use(onFulfilled, onRejected, options)
//   interceptorMap.set(id, interceptor)
//   return id
// }

export {}
