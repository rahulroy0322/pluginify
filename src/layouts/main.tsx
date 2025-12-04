// import { Store, User2 } from 'lucide-react'
// import { type FC, Suspense, useEffect } from 'react'
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// // const BASE_URL = 'http://localhost:4173/assets/'

// const StoreI: FC = () => {
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(new URL('/main.json'))

//       const files = (await res.json()) as {
//         files: {
//           js: string[]
//         }
//       }

//       console.log({
//         files,
//       })

//       // console.log(
//       //   await Promise.all(
//       //     files.map(async (file) => {
//       //       const res = await fetch(new URL(file, BASE_URL))

//       //       return res.text()
//       //     })
//       //   )
//       // )

//       // console.log(files)
//     }

//     fetchData()

//     return () => {}
//   })

//   return (
//     <TabsContent value="store">
//       <Suspense fallback={'gdgxgx'}></Suspense>
//     </TabsContent>
//   )
// }

// const MainLayout: FC = () => {
//   // return <App/>

//   return (
//     <div className="min-h-screen w-screen bg-red-700">
//       <Tabs
//         className="bg-green-700 w-full min-h-screen"
//         defaultValue="store">
//         <TabsList className="w-full rounded-none">
//           <TabsTrigger value="main">
//             <User2 />
//             Account
//           </TabsTrigger>
//           <TabsTrigger value="store">
//             <Store /> Store
//           </TabsTrigger>
//         </TabsList>

//         <StoreI />

//         <TabsContent value="password">Change your password here.</TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// export default MainLayout
