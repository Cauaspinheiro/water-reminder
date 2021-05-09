import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

interface State {
  isConfigActive: boolean
}

interface Actions {
  toggleDrawer(): void
}

type AppContext = State & Actions

const Context = createContext<AppContext | null>(null)

export function useAppContext(): AppContext {
  const value = useContext(Context)

  if (value === null) throw new Error('APP CONTEXT NOT PROVIDED')

  return value
}

export const AppContextProvider: FC = ({ children }) => {
  const [isActive, setIsActive] = useState(false)

  const toggleDrawer = useCallback(() => {
    setIsActive(value => !value)
  }, [])

  const value = useMemo<AppContext>(
    () => ({
      isConfigActive: isActive,
      toggleDrawer
    }),
    [isActive, toggleDrawer]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}
