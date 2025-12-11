import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

const sleep = (duration = 250): Promise<void> =>
  new Promise((res) => {
    setTimeout(res, duration)
  })

export { sleep, cn }
