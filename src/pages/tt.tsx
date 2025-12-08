import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { loadRemoteFileCode } from '@/lib/module'
import { useSystem } from '@/stores/app.store'

// type MainFileType = {
//   name: string
//   // description?: string
//   'short-name': string
//   slug: string
//   'base-url': string
//   //   files: string[]
//   'main-file': string
// }

type SlotNameType = 'sidebar_nav'

type PluginAPIType = {
  render: (slot: SlotNameType, id: string, component: React.FC) => void
}

type SlotsType = Record<SlotNameType, { id: string; Component: FC }[]>

const MMm: FC = () => {
  const plugins = useSystem((state) => state.plugins)

  const [slots, setSlots] = useState<SlotsType>({
    // header_action: [],
    sidebar_nav: [],
    // dashboard_widget: [],
    // global_background: [],
  })

  const runPlugins = useCallback(async () => {
    if (!plugins) {
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

            setSlots((prev) => {
              const prevIndex = prev[slot].findIndex((i) => i.id === _id)

              if (prevIndex > -1) {
                return prev
              }

              return {
                ...prev,
                [slot]: [...(prev[slot] || []), { id: _id, Component }],
              }
            })
          },
        } satisfies PluginAPIType)
      } catch (e) {
        console.log(e)
      }
    })
  }, [plugins])

  useEffect(() => {
    runPlugins()
  }, [runPlugins])

  const components = slots.sidebar_nav || []

  console.log(components)

  return (
    <div>
      amxlma;
      <p>ajmsloxm</p>
      {components.map(({ Component, id }, idx) => (
        <Component key={id || idx} />
      ))}
    </div>
  )
}

export default MMm
