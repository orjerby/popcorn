import { Suspense } from 'react'
import ProductList from '../containers/ProductList'

function Home() {
  return (
    <>
      <div className="bg-[#f6f3e2]">
        <img
          className="w-full"
          src="//www.pipsnacks.com/cdn/shop/t/205/assets/FRIES-Hero-tagline_headerR2-crop.png?v=144608968554861915091724934551"
          alt=""
        />
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductList />
        </Suspense>
      </div>
    </>
  )
}

export default Home
