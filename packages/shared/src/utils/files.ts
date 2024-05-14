/**
 * 文件下载
 * @param buffer
 * @param fileName
 * @param type
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
