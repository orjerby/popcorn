import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { useAppContext } from '../context/AppContext'
import { selectBundledProducts } from '../context/selectors'
import Product from './Product'

export default function ProductList() {
  const { state } = useAppContext()
  const bundledProducts = selectBundledProducts(state)

  return (
    <div className="bg-[#f6f3e2] uppercase">
      <Swiper
        // install Swiper modules
        modules={[Navigation]}
        slidesPerView={'auto'}
        spaceBetween={30}
        navigation
        className="swiper-container-grid-col"
      >
        {bundledProducts.map((product) => (
          <SwiperSlide key={product.id} className="!w-268 pt-100">
            <Product
              id={product.id}
              image={product.images[0]}
              title={product.title}
              count={product.count}
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
