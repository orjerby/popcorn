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
        <div className="flex h-128 items-center justify-center bg-white text-center text-black">
          <p className="text-xl font-bold">
            PIPCORN HEIRLOOM SNACKS IS FAMILY-FOUNDED – BORN FROM OUR LOVE OF
            DELICIOUS SNACKS
            <br />
            AND OUR DESIRE FOR HEALTHIER ALTERNATIVES TO THE CLASSIC SNACKS WE
            GREW UP WITH
          </p>
        </div>
        <div className="py-12">
          <h1 className="font-custom text-center text-5xl font-bold text-black">
            Fan Favorites
          </h1>
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Home
