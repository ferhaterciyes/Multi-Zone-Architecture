import { Metadata } from 'next'
import ProductList from './components/ProductList'

export const metadata: Metadata = {
  title: 'Ürünler - E-Commerce',
  description: 'En kaliteli ürünleri keşfedin ve sepete ekleyin',
  keywords: 'alışveriş, ürünler, e-commerce, sepet',
}

export default function HomePage() {
  return (
    <main className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Ürünler</h1>
        <p className="text-gray-600 mt-2">
          En kaliteli ürünleri keşfedin ve sepete ekleyin
        </p>
      </div>
      
      {/* RTK Query ile client component */}
      <ProductList />
    </main>
  )
}
