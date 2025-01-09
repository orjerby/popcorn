import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from '../components/Card'
import { useAppContext } from '../context/AppContext'
import { selectProducts } from '../context/selectors'
import { useData } from '../hooks/useData'
import { getProducts } from '../services/productService'
// import '../../node_modules/swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.css'
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
          <SwiperSlide className="!w-268" key={product.id}>
            <Card
              key={product.id}
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
