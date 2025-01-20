import { type Ref, ref } from 'vue'

export interface ResponseData<T> {
  result?: T[]
  totalNum?: number
  msg?: string
}

export type DataRequest = (search?: unknown) => Promise<unknown>
export type ResponseDataTransfer = <T>(response: unknown) => ResponseData<T>
export interface Page {
  pageNo: number
  pageSize: number
}
export type ErrorHandling = (errorMsg?: string) => unknown

export function usePaginationRequest<T extends object = NonNullable<unknown>, S extends object = NonNullable<unknown>>(
  httpRequest: DataRequest,
  responseTransfer?: ResponseDataTransfer,
  errorHanding?: ErrorHandling,
) {
  const tableData = ref<T[]>([]) as Ref<T[]>
  const page = ref<Page>({
    pageNo: 1,
    pageSize: 10,
  })
  const total = ref<number>(0)

  const emptyTableData = () => {
    tableData.value = []
    total.value = 0
    page.value = {
      pageNo: 1,
      pageSize: 10,
    }
  }

  const getTableData = async (searchForm?: S) => {
    try {
      const data = await httpRequest({ ...searchForm, ...page.value })

      if (responseTransfer) {
        const { result, totalNum } = responseTransfer<T>(data)

        if (result && result.length) {
          tableData.value = result
          total.value = totalNum || 0
        }
        else {
          emptyTableData()
        }
      }
      else {
        const { result, totalNum, msg } = data as ResponseData<T>

        if (result && result.length) {
          tableData.value = result
          total.value = totalNum || 0
        }
        else {
          if (errorHanding) {
            errorHanding(msg)
          }
          emptyTableData()
        }
      }
    }
    catch (e) {
      emptyTableData()
      console.error(e)
    }
  }

  const currentPageChanged = async (pageNo: number) => {
    page.value.pageNo = pageNo
    if (getTableData)
      await getTableData()
  }
  const currentSizeChanged = async (pageSize: number) => {
    page.value.pageSize = pageSize
    if (getTableData)
      await getTableData()
  }

  return {
    tableData,
    page,
    total,
    getTableData,
    currentPageChanged,
    currentSizeChanged,
    emptyTableData,
  } as const
}
