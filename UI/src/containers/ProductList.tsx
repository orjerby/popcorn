import { useAppContext } from '../context/AppContext'
import { selectProducts } from '../context/selectors'
import { useData } from '../hooks/useData'
import { getProducts } from '../services/productService'
import Product from './Product'

export default function ProductList() {
  const { state, dispatch } = useAppContext()
  const products = selectProducts(state)

  useData({
    promise: getProducts,
    onLoad: (productsData) => {
      console.log('loaded', productsData)
      dispatch({ type: 'SET_PRODUCTS', payload: productsData })
    },
  })

  return (
    <div className="h-550 overflow-auto bg-red-300">
      <ul className="flex w-max gap-25">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
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
