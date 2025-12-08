const loadRemoteFileCode = async (url: string): Promise<string> => {
  const res = await fetch(url) // served from cache if exists
  const code = await res.text()

  return code

  // const blob = new Blob([code], { type: 'text/javascript' })
  // const blobUrl = URL.createObjectURL(blob)

  // return await import(blobUrl) // dynamic import
}

export { loadRemoteFileCode }
