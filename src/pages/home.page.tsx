import { Link } from '@tanstack/react-router'
import { LayoutDashboard } from 'lucide-react'
import type { FC } from 'react'
import PluginSlot from '@/components/app/slot'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSystem } from '@/stores/app.store'

const HomePage: FC = () => (
  <div className="h-full grow flex flex-col gap-2 overflow-hidden">
    <ShowWellCome />
    <Separator />

    <div className="grow overflow-auto">
      <PluginSlot slot="dashboard" />

      <div className="py-2 flex flex-col items-center justify-center gap-2">
        <div className="inline-flex p-4 bg-accent rounded-full items-center justify-center ring ring-primary">
          <LayoutDashboard
            className="text-primary"
            size={32}
          />
        </div>

        <h3 className="text-lg font-medium text-primary capitalize">
          Main Dash Board
        </h3>

        <p className="text-muted-foreground max-w-md text-balance text-center">
          This is the base app. Go to the{' '}
          <Link
            className="hover:underline active:underline focus-within:underline text-primary"
            to="/store">
            <strong>Store</strong>
          </Link>{' '}
          to download plugins that will add functionality.
        </p>
        <Button asChild>
          <Link to="/store">Browse Plugins</Link>
        </Button>
      </div>
    </div>
  </div>
)

const PluginPlural: FC = () => {
  const plugins = useSystem((state) => state.plugins)

  if (plugins.length === 0) {
    return 'no plugins'
  }

  if (plugins.length === 1) {
    return 'one plugin'
  }

  return `${plugins.length} plugins`
}

const ShowWellCome: FC = () => {
  return (
    <p className="text-secondary-foreground text-center text-balance">
      Welcome back. <PluginPlural /> are currently installed.
    </p>
  )
}

export default HomePage
