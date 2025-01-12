import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { useAppContext } from '../context/AppContext'
import { selectProducts } from '../context/selectors'
import Product from './Product'

export default function ProductList() {
  const { state } = useAppContext()
  const products = selectProducts(state)

  return (
    <div className="h-550 overflow-hidden bg-[#f6f3e2] uppercase">
      <Swiper
        // install Swiper modules
        modules={[Navigation]}
        slidesPerView={'auto'}
        spaceBetween={30}
        navigation
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!w-268">
            <Product
              id={product.id}
              image={product.images[0]}
              title={product.title}
              size={product.size}
              price={product.price}
              reviewsCount={product.reviews.length}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* </ul> */}
    </div>
  )
}
