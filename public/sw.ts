const CACHE_NAME = 'cache-v1'

const sw = self as unknown as ServiceWorkerGlobalScope

// const BASE_URL = sw.location as unknown as string

sw.addEventListener('install', (_event) => {
  console.log('ajhbxja')

  sw.skipWaiting()
})

console.log('here')

sw.addEventListener('activate', (event) => {
  // event.waitUntil(clients.claim());

  console.log('activate')
  event.waitUntil(sw.clients.claim())
})

sw.addEventListener('fetch', (event) => {
  const url = event.request.url

  if (url.endsWith('/main.json')) {
    event.respondWith(cacheFirst(event.request))
  }
})

const getUrl = ({ slug, file }: { slug: string; file: string }): string => {
  if (!slug) {
    return file
  }

  return slug + '/' + file
}

const cacheFirst = async (request: Request) => {
  const cache = await caches.open(CACHE_NAME)

  const cached = await cache.match(request)
  if (cached) {
    return cached // ✅ Serve from cache instantly
  }

  const res = await fetch(request)

  cache.put(request, res.clone())

  const { files, slug } = (await res.clone().json()) as {
    slug: string

    files: string[]
  }

  await Promise.all(
    files.map(async (file) => {
      const url = new URL(file, request.url)

      const req = new Request(
        new URL(
          getUrl({
            slug,
            file,
          }),
          request.url
        )
      )

      const res = await fetch(url)

      cache.put(req, res.clone())
    })
  )

  return res
}
