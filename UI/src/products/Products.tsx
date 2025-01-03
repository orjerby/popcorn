import { useEffect } from 'react'
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
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.title} - {product.price}
        </li>
      ))}
    </ul>
  )
}
