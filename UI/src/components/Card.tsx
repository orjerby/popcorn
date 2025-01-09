import Stars from './Stars'

type CardProps = {
  image: string
  title: string
  size: string
  price: number
  reviewsCount: number
}

function Card({ image, title, price, reviewsCount }: CardProps) {
  return (
    <div className="flex max-h-522 flex-col overflow-hidden">
      <div className="mt-37 flex max-h-481 max-w-268 flex-col items-center justify-center rounded-sm bg-white">
        <div className="group flex flex-col items-center gap-10">
          <img
            className="mt-105 max-h-256 w-full cursor-pointer object-contain transition-all duration-300 group-hover:scale-105"
            src={image}
            alt="Popcorn"
          />
          <h3 className="text-xl font-bold text-black">{title}</h3>
          <div className="mt-16 flex flex-col items-center gap-10">
            <div className="flex gap-x-5 font-bold text-black">
              <span>4-PACK</span>
              <span>|</span>
              <span>${price}</span>
            </div>
            <div className="flex h-24 items-center">
              <Stars></Stars>
              <span className="justify-center pl-5 text-base font-bold text-[#337d9c]">
                {reviewsCount} REVIEWS
              </span>
            </div>
          </div>

          <div className="mt-20 mb-190 flex flex-col gap-10">
            <button className="w-188 cursor-pointer rounded bg-[#3eadb8] p-12 font-sans font-bold text-white hover:opacity-70">
              ADD TO CART
            </button>
            <button className="w-188 cursor-pointer rounded bg-[#b69775] p-12 font-sans font-bold text-white hover:opacity-70">
              VIEW MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Card
