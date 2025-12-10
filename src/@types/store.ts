import type { PluginMainFileType, SlotsType } from './plugin'

type SystemStoreType = {
  plugins: (PluginMainFileType & {
    active: boolean
  })[]
}

type SlotStoreType = {
  slots: SlotsType
}

export type { SystemStoreType, SlotStoreType }
