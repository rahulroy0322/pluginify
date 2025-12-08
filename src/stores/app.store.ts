import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const PLUGIN_KEY = 'pluginify-plugins'

type MainFileType = {
  name: string
  // description?: string
  'short-name': string
  slug: string
  'base-url': string
  //   files: string[]
  'main-file': string
}

// id: string
// name: string
// description: string
// version: string
// author: string
// icon: React.ElementType
// sourceUrl: string
type SystemStoreType = {
  plugins: MainFileType[]
}

const useSystem = create(
  persist<SystemStoreType>(
    () => ({
      plugins: [
        {
          name: 'My App',
          'short-name': 'my-app',
          slug: 'myapp/test',
          'base-url': 'http://localhost:5173',
          'main-file': 'main.js',
        },
      ],
    }),
    {
      name: PLUGIN_KEY,
    }
  )
)

export { useSystem }
