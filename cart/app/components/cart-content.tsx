'use client'

import { removeFromCart, clearCart, loadCart, setCartItems } from '../features/cartSlice'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Modal from './Modal'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getZoneUrl, encodeCartData, decodeCartData } from '../utils/multizone'

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()

  const [isModalOpen, setModalOpen] = useState(false)

  // Sayfa yüklendiğinde localStorage'dan cart verilerini yükle
  useEffect(() => {
    // URL parametrelerinden cart verilerini al
    const urlParams = new URLSearchParams(window.location.search)
    const itemsParam = urlParams.get('items')
    
    if (itemsParam) {
      try {
        const items = decodeCartData(itemsParam)
        if (Array.isArray(items) && items.length >= 0) {
          // URL'den gelen verileri direkt state'e yükle
          dispatch(setCartItems(items))
          // URL'i temizle
          window.history.replaceState({}, '', window.location.pathname)
          return
        }
      } catch (error) {
        console.error('Error parsing items from URL:', error)
        // URL'i temizle hatalı olduğu için
        window.history.replaceState({}, '', window.location.pathname)
      }
    }
    
    // URL'de veri yoksa veya hatalıysa localStorage'dan yükle
    dispatch(loadCart())
  }, [dispatch])

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const confirmClearCart = () => {
    dispatch(clearCart())
    closeModal()
  }

  const total = cartItems.reduce((acc, item) => acc + item.price, 0)

  if (cartItems.length === 0)
    return (
      <main className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Sepetiniz boş</h1>
          <a
            href={getZoneUrl('home', '/', { cartItems: encodeCartData([]) })}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            ← Alışverişe Devam Et
          </a>
        </div>
        <p className="text-gray-600 mb-4">Alışverişe başlamak için ürünler sayfasına dönün.</p>
      </main>
    )

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sepetiniz</h1>
        <a
          href={getZoneUrl('home', '/', { cartItems: encodeCartData(cartItems) })}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          ← Alışverişe Devam Et
        </a>
      </div>
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.title}
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
              <span>{item.title}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold">{item.price.toFixed(2)} ₺</span>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-600 hover:underline"
              >
                Kaldır
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 font-bold">Toplam: {total.toFixed(2)} ₺</p>
      <button
        onClick={openModal}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Sepeti Temizle
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Sepeti Temizle">
        <p>Sepeti temizlemek istediğinize emin misiniz?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="py-2 px-4 rounded border border-gray-300 hover:bg-gray-100"
          >
            İptal
          </button>
          <button
            onClick={confirmClearCart}
            className="py-2 px-4 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Onayla
          </button>
        </div>
      </Modal>
    </main>
  )
}