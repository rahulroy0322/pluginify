import type { FC } from 'react'

type PluginMainFileType = {
  name: string
  // description?: string
  'short-name': string
  slug: string
  'base-url': string
  //   files: string[]
  'main-file': string
  style?: string
}
// id: string
// name: string
// description: string
// version: string
// author: string
// icon: React.ElementType
// sourceUrl: string

type SlotNameType = 'main-header' | 'dashboard'

type PluginAPIType = {
  render: (slot: SlotNameType, id: string, component: React.FC) => void
}

type SlotsType = Record<SlotNameType, { id: string; Component: FC }[]>

export type { SlotNameType, PluginAPIType, SlotsType, PluginMainFileType }
