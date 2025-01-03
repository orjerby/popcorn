import { useEffect } from 'react'
import Card from '../components/Card'
import { useProducts, useProductsDispatch } from './ProductsContext'

export default function Products() {
  const products = useProducts()
  const dispatch = useProductsDispatch()

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((products) => {
        dispatch({ type: 'added', products })
      })
  }, [])

  return (
    <div className=" h-550 overflow-auto">
      <ul className="w-max flex gap-25">
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.images[0]}
            title={product.title}
            size={product.size}
            price={product.price}
            reviewsCount={product.reviews.length}
          />
        ))}
      </ul>
    </div>
  )
}
