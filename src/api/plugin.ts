import { cache } from 'react'
import type { PluginMainFileType } from '@/@types/plugin'

const url = import.meta.env.VITE_APP_PLUGINS_URL

const fetchPlugins = cache(
  async (): Promise<PluginMainFileType[]> => (await fetch(url)).json()
)

export { fetchPlugins }
