import Products from '../products/Products'
import { ProductsProvider } from '../products/ProductsContext'

function Home() {
  return (
    <>
      <div className="bg-[#f6f3e2]">
        <img
          className="w-full"
          src="//www.pipsnacks.com/cdn/shop/t/205/assets/FRIES-Hero-tagline_headerR2-crop.png?v=144608968554861915091724934551"
          alt=""
        />

        <ProductsProvider>
          <Products />
        </ProductsProvider>
      </div>
    </>
  )
}

export default Home
