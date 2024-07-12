export function ids() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  if (typeof crypto.getRandomValues === 'function' && Uint8Array) {
    return (([1e7] as any as number) + -1e3 + -4e3 + -8e3 + -1e11).toString().replace(/[018]/g, c => ((Number(c).valueOf()) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> (Number(c).valueOf()) / 4).toString(16))
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
