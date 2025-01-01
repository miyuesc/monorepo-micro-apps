import { isNumber } from './typed'

/**
 * @categoryDescription File
 * 文件相关方法
 * @showCategories
 * @module
 */

/**
 * 文件下载
 * @category File
 * @param buffer 文件流
 * @param fileName 文件名
 * @param type 文件类型
 */
export function downloadFile(buffer: BlobPart, fileName: string, type: string) {
  const blob = new Blob([buffer], { type })

  const downloadLink = document.createElement('a')
  downloadLink.download = fileName
  downloadLink.style.display = 'none'
  downloadLink.href = URL.createObjectURL(blob)
  document.body.appendChild(downloadLink)
  downloadLink.click()
  URL.revokeObjectURL(downloadLink.href)
  document.body.removeChild(downloadLink)
}

/**
 * 字节数转义
 * @category File
 * @param bytes 字节数
 */
export function bytesToSize(bytes: number) {
  if (!isNumber(bytes))
    bytes = Number.parseFloat(bytes as string)

  if (bytes < 0)
    throw new Error('bytes must be a number and >= 0')

  if (bytes === 0)
    return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / k ** i).toPrecision(3)} ${sizes[i]}`
}
