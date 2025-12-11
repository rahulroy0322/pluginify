import { Laptop, Moon, Sun } from 'lucide-react'
import {
  type FC,
  type ReactEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'

type ThemeType = 'dark' | 'light' | 'system'

const DEFAULT_THEME = 'system'
const STORAGE_KEY = 'dark-mode-theme'

// const { useState } = React

const DarkMode: FC = () => {
  const [theme, setTheme] = useState(
    () => (localStorage.getItem(STORAGE_KEY) as ThemeType) || DEFAULT_THEME
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const onSelect = useCallback(
    ((e) => {
      const value = (e.target as HTMLSelectElement).value as ThemeType

      setTheme(value)
    }) satisfies ReactEventHandler<HTMLSelectElement>,
    []
  )

  return (
    <select
      className="bg-[pink]"
      onSelect={onSelect}
      value={theme}>
      <option
        className="text-5xl"
        value={'system' satisfies ThemeType}>
        <Laptop />
      </option>
      <option value={'light' satisfies ThemeType}>
        <Sun />
      </option>
      <option value={'dark' satisfies ThemeType}>
        <Moon />
      </option>
    </select>
  )
}

export { DarkMode }
