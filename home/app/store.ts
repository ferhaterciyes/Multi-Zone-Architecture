import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { fakeStoreApi } from './services/fakeStoreApi'
import cartReducer from './features/cartSlice'
import { rtkQueryErrorLogger } from './middleware/errorMiddleware'

// Store factory for SSR
export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(fakeStoreApi.middleware)
        .concat(rtkQueryErrorLogger),
  })

  setupListeners(store.dispatch)
  return store
}

// Default store instance
export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof makeStore>
