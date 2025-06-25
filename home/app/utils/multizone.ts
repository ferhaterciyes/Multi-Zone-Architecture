import { Product } from '../services/fakeStoreApi'

// Multi-zone navigation helper
export const getZoneUrl = (zone: 'home' | 'cart', path: string = '', params?: Record<string, string>) => {
  const baseUrls = {
    home: process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3000',
    cart: process.env.NEXT_PUBLIC_CART_URL || 'http://localhost:3001'
  }
  
  let url = `${baseUrls[zone]}${path}`
  
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params)
    url += `?${searchParams.toString()}`
  }
  
  return url
}

// Cart verilerini URL-safe format'a çevir
export const encodeCartData = (cartItems: Product[]) => {
  try {
    return encodeURIComponent(JSON.stringify(cartItems))
  } catch (error) {
    console.error('Error encoding cart data:', error)
    return ''
  }
}

// URL'den cart verilerini decode et
export const decodeCartData = (encodedData: string): Product[] => {
  try {
    return JSON.parse(decodeURIComponent(encodedData))
  } catch (error) {
    console.error('Error decoding cart data:', error)
    return []
  }
}
