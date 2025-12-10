import React, { type FC, useEffect } from 'react'
import type { PluginAPIType } from '@/@types/plugin'
import type { SystemStoreType } from '@/@types/store'
import { loadRemoteFileCode } from '@/lib/module'
import { useSystem } from '@/stores/app.store'
import { addToSlot, useSlots } from '@/stores/slot.store'

const runPlugins = (plugins: SystemStoreType['plugins']) => {
  if (!plugins || !Array.isArray(plugins)) {
    const slots = useSlots.getInitialState().slots

    useSlots.setState({
      slots,
    })

    return
  }
  plugins.map(async (plugin) => {
    try {
      const code = await loadRemoteFileCode(
        `${plugin['base-url']}/${plugin['main-file']}`
      )
      const factory = new Function('React', 'api', code)

      factory(React, {
        render: (slot, id, Component) => {
          const _id = `${id}`
          addToSlot(slot, {
            id: _id,
            Component,
          })
        },
      } satisfies PluginAPIType)
    } catch (e) {
      console.log(e)
    }
  })
}

const LoadPlugins: FC = () => {
  const plugins = useSystem((state) => state.plugins)

  useEffect(() => {
    runPlugins(plugins)
  }, [plugins])

  return null
}

export { LoadPlugins }
export default LoadPlugins
