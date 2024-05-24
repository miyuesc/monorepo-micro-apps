import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

let _instance: AxiosInstance | undefined

export function create<T>(config?: CreateAxiosDefaults<T>): AxiosInstance {
  if (!_instance)
    return axios.create(config)
  return _instance
}

export function getInstance(): AxiosInstance {
  return _instance || create()
}

export function get(url: string, params: unknown = {}, config: AxiosRequestConfig = {}) {
  return getInstance().get(url, { params, ...config })
}

export function post(url: string, data: unknown, params: unknown = {}, config: AxiosRequestConfig = {}) {
  return getInstance().post(url, data, { params, ...config })
}
