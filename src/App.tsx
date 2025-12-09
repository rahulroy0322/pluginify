import type { FC } from 'react'
// import MainLayout from './layouts/main'

import { createRouter, RouterProvider } from '@tanstack/react-router'

// import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'

// import { createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

// const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
const router = createRouter({
  routeTree,
  // context: {
  //   ...TanStackQueryProviderContext,
  // },
  // defaultPreload: 'intent',
  // scrollRestoration: true,
  // defaultStructuralSharing: true,
  // defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
