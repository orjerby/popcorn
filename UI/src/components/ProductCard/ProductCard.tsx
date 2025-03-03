import { Link } from 'react-aria-components'
import Stars from '../Stars'

export type ProductCardProps = {
  id: string
  image: string
  title: string
  count: number
  price: number
  reviewsCount: number
  onViewMore?: () => void
  onAddToCart?: () => void
}

export default function ProductCard({
  id,
  image,
  title,
  count,
  price,
  reviewsCount,
  onViewMore,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="flex h-full flex-col rounded-sm bg-white">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="group flex h-full flex-col items-center justify-between px-[12px] pt-[24px] pb-[28px]">
          <Link
            href={`/products/${id}`}
            onPress={onViewMore}
            className="-mt-87 w-full max-w-373 transition-all duration-300 group-hover:scale-105"
          >
            <img src={image} aria-label={title} />
          </Link>

          <h3 className="line-clamp-2 text-center text-xl font-bold text-black">
            {title}
          </h3>

          <div className="flex w-full flex-col items-center">
            <div className="mt-28 flex gap-x-5 font-bold text-black">
              <span>{count}-PACK</span>
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
                onClick={onAddToCart}
                className="cursor-pointer rounded bg-[#3eadb8] p-12 font-sans font-bold text-white hover:opacity-70"
              >
                ADD TO CART
              </button>
              <Link
                href={`/products/${id}`}
                onPress={onViewMore}
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
