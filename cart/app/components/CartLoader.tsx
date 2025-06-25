'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { loadCart } from '../features/cartSlice'

export function CartLoader() {
  const dispatch = useAppDispatch()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      // Client-side'da localStorage'dan cart verilerini yükle
      dispatch(loadCart())
    }
  }, [dispatch, mounted])

  return null
}
