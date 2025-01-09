import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppContext } from '../context/AppContext'
import { selectProducts } from '../context/selectors'
import { useData } from '../hooks/useData'
import { getProducts } from '../services/productService'
// import '../../node_modules/swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.css'
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
    <div className="h-550 overflow-hidden bg-[#f6f3e2] uppercase">
      <Swiper
        // install Swiper modules
        modules={[Navigation]}
        slidesPerView={'auto'}
        spaceBetween={30}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
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
