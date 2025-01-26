import { Link } from 'react-router'
import Stars from '../components/Stars'
import { useAppContext } from '../context/AppContext'

type Props = {
  id: string
  image: string
  title: string
  count: number
  size: string
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
}: Props) {
  const { dispatch } = useAppContext()

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId: id, quantity: 1 },
    })
  }

  return (
    <div className="flex max-h-522 flex-col overflow-hidden">
      <div className="mt-37 flex max-h-481 max-w-268 flex-col items-center justify-center rounded-sm bg-white">
        <div className="group flex flex-col items-center gap-10">
          <Link
            to={`/products/${id}`}
            className="mt-105 max-h-256 w-full transition-all duration-300 group-hover:scale-105"
          >
            <img src={image} alt="Popcorn" />
          </Link>

          <h3 className="text-xl font-bold text-black">{title}</h3>
          <div className="mt-16 flex flex-col items-center gap-10">
            <div className="flex gap-x-5 font-bold text-black">
              <span>{count}-Pack</span>
              <span>|</span>
              <span>${price}</span>
            </div>
            <div className="flex h-24 items-center">
              <Stars />
              <span className="justify-center pl-5 text-base font-bold text-[#337d9c]">
                {reviewsCount} REVIEWS
              </span>
            </div>
          </div>

          <div className="mt-20 mb-190 flex flex-col gap-10">
            <button
              onClick={addToCart}
              className="w-188 cursor-pointer rounded bg-[#3eadb8] p-12 font-sans font-bold text-white hover:opacity-70"
            >
              ADD TO CART
            </button>
            <Link
              to={`/products/${id}`}
              className="w-188 rounded bg-[#b69775] p-12 text-center font-sans font-bold text-white hover:opacity-70"
            >
              VIEW MORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
