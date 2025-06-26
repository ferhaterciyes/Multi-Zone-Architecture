'use client'

import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-xl text-black font-bold mb-4">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  )
}
