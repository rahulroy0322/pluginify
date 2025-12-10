import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PluginMainFileType } from '@/@types/plugin'
import type { SystemStoreType } from '@/@types/store'

const PLUGIN_KEY = 'pluginify-plugins'

const useSystem = create(
  persist<SystemStoreType>(
    () => ({
      plugins: [],
    }),
    {
      name: PLUGIN_KEY,
    }
  )
)

const { setState: set, getState: get } = useSystem

const install = (plugin: PluginMainFileType) => {
  const plugins = get().plugins
  if (plugins.find((p) => p.name === plugin.name && p.slug === plugin.slug)) {
    return
  }

  set({
    plugins: [
      ...plugins,
      {
        ...plugin,
        active: true,
      },
    ],
  })
}

export { useSystem, install }
