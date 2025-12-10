import { Download, File } from 'lucide-react'
import type { FC } from 'react'
import Brand from '@/components/app/brand'
import { Button } from '@/components/ui/button'
import PluginSlot from '../slot'
import { type LinkType, Navbar, type NotificationType } from './nav'

const _notifications: NotificationType[] = [
  {
    id: '1',
    icon: File,
    at: new Date(),
    title:
      'File Operations compleate slcnsancnsalcnlmlMCl mckaksnc cac ac a ca c a ca c a c ac a ca c a ca c ac ',
    content: 'some desc',
  },
  {
    id: '2',
    icon: Download,
    at: new Date(2025, 11, 4),
    title: 'dowlnoad compeate!',
    content: 'some desc',
  },
  {
    id: '3',
    at: new Date(2025, 11, 8, 12, 0, 0),
    title: 'event is coming soon',
  },
]

const notifications = [
  ..._notifications,
  ..._notifications,
  ..._notifications,
  ..._notifications,
]

const LINKS: LinkType[] = [
  {
    href: '/store',
    title: 'store',
  },
  {
    href: '/',
    title: 'installed apps',
  },
]

const MainHeader: FC = () => (
  <header className="flex items-center justify-between gap-10">
    <Button
      asChild
      className="gap-0 font-bold text-lg"
      variant="link">
      <Brand />
    </Button>

    <Navbar
      links={LINKS}
      notifications={notifications}>
      <PluginSlot slot="main-header" />
    </Navbar>
  </header>
)

export default MainHeader
