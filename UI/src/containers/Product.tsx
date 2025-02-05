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
    <div className="flex h-full flex-col rounded-sm bg-white">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="group flex h-full flex-col items-center justify-between px-[12px] pt-[24px] pb-[28px]">
          <Link
            to={`/products/${id}`}
            className="-mt-87 w-full max-w-373 transition-all duration-300 group-hover:scale-105"
          >
            <img src={image} alt="Popcorn" />
          </Link>

          <h3 className="line-clamp-2 text-center text-xl font-bold text-black">
            {title}
          </h3>

          <div className="flex w-full flex-col items-center">
            <div className="mt-28 flex gap-x-5 font-bold text-black">
              <span>{count}-Pack</span>
              <span>|</span>
              <span>${price}</span>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Stars />
              <span className="justify-center text-base font-bold text-[#337d9c]">
                {reviewsCount} REVIEWS
              </span>
            </div>

            <div className="mt-24 flex w-full flex-col gap-12 px-28">
              <button
                onClick={addToCart}
                className="cursor-pointer rounded bg-[#3eadb8] p-12 font-sans font-bold text-white hover:opacity-70"
              >
                ADD TO CART
              </button>
              <Link
                to={`/products/${id}`}
                className="rounded bg-[#b69775] p-12 text-center font-sans font-bold text-white hover:opacity-70"
              >
                VIEW MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
