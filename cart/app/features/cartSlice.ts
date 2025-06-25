import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

interface CartState {
  items: Product[]
}

// LocalStorage'dan cart verilerini yükle
const loadCartFromStorage = (): Product[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const saved = localStorage.getItem('cart')
    if (!saved) return []
    
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []
    
    // Veriyi validate et ve gerekli fieldları kontrol et
    return parsed.filter(item => 
      item && 
      typeof item.id === 'number' && 
      typeof item.title === 'string' && 
      typeof item.price === 'number' &&
      typeof item.image === 'string'
    )
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
    return []
  }
}

// LocalStorage'a cart verilerini kaydet
const saveCartToStorage = (items: Product[]) => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('cart', JSON.stringify(items))
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
      const loadedItems = loadCartFromStorage()
      state.items = loadedItems
    },
    setCartItems(state, action: PayloadAction<Product[]>) {
      state.items = action.payload
      saveCartToStorage(state.items)
    },
  },
})

export const { addToCart, removeFromCart, clearCart, loadCart, setCartItems } = cartSlice.actions
export default cartSlice.reducer
