import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

/**
 * RTK Query Error Logger Middleware
 * Automatically catches and displays RTK Query errors as toast notifications
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('RTK Query rejected action:', action)
      
      // Extract error message
      let errorMessage = 'Bir hata oluştu'
      
      if (action.error) {
        if ('data' in action.error && action.error.data) {
          // API error with data
          errorMessage = (action.error.data as { message?: string }).message || 'API Hatası'
        } else if (action.error.message) {
          // Standard error message
          errorMessage = action.error.message
        }
      }
      
      // Show error toast
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      })
    }

    return next(action)
  }
