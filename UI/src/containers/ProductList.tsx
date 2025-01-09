import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppContext } from '../context/AppContext'
import { selectProducts } from '../context/selectors'
import { useData } from '../hooks/useData'
import { getProducts } from '../services/productService'
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
      {/* <ul className="flex w-max gap-25"> */}
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={6}
        grabCursor={true}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
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
