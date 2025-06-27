import { Product } from '../features/cartSlice'

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
    // Base64 encoding kullanarak daha güvenli taşıma
    const jsonString = JSON.stringify(cartItems)
    return btoa(unescape(encodeURIComponent(jsonString)))
  } catch (error) {
    console.error('Error encoding cart data:', error)
    return ''
  }
}

// URL'den cart verilerini decode et
export const decodeCartData = (encodedData: string): Product[] => {
  try {
    // Base64 decoding
    const decodedString = decodeURIComponent(escape(atob(encodedData)))
    return JSON.parse(decodedString)
  } catch (error) {
    console.error('Error decoding cart data:', error)
    // Eski format ile deneme (geriye uyumluluk)
    try {
      return JSON.parse(decodeURIComponent(encodedData))
    } catch (fallbackError) {
      console.error('Fallback decoding also failed:', fallbackError)
      return []
    }
  }
}
