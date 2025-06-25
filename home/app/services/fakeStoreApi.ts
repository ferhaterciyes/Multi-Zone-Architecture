import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export const fakeStoreApi = createApi({
  reducerPath: 'fakeStoreApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://fakestoreapi.com/',
    // RTK Query için request interceptor
    prepareHeaders: (headers) => {
      headers.set('Cache-Control', 'max-age=3600') // 1 hour cache
      return headers
    },
  }),
  tagTypes: ['Products'], // Cache invalidation için
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      providesTags: ['Products'],
      // Client-side cache süresi (5 dakika)
      keepUnusedDataFor: 300,
      // Server-side cache süresi
      // Next.js ortamında SSR için
      transformResponse: (response: Product[]) => {
        console.log('RTK Query: Products fetched', response.length)
        return response
      },
    }),
  }),
})

export const { useGetProductsQuery } = fakeStoreApi
