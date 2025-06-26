import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import { rtkQueryErrorLogger } from './middleware/errorMiddleware'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
