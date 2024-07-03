import { post } from './axios'

export type RequestBodyGenerator<R = any, T extends Response = any> = (idx: number, lastResponse: T | null) => R

// 通用终止轮询判断
export function commonPollingOver<T extends Response>(responseData: T) {
  return responseData.status !== 200
}
// 通用轮询请求
export async function pollingRequest<R = any, T extends Response = any>(url: string, requestBodyGenerator: RequestBodyGenerator<R, T>, overPolling = commonPollingOver) {
  const resList: T[] = []
  let idx = 0
  let badCount = 0
  let lastResponse: T | null = null
  while (true) {
    const requestBody = requestBodyGenerator(idx, lastResponse)

    let res = await post(url, requestBody)

    // 有可能网络异常，数据请求不到，那就重复5次
    while ((!res || !res.data) && badCount < 5) {
      res = await post(url, requestBody)
      badCount++
    }

    // 五次之后还是有问题就抛出异常（事不过五）
    if (badCount >= 5)
      throw new Error(`${url} 请求故障，请重试！`)

    if (overPolling(res.data))
      break

    resList.push(...res.data.data)

    lastResponse = res as unknown as T
    badCount = 0

    idx++
  }
  return resList
}
