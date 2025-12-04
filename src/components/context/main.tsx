import {
  createContext,
  type FC,
  use,
  useEffect,
  useMemo,
  useState,
} from 'react'

type ThemeType = 'dark' | 'light' | 'system'

type ThemeProviderPropsType = {
  children: React.ReactNode
  defaultTheme?: ThemeType
  storageKey?: string
}

type ThemeProviderStateType = {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const DEFAULT_THEME = 'system',
  STORAGE_KEY = 'vite-ui-theme'

const initialState: ThemeProviderStateType = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderStateType>(initialState)

const ThemeProvider: FC<ThemeProviderPropsType> = ({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = STORAGE_KEY,
  ...props
}) => {
  const [theme, setTheme] = useState<ThemeType>(
    () => (localStorage.getItem(storageKey) as ThemeType) || defaultTheme
  )

  const value = useMemo(
    () => ({
      theme,
      setTheme: (theme: ThemeType) => {
        localStorage.setItem(storageKey, theme)
        setTheme(theme)
      },
    }),
    [storageKey, theme]
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

  return (
    <ThemeProviderContext
      {...props}
      value={value}>
      {children}
    </ThemeProviderContext>
  )
}

const useTheme = () => {
  const context = use(ThemeProviderContext)

  if (!context) {
    throw new Error('"useTheme" must be used within a "ThemeProvider"')
  }
  return context
}

export { useTheme, ThemeProvider }
export default useTheme
