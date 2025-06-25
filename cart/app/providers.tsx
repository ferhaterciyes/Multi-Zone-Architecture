'use client'

import { Provider } from 'react-redux'
import { store } from './store'
import { CartLoader } from './components/CartLoader'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartLoader />
      {children}
    </Provider>
  )
}
