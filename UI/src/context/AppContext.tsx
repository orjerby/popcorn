import React, { createContext, ReactNode, use } from 'react'
import { useImmerReducer } from 'use-immer'
import { Action, rootReducer, RootState } from './rootReducer'

type AppContextProps = {
  state: RootState
  dispatch: React.Dispatch<Action>
}

export const AppContext = createContext<AppContextProps | undefined>(undefined)

export const initialState: RootState = rootReducer()

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useImmerReducer(rootReducer, initialState)

  return <AppContext value={{ state, dispatch }}>{children}</AppContext>
}

export const useAppContext = () => {
  const context = use(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
