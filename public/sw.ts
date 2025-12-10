const CACHE_NAME = 'cache-v1'

const sw = self as unknown as ServiceWorkerGlobalScope

// const BASE_URL = sw.location as unknown as string

sw.addEventListener('install', (_event) => {
  console.log('ajhbxja')

  sw.skipWaiting()
})

sw.addEventListener('activate', (event) => {
  // event.waitUntil(clients.claim());

  console.log('activate')
  event.waitUntil(sw.clients.claim())
})

sw.addEventListener('fetch', async (event) => {
  const url = event.request.url

  if (url.endsWith('/main.json')) {
    event.respondWith(cacheFirst(event.request))
  }

  const cache = await caches.open(CACHE_NAME)

  const cached = await cache.match(url)
  if (cached) {
    return event.respondWith(cached)
  }
})

const getUrl = ({ slug, file }: { slug: string; file: string }): string => {
  if (!slug) {
    return file
  }

  return slug + '/' + file
}

type PluginMainFileType = {
  name: string
  // description?: string
  'short-name': string
  slug: string
  'base-url': string
  'main-file': string
  style?: string
}

const fetchFile = async ({
  file,
  baseUrl,
  slug,
  cache,
}: {
  file: string
  baseUrl: string
  slug: string
  cache: Cache
}) => {
  const url = new URL(file, baseUrl)

  const req = new Request(
    new URL(
      getUrl({
        slug,
        file,
      }),
      baseUrl
    )
  )

  const res = await fetch(url)

  cache.put(req, res.clone())
}

const cacheFirst = async (request: Request) => {
  const cache = await caches.open(CACHE_NAME)

  const mainRes = await fetch(request)

  const {
    'base-url': baseUrl,
    'main-file': main,
    style,
    slug,
  } = (await mainRes.clone().json()) as PluginMainFileType

  const promises = [
    fetchFile({
      baseUrl,
      cache,
      file: main,
      slug,
    }),
  ]

  if (style) {
    promises.push(
      fetchFile({
        baseUrl,
        cache,
        file: style,
        slug,
      })
    )
  }

  await Promise.all(promises)

  return mainRes
}
