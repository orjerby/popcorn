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
      console.log('loaded', productsData)
      dispatch({ type: 'SET_PRODUCTS', payload: productsData })
    },
  })

  // const addToCart = () => {
  //   dispatch({
  //     type: 'ADD_TO_CART',
  //     payload: { productId: 'cinnamon-sugar-twists-1' },
  //   })
  // }

  // const removeFromCart = () => {
  //   dispatch({
  //     type: 'REMOVE_FROM_CART',
  //     payload: { productId: 'cinnamon-sugar-twists-1' },
  //   })
  // }

  return (
    <div className="h-550 overflow-auto bg-[#f6f3e2] uppercase">
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
