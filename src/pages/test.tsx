// import React, { type FC, useCallback, useEffect, useState } from 'react'
// import { loadRemoteModule } from '@/lib/module'
// import { useSystem } from '@/stores/app.store'

// // const BASE_URL = window.location as unknown as string

// const MDD: FC = () => {
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const url = new URL('/main.json', BASE_URL)

//   //     const res = await (await fetch(url)).text()

//   //     //       const blob = new Blob([res], { type: 'text/javascript' })
//   //     // const blobUrl = URL.createObjectURL(blob)

//   //     console.log({
//   //       res,
//   //       // blobUrl,
//   //       // x: await import(blobUrl)
//   //     })
//   //   }

//   //   fetchData()

//   //   return () => {}
//   // })

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const url = 'http://localhost:5173/main.js'

//   //     console.log({
//   //       res: await loadRemoteModule(url),
//   //     })
//   //   }

//   //   fetchData()

//   //   return () => {}
//   // })

//   return (
//     <div>
//       hello world!
//       <TEST />
//     </div>
//   )
// }

// type SlotName =
//   // | 'header_action'
//   'sidebar_nav'
// // | 'dashboard_widget'
// // | 'global_background'

// type PluginAPI = {
//   render: (slot: SlotName, id: string, component: React.FC) => void
//   //   on: (event: string, callback: (data: any) => void) => void
//   //   notify: (message: string, type?: ToastType) => void
//   //   storage: {
//   //     get: (key: string) => any
//   //     set: (key: string, value: any) => void
//   //   }
// }

// const h = React.createElement

// const TEST: FC = () => {
//   const plugins = useSystem((state) => state.plugins)

//   const [slots, setSlots] = useState<
//     Record<SlotName, { id: string; Component: React.FC }[]>
//   >({
//     // header_action: [],
//     sidebar_nav: [],
//     // dashboard_widget: [],
//     // global_background: [],
//   })

//   const runPlugins = useCallback(async () => {
//     plugins.map(async (plugin) => {
//       try {
//         const code = await loadRemoteModule(`${plugin['base-url']}/index.js`)

//         const factory = new Function(
//           'React',
//           'exports',
//           'api',
//           code as unknown as string
//         )

//         // const factory = new Function(
//         //   'React',
//         //   'useState',
//         //   'api',
//         //   code as unknown as string)

//         factory(React, {
//           render: (slot, id, Component) => {
//             const _id = `${id}`

//             setSlots((prev) => {
//               const prevIndex = prev[slot].findIndex((i) => i.id === _id)

//               if (prevIndex > -1) {
//                 return prev
//               }

//               return {
//                 ...prev,
//                 [slot]: [...(prev[slot] || []), { id: _id, Component }],
//               }
//             })
//           },
//         } satisfies PluginAPI)

//         // const h = React.createElement
//         // const Icons = { Moon, Sun, Box, Activity, Bell, Info }
//         // // Pass the React object itself so plugins can use { useState, useEffect } = React
//         // const factory = new Function('React', 'h', 'Icons', 'api', mainJsCode)
//         // const cleanupFn = factory(React, h, Icons, api)

//         // if (typeof cleanupFn === 'function') {
//         //   activeCleanupFunctions.current[id] = cleanupFn
//         // }
//       } catch (e: any) {
//         // addToast(`Plugin ${id} failed to run: ${e.message}`, 'error')
//         // console.error(`Failed to run plugin ${id}`, e)

//         console.log(e)
//       }

//       // console.log(await loadRemoteModule(`${plugin['base-url']}/index.js`))
//     })
//   }, [plugins])

//   useEffect(() => {
//     runPlugins()
//   }, [runPlugins])

//   const components = slots.sidebar_nav || []

//   console.log(components)

//   return (
//     <div>
//       <div>
//         {/* {components.map(({ id, Component }, idx) => (
//           <Component key={id || idx} />
//         ))} */}
//       </div>
//     </div>
//   )
// }

// export default MDD
