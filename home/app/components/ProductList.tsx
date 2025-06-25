'use client'

import { useEffect } from "react";
import Image from "next/image";
import { useGetProductsQuery, fakeStoreApi, Product } from "../services/fakeStoreApi";
import { addToCart, removeFromCart, loadCart, setCartItems } from "../features/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getZoneUrl, encodeCartData, decodeCartData } from "../utils/multizone";
import toast from "react-hot-toast";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  
  // RTK Query hook
  const { 
    data: products = [], 
    error, 
    isLoading,
    refetch
  } = useGetProductsQuery()

  // Sayfa yüklendiğinde localStorage'dan cart verilerini yükle
  useEffect(() => {
    // URL parametrelerinden cart verilerini al
    const urlParams = new URLSearchParams(window.location.search)
    const cartItemsParam = urlParams.get('cartItems')
    
    if (cartItemsParam) {
      try {
        const items = decodeCartData(cartItemsParam)
        // URL'den gelen verileri direkt state'e yükle
        dispatch(setCartItems(items))
        // URL'i temizle
        window.history.replaceState({}, '', window.location.pathname)
        return
      } catch (error) {
        console.error('Error parsing cart items from URL:', error)
      }
    }
    
    // URL'de veri yoksa localStorage'dan yükle
    dispatch(loadCart())
    // RTK Query prefetch (cache'e veri yükler)
    dispatch(fakeStoreApi.util.prefetch('getProducts', undefined, { force: false }))
  }, [dispatch])

  const isInCart = (productId: number) =>
    cartItems.some((item) => item.id === productId);
  
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} sepete eklendi!`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Ürünler yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">Ürünler yüklenirken hata oluştu.</p>
        <button 
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tekrar Dene
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Cart Navigation */}
      <div className="flex justify-end mb-6">
        <a
          href={getZoneUrl('cart', '/cart', { items: encodeCartData(cartItems) })}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center gap-2"
          onClick={() => {
            // Cart verilerini localStorage'a kaydet (sync için)
            localStorage.setItem('cart', JSON.stringify(cartItems))
          }}
        >
          🛒 Sepete Git ({cartItems.length})
        </a>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Henüz ürün bulunmuyor.</p>
          </div>
        ) : (
          products.map((product: Product) => (
            <div key={product.id} className="border rounded p-4 flex flex-col">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="h-40 w-full object-contain mb-4"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="mt-auto font-bold">{product.price} ₺</p>
              {!isInCart(product.id) ? (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Sepete Ekle
                </button>
              ) : (
                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Sepetten Çıkar
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </>
  )
}
