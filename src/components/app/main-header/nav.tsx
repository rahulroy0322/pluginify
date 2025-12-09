import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { Link, type LinkComponentProps } from '@tanstack/react-router'
import { BellRing, Menu } from 'lucide-react'
import type { FC } from 'react'
import Brand from '@/components/app/brand'
import { formatTime } from '@/lib/time'

type LinkType = {
  href: LinkComponentProps['to']
  title: string
}

type NotificationType = {
  id: string
  icon?: FC
  title: string
  content?: string
  at: string | Date
}

const NavItems: FC<{
  links: LinkType[]
}> = ({ links }) =>
  links.map(({ href, title }) => (
    <Button
      key={`#${href}-${title}`}
      size={'sm'}
      variant={'link'}>
      <Link
        className="capitalize font-bold"
        to={href}>
        {title}
      </Link>
    </Button>
  ))

const Navbar: FC<{
  links: LinkType[]
  notifications: NotificationType[]
}> = ({ links, notifications }) => {
  const isMobile = useIsMobile()
  return (
    <nav
      className={cn('flex items-center gap-3', {
        'justify-between w-3/5': !isMobile,
      })}>
      {!isMobile ? (
        <div>
          <NavItems links={links} />
        </div>
      ) : null}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="relative"
            size="icon"
            variant="outline">
            <BellRing size={20} />
            <Badge
              className="absolute size-6 text-[9px] items-center justify-center p-1 aspect-square -right-3 -top-3"
              variant={'outline'}>
              99+
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 max-h-96">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>

          <DropdownMenuItem>
            Mark All Read
            <DropdownMenuShortcut className="opacity-50">
              ⇧⌘R
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuGroup className="max-w-56 overflow-hidden">
            {notifications.map(
              ({ id, title, at, content, icon: Icon }, idx) => (
                <DropdownMenuItem
                  className="flex-col items-start gap-0"
                  key={id || idx}>
                  <h3 className="flex items-center gap-1 text-sm truncate">
                    {Icon ? <Icon /> : null}
                    {title}
                  </h3>

                  {content && (
                    <p className="text-xs text-muted-foreground">{content}</p>
                  )}
                  <time
                    className="text-xs text-muted-foreground"
                    dateTime={at as string}>
                    {formatTime(at instanceof Date ? at : new Date(at))}
                  </time>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {isMobile ? (
        <Sheet>
          <SheetTrigger className="cursor-pointer">
            <Menu size={20} />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Brand />
              </SheetTitle>

              <NavItems links={links} />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ) : null}
    </nav>
  )
}
export { Navbar }
export type { NotificationType, LinkType }
