export default function downloadAsBlob(data, title) {
  const link = document.createElement('a')
  const blob = new Blob(['\uFEFF' + data])
  link.download = title
  link.href = URL.createObjectURL(blob)
  link.click()
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, title)
  }
}
