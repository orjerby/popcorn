import ProductCard from '../components/ProductCard/ProductCard'
import { useAppContext } from '../context/AppContext'

export type ProductProps = {
  id: string
  image: string
  title: string
  count: number
  price: number
  reviewsCount: number
}

export default function Product({
  id,
  image,
  title,
  count,
  price,
  reviewsCount,
}: ProductProps) {
  const { dispatch } = useAppContext()

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId: id, quantity: 1 },
    })
  }

  return (
    <ProductCard
      id={id}
      image={image}
      title={title}
      count={count}
      price={price}
      reviewsCount={reviewsCount}
      onAddToCart={addToCart}
    />
  )
}
