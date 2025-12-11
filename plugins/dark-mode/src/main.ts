import type { FC } from 'react'
import { DarkMode } from './dark-mode'
import './style.css'
type SlotNameType = 'main-header' | 'dashboard'

type PluginAPIType = {
  render: (slot: SlotNameType, id: string, component: FC) => void
}

declare let api: PluginAPIType

if (typeof api === 'undefined') {
  throw new Error('something went wrong, as api is not defined')
}

api.render('main-header', 'dark-mode', DarkMode)
