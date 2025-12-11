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

  const onChange = useCallback(
    ((e) => {
      const value = (e.target as HTMLSelectElement).value as ThemeType
      setTheme(value)
    }) satisfies ReactEventHandler<HTMLSelectElement>,
    []
  )

  return (
    <select
      onChange={onChange}
      value={theme}>
      <option value={'system' satisfies ThemeType}>System</option>
      <option value={'light' satisfies ThemeType}>Light</option>
      <option value={'dark' satisfies ThemeType}>Dark </option>
    </select>
  )
}

export { DarkMode }
