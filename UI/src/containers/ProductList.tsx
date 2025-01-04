import Card from '../components/Card'
import { useAppContext } from '../context/AppContext'
import { selectProducts } from '../context/selectors'
import { useData } from '../hooks/useData'
import { getProducts } from '../services/productService'

export default function ProductList() {
  const { state, dispatch } = useAppContext()
  const products = selectProducts(state)
  useData({
    promise: getProducts,
    onLoad: (productsData) => {
      dispatch({ type: 'SET_PRODUCTS', payload: productsData })
    },
  })

  return (
    <div className="h-550 overflow-auto">
      <ul className="flex w-max gap-25">
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
