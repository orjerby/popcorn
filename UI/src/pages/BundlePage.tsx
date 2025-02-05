import { useEffect, useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { Link, useSearchParams } from 'react-router'
import { Product } from '../../../API/models/product'
import Stars from '../components/Stars'
import { useAppContext } from '../context/AppContext'
import {
  selectCustomBundle,
  selectProductTypes,
  selectSingleProducts,
} from '../context/selectors'
import { ToggleButton } from '../ui/ToggleButton'
import { ToggleButtonGroup } from '../ui/ToggleButtonGroup'

const defaultProduct: Product = {
  id: '',
  title: 'Default Snack',
  count: 1,
  size: 'Medium',
  price: 10.99,
  description: 'A default snack description.',
  images: [],
  type: 'Cheese Balls',
  flavor: 'Cheddar',
  reviews: [
    {
      rate: 5,
      title: 'Great Product',
      description: 'This is a sample review for the default product.',
      name: 'John Doe',
    },
  ],
}
export default function BundlePage() {
  const { state, dispatch } = useAppContext()

  const [searchParams] = useSearchParams()

  const types = selectProductTypes(state)

  const singleProducts = selectSingleProducts(state)

  const bundleIdParam = searchParams.get('bundle') ?? ''

  const existCustomBundle = selectCustomBundle(state, bundleIdParam)

  const [currentBundle, setCurrentBundle] = useState<Product[]>(
    existCustomBundle.length > 0
      ? [
          ...existCustomBundle,
          ...Array(12 - existCustomBundle.length).fill(defaultProduct),
        ]
      : Array(12).fill(defaultProduct),
  )

  const firstFourProducts = currentBundle.slice(0, 4)

  const secondFourProducts = currentBundle.slice(4, 8)

  const thirdFourProducts = currentBundle.slice(8, 12)

  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    if (bundleIdParam) {
      setCurrentBundle([
        ...existCustomBundle,
        ...Array(12 - existCustomBundle.length).fill(defaultProduct),
      ])
      setCount(existCustomBundle.length)
    } else {
      setCurrentBundle(Array(12).fill(defaultProduct))
      setCount(0)
    }
  }, [bundleIdParam])

  const addCustomBundleToCart = (productsid: string[]) => {
    dispatch({
      type: 'ADD_CUSTOM_BUNDLE_TO_CART',
      payload: { productsId: productsid },
    })
  }

  const updateCustomBundleToCart = (productsid: string[]) => {
    dispatch({
      type: 'UPDATE_CUSTOM_BUNDLE_IN_CART',
      payload: { bundleId: bundleIdParam, productsId: productsid },
    })
  }

  const addToBundle = (product: Product) => {
    if (count === 12) return
    setCurrentBundle(() => {
      let arr = currentBundle
      arr[count] = product
      return arr
    })
    setCount(count + 1)
  }

  const deletefromBundle = (index: number) => {
    let arr = currentBundle
    for (let i = index; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1]
    }

    setCurrentBundle(arr)

    if (index === 11) {
      arr = currentBundle
      arr[11] = defaultProduct
      setCurrentBundle(arr)
    }
    setCount(count - 1)
  }

  const submit = () => {
    const productsId = currentBundle.slice(0, count).map((p) => p.id)

    if (count === 0) updateCustomBundleToCart(productsId)
    else addCustomBundleToCart(productsId)
  }

  return (
    <div>
      <div>
        <div className="relative">
          <img
            className="w-full"
            src="https://www.pipsnacks.com/cdn/shop/t/205/assets/bundle-builder-cover.webp?v=92580026083330038291709732442"
            alt=""
            width={1200}
            height={400}
          />
          <div className="absolute top-1/2 ml-40 max-w-400 rounded bg-white text-3xl text-black uppercase opacity-80">
            <p className="p-10">
              choose your own snack adventure and build your own bundle!
            </p>
          </div>
        </div>
      </div>

      {/* white title part */}
      <div className="w-full bg-white">
        <h2 className="w-full bg-white p-40 text-center text-3xl text-black uppercase">
          Select 4, 8, or 12 packs of your pipcorn favorites to create your
          perfect snack lineup
        </h2>
      </div>

      {/* page body part (list and bundle) */}
      <div className="relative container mx-auto w-fit">
        <div className="flex">
          <div className="flex h-2200 w-720 flex-col bg-[#F9F1E6]">
            <div className="mx-auto p-10 text-center">
              {/* <SnackTypeSelector types={types} /> */}

              <ul className="flex items-center gap-x-8">
                <li className="text-16 font-normal text-black">JUMP TO:</li>
                <ToggleButtonGroup
                  disallowEmptySelection
                  onSelectionChange={(keys) => {
                    const sectionId = `section-${[...keys.values()][0]}`
                    const section = document.getElementById(sectionId)
                    section?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                    section?.focus({ preventScroll: true })
                  }}
                >
                  {types.map((type) => (
                    <ToggleButton key={type} id={type}>
                      {type}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </ul>
            </div>
            {/* add to bundle comp */}
            <ul className="flex flex-col gap-x-10 text-sm font-bold text-black uppercase">
              {types.map((type) => {
                return (
                  <div
                    key={type}
                    id={`section-${type}`}
                    tabIndex={-1}
                    className={`outline-none`}
                  >
                    <h2 className="p-5 text-2xl text-[#52525B]">{type}</h2>
                    {singleProducts
                      .filter((product) => product.type === type)
                      .map((product) => {
                        return (
                          <div
                            key={product.id}
                            className={`rounded-8 relative mt-20 flex max-h-96 items-center gap-8 border-2 bg-white px-3 py-2`}
                            style={{
                              borderColor: product.color,
                            }}
                          >
                            <div className="">
                              <img
                                className="mr-auto ml-auto max-h-138 max-w-138 -rotate-6"
                                src={product.images[0]}
                                alt=""
                              />
                            </div>
                            <div className="flex-3 flex-col px-12 py-8">
                              <div>
                                <span className="text-xl text-zinc-600 uppercase">
                                  {product.id} -- {product.title}
                                </span>
                                <div className="flex text-black">
                                  <Stars color={product.color}></Stars>
                                  <span className="ml-20 text-sm text-zinc-600 underline">
                                    25 reviews
                                  </span>
                                  <Link
                                    to={`/products/${product.id}`}
                                    className="ml-10 text-sm text-zinc-600 underline"
                                  >
                                    VIEW MORE
                                  </Link>
                                </div>

                                <span className="text-sm text-black">
                                  1 - {product.size} - ${product.price} ea.
                                </span>
                              </div>
                              <div></div>
                              <div></div>
                            </div>
                            <div className="absolute right-0 bottom-0">
                              <button
                                onClick={() => {
                                  addToBundle(product)
                                }}
                                className="cursor-pointer rounded-tl-xl px-16 py-4 text-xl text-white uppercase"
                                style={{
                                  backgroundColor: product.color,
                                }}
                              >
                                add to bundle
                              </button>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                )
              })}
            </ul>
          </div>
          <div className="sticky top-130 ml-20 flex h-660 w-370 -translate-y-20 flex-col rounded border-2 border-[#CBC1B7] bg-white">
            <div className="p-10">
              <div>
                <h1 className="text-36 text-zinc-600 uppercase">Your bundle</h1>
                <hr className="mt-5 border-1 text-[#CBC1B7]" />
              </div>
              <div className="mt-10">
                <span className="text-18 text-black">
                  add 8 or more and score free shipping!
                </span>
                <div className="rounded-10 mt-10 bg-[#CBC1B773] p-7"></div>
              </div>

              <div className="mt-10 flex flex-col bg-[#F5F5F3] p-5">
                <span className="ml-30 text-black">4 PACK</span>
                <div className="flex justify-center gap-10 bg-[#F5F5F3] p-10">
                  {firstFourProducts.map((product, index) =>
                    product.id === '' ? (
                      <div className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-dashed border-[#CBC1B7]">
                        <img src={product.images[0]} alt="" />
                        <span className="absolute right-0 bottom-0 text-black">
                          {index + 1}
                        </span>
                      </div>
                    ) : (
                      <div className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-[#de7846]">
                        <button
                          onClick={() => deletefromBundle(index)}
                          aria-label="delete"
                          className="absolute top-[-10px] right-[-8px] cursor-pointer text-black"
                        >
                          <MdOutlineCancel className="z-20 m-0 h-auto w-auto rounded-full bg-white p-0 drop-shadow-none" />
                        </button>
                        <img
                          className="rounded-8 h-full w-full bg-[#f5d6c7]"
                          src={product.images[0]}
                          alt="1"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-10 flex flex-col bg-[#F5F5F3] p-5">
                <span className="ml-30 text-black">8 PACK</span>
                <div className="flex justify-center gap-10 bg-[#F5F5F3] p-10">
                  {secondFourProducts.map((product, index) =>
                    product.id === '' ? (
                      <div className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-dashed border-[#CBC1B7]">
                        <img src={product.images[0]} alt="" />
                        <span className="absolute right-0 bottom-0 text-black">
                          {index + 1}
                        </span>
                      </div>
                    ) : (
                      <div className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-[#de7846]">
                        <button
                          onClick={() => deletefromBundle(index + 4)}
                          aria-label="delete"
                          className="absolute top-[-10px] right-[-8px] cursor-pointer text-black"
                        >
                          <MdOutlineCancel className="z-20 m-0 h-auto w-auto rounded-full bg-white p-0 drop-shadow-none" />
                        </button>
                        <img
                          className="rounded-8 h-full w-full bg-[#f5d6c7]"
                          src={product.images[0]}
                          alt="1"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-10 flex flex-col bg-[#F5F5F3] p-5">
                <span className="ml-30 text-black">12 PACK</span>
                <div className="flex justify-center gap-10 bg-[#F5F5F3] p-10">
                  {thirdFourProducts.map((product, index) =>
                    product.id === '' ? (
                      <div className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-dashed border-[#CBC1B7]">
                        <img src={product.images[0]} alt="" />
                        <span className="absolute right-0 bottom-0 text-black">
                          {index + 1}
                        </span>
                      </div>
                    ) : (
                      <div className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-[#de7846]">
                        <button
                          onClick={() => deletefromBundle(index + 8)}
                          aria-label="delete"
                          className="absolute top-[-10px] right-[-8px] cursor-pointer text-black"
                        >
                          <MdOutlineCancel className="z-20 m-0 h-auto w-auto rounded-full bg-white p-0 drop-shadow-none" />
                        </button>
                        <img
                          className="rounded-8 h-full w-full bg-[#f5d6c7]"
                          src={product.images[0]}
                          alt="1"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <button
                onClick={submit}
                disabled={count !== 4 && count !== 8 && count !== 12}
                className="text-20 mt-4 w-full cursor-pointer rounded bg-[#3EADB8] p-14 text-white uppercase opacity-75 disabled:cursor-auto disabled:opacity-50"
              >
                {existCustomBundle.length
                  ? 'update custom bundle'
                  : 'add custom bundle to cart'}
              </button>
              <div></div>

              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
