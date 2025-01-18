import { Suspense } from 'react'
import { Link } from 'react-router'
import ProductList from '../containers/ProductList'

export default function Home() {
  return (
    <>
      <div className="mt-40 bg-[#f6f3e2]">
        <Link to={'collections/all-products?types=Fries'}>
          <div className="relative block">
            <img
              className="h-auto w-full max-w-full"
              width={1300}
              height={727}
              src="https://www.pipsnacks.com/cdn/shop/t/205/assets/FRIES-Hero-tagline_headerR2-crop.png?v=144608968554861915091724934551"
              alt=""
            />
            <div className="absolute bottom-[5%] left-1/2 h-full max-h-16 w-full max-w-24 rounded bg-white opacity-80"></div>
          </div>
        </Link>
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
          <h1 className="mt-36 mb-36 text-center text-5xl font-bold text-black uppercase">
            Fan Favorites
          </h1>
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductList />
          </Suspense>
        </div>
        {/* Build your own bundle section */}
        <div className="py-16">
          <div className="container mx-auto transform rounded transition hover:scale-105">
            <div className="flex rounded-lg bg-[#b69775]">
              <div className="flex-1 items-center justify-center p-16">
                <Link
                  to={'pages/builder'}
                  className="cursor-pointer justify-center pb-12 pl-32 text-4xl text-black uppercase"
                >
                  can't pick a favorite? choose your own snack-adventure!
                </Link>
              </div>
              <div className="flex max-w-320 items-center justify-center gap-4 rounded bg-orange-500 px-8 py-5 text-4xl text-white uppercase">
                <Link
                  to={'pages/builder'}
                  className="cursor-pointer font-light"
                >
                  Build your <br /> own bundle
                </Link>
                <a className="flex items-center justify-center bg-orange-500 px-10">
                  <svg
                    className="text-2xl font-bold text-white"
                    viewBox="0 0 13 29"
                    width="13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.34375 1.91296L11.0839 13.7996C11.4786 14.3363 11.4733 15.0687 11.071 15.5998L2.34375 27.1198"
                      stroke="currentColor"
                      strokeWidth="3.00977"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-16">
              <Link to={'collections/all-products?types=Cheese+Balls'}>
                <div className="group relative cursor-pointer overflow-hidden rounded-xl">
                  <img
                    className="transform transition duration-200 group-hover:scale-105"
                    src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home-layers-2.png?v=148265719181198205821700256160"
                    alt=""
                  />
                  <img
                    className="absolute right-0 bottom-0 mr-25 mb-15 w-full max-w-224 transform transition duration-200 group-hover:scale-95"
                    src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home_layer_logo_2.png?v=113524904076145218291700256158"
                    alt=""
                    height={400}
                  />
                </div>
              </Link>
              <Link to={'collections/all-products?types=Popcorn'}>
                <div className="group relative cursor-pointer overflow-hidden rounded-xl">
                  <img
                    className="transform transition duration-200 group-hover:scale-105"
                    src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home-layers-4.png?v=85460436416592772881700256151"
                    alt=""
                  />
                  <img
                    className="absolute right-0 bottom-0 mr-25 mb-15 w-full max-w-224 transform transition duration-200 group-hover:scale-95"
                    src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home_layer_logo_4.png?v=153146537531975114011700256158"
                    alt=""
                    height={400}
                  />
                </div>
              </Link>
              <Link to={'collections/all-products?types=Twists'}>
                <div className="group relative cursor-pointer overflow-hidden rounded-xl">
                  <img
                    className="transform transition duration-200 group-hover:scale-105"
                    src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home-layers-1.png?v=65731467904801407471700256157"
                    alt=""
                  />
                  <img
                    className="absolute right-0 bottom-0 mr-25 mb-15 w-full max-w-224 transform transition duration-200 group-hover:scale-95"
                    src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home_layer_logo_1.png?v=17247479584948056611700256160"
                    alt=""
                    height={400}
                  />
                </div>
              </Link>
              <Link to={'collections/all-products?types=Crunchies'}>
                <div className="group relative cursor-pointer overflow-hidden rounded-xl">
                  <img
                    className="transform transition duration-200 group-hover:scale-105"
                    src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home-layers-3.png?v=14406280734367485691700256159"
                    alt=""
                  />
                  <img
                    className="absolute right-0 bottom-0 mr-25 mb-15 w-full max-w-224 transform transition duration-200 group-hover:scale-95"
                    src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home_layer_logo_3.png?v=123617556695366971881700256157"
                    alt=""
                    height={400}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
