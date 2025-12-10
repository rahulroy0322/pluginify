import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import MainHeader from '@/components/app/main-header/main'
import LoadPlugins from '@/components/app/plugins/main'

// import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

// import type { QueryClient } from '@tanstack/react-query'

// interface MyRouterContext {
//   queryClient: QueryClient
// }

// export const Route = createRootRouteWithContext<MyRouterContext>()({

export const Route = createRootRouteWithContext()({
  component: () => (
    <>
      <div className="h-screen w-screen container m-auto p-2 overflow-hidden flex flex-col">
        <LoadPlugins />
        <MainHeader />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            // TanStackQueryDevtools,
          ]}
        />
      </div>
    </>
  ),
})
