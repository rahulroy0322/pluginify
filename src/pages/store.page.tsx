import { Box, Download, Loader, Pause, Play, Trash2 } from 'lucide-react'
import { type FC, useState } from 'react'
import type { PluginMainFileType } from '@/@types/plugin'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { install, useSystem } from '@/stores/app.store'

const PluginCard: FC<PluginMainFileType> = (file) => {
  const [isLoading, setIsLoading] = useState(false)
  const plugins = useSystem((state) => state.plugins)
  const {
    name,
    // slug,
    'base-url': baseUrl,
    // 'main-file': main,
    'short-name': sname,
  } = file

  const installed = plugins.find((plugin) => plugin.name === file.name)

  const installPlugin = async () => {
    try {
      const url = new URL('/main.json', baseUrl)

      setIsLoading(true)

      const data = JSON.parse(await (await fetch(url)).text())

      if ('name' in data && 'slug' in data) {
        install(data as PluginMainFileType)
      }
    } catch (e) {
      console.error('Error installing...', e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <Box />
        <CardTitle>{name}</CardTitle>
        <CardDescription>{sname}</CardDescription>
        <CardAction className="flex items-center gap-2">
          {isLoading ? (
            <Loader className="animate-spin duration-[5s]" />
          ) : !installed ? (
            <Button
              asChild
              className="size-8 p-2"
              disabled={isLoading}
              onClick={installPlugin}
              size={'icon'}
              variant={'outline'}>
              <Download />
            </Button>
          ) : (
            <>
              {!installed.active ? (
                <Button
                  asChild
                  className="size-8 p-2"
                  disabled={isLoading}
                  size={'icon'}>
                  <Play />
                </Button>
              ) : (
                <Button
                  asChild
                  className="size-8 p-2"
                  disabled={isLoading}
                  size={'icon'}
                  variant={'outline'}>
                  <Pause />
                </Button>
              )}
              <Button
                asChild
                className="size-8 p-2"
                disabled={isLoading}
                size={'icon'}
                variant={'destructive'}>
                <Trash2 />
              </Button>
            </>
          )}
        </CardAction>
      </CardHeader>
      {/* <CardContent>
        <p>Card Content</p>
      </CardContent> */}
    </Card>
  )
}

const StorePage: FC = () => (
  <div className="h-full overflow-hidden flex flex-col gap-4 pt-2">
    <div className="shrink-0">
      <h1 className="text-2xl font-bold">Plugin Store</h1>
      <p className="text-muted-foreground">
        Discover extensions to boost your workflow.
      </p>
    </div>
    <div className="grow overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-full h-fit gap-4">
        {plugins.map((plugin) => (
          <PluginCard
            key={`#${plugin.name}-${plugin.name}`}
            {...plugin}
          />
        ))}
      </div>
    </div>
  </div>
)

const plugins = [
  {
    name: 'My App',
    'short-name': 'my-app',
    slug: 'myapp/test',
    'base-url': 'http://localhost:5173',
    'main-file': 'main.js',
  },
]

export default StorePage
