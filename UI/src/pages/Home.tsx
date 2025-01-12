import { Suspense } from 'react'
import ProductList from '../containers/ProductList'

export default function Home() {
  return (
    <>
      <div className="bg-[#f6f3e2]">
        <img
          className="w-full"
          src="https://www.pipsnacks.com/cdn/shop/t/205/assets/FRIES-Hero-tagline_headerR2-crop.png?v=144608968554861915091724934551"
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
          <h1 className="mt-36 mb-36 text-center text-5xl font-bold text-black uppercase">
            Fan Favorites
          </h1>
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductList />
          </Suspense>
        </div>
        {/* Build your own bundle section */}
        <div className="py-16">
          <div className="container mx-auto rounded">
            <div className="flex items-center justify-center bg-[#b69775]">
              <div className="flex-1 items-center justify-center p-16">
                <a className="justify-center pb-12 pl-32 text-4xl text-black uppercase">
                  can't pick a favorite? choose your own snack-adventure!
                </a>
              </div>
              <div className="flex max-w-320 items-center justify-center gap-4 rounded bg-orange-500 px-8 py-3 text-4xl text-white uppercase">
                <a className="font-light">
                  Build your <br /> own bundle
                </a>
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
              <div>
                <img
                  src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home-layers-2.png?v=148265719181198205821700256160"
                  alt=""
                />
              </div>
              <div>
                {' '}
                <img
                  src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home-layers-4.png?v=85460436416592772881700256151"
                  alt=""
                />
              </div>
              <div>
                {' '}
                <img
                  src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home-layers-1.png?v=65731467904801407471700256157"
                  alt=""
                />
              </div>
              <div>
                {' '}
                <img
                  src="https://www.pipsnacks.com/cdn/shop/t/200/assets/home-layers-3.png?v=14406280734367485691700256159"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
