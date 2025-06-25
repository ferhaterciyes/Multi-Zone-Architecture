import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../services/fakeStoreApi'

interface CartState {
  items: Product[]
}

// LocalStorage'dan cart verilerini yükle
const loadCartFromStorage = (): Product[] => {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Veriyi validate et ve gerekli fieldları kontrol et
        if (Array.isArray(parsed)) {
          return parsed.filter(item => 
            item && 
            typeof item.id === 'number' && 
            typeof item.title === 'string' && 
            typeof item.price === 'number'
          )
        }
      }
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
  }
  return []
}

// LocalStorage'a cart verilerini kaydet
const saveCartToStorage = (items: Product[]) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

const initialState: CartState = {
  items: [], // Server-side rendering için boş başlatıyoruz
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      if (!state.items.find((item) => item.id === action.payload.id)) {
        state.items.push(action.payload)
        saveCartToStorage(state.items)
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveCartToStorage(state.items)
    },
    clearCart(state) {
      state.items = []
      saveCartToStorage(state.items)
    },
    loadCart(state) {
      state.items = loadCartFromStorage()
    },
    setCartItems(state, action: PayloadAction<Product[]>) {
      state.items = action.payload
      saveCartToStorage(state.items)
    },
  },
})

export const { addToCart, removeFromCart, clearCart, loadCart, setCartItems } = cartSlice.actions
export default cartSlice.reducer
