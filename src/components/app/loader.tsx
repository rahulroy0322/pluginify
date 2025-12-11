import { LoaderIcon } from 'lucide-react'
import type { FC } from 'react'
import { cn } from '@/lib/utils'

type LoaderPropsType = {
  className?: string
}

const Loader: FC<LoaderPropsType> = ({ className }) => (
  <div className="h-full flex items-center justify-center">
    <LoaderIcon className={cn('size-1/6 loader', className)} />
  </div>
)

export default Loader
