type SlotName =
  | 'header_action'
  | 'sidebar_nav'
  | 'dashboard_widget'
  | 'global_background'

type PluginAPI = {
  render: (slot: SlotName, id: string, component: React.FC<any>) => void
}

declare let api: PluginAPI

if (typeof api === 'undefined') {
  throw new Error('something went wrong, as api is not defined')
}

const { useState, useCallback } = React

const Counter: React.FC = () => {
  const [count, setCount] = useState(0)

  const inc = useCallback(() => {
    setCount((prev) => prev + 1)
  }, [])

  const dec = useCallback(() => {
    setCount((prev) => Math.max(prev - 1, 0))
  }, [])

  return (
    <div>
      <h2>Counter</h2>
      <div
        style={{
          display: 'flex',
          gap: '5px',
        }}>
        <button
          onClick={dec}
          style={{
            padding: '5px',
            border: '2px solid red',
          }}>
          -
        </button>

        <span>{count}</span>

        <button
          onClick={inc}
          style={{
            padding: '5px',
            border: '2px solid red',
          }}>
          +
        </button>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div>
      this is my first plugin
      <Counter />
    </div>
  )
}

api.render('sidebar_nav', 'asxpa', App as unknown)
