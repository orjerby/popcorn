import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Product } from '../../../API/models/product'
import BundleProductsRow from '../components/BundleProductsRow'
import Stars from '../components/Stars'
import { ToggleButton } from '../components/ToggleButton/ToggleButton'
import { useAppContext } from '../context/AppContext'
import {
  selectCustomBundle,
  selectProductTypes,
  selectSingleProducts,
} from '../context/selectors'
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
  const [barWidth, setBarWidth] = useState(0)
  const [searchParams] = useSearchParams()

  const types = selectProductTypes(state)

  const singleProducts = selectSingleProducts(state)

  const bundleIdParam = searchParams.get('bundle') ?? ''

  const existCustomBundle = selectCustomBundle(state, bundleIdParam)

  const [num, setnum] = useState<number>(0)

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
    console.log('num ', num)
    console.log('barwidth ', barWidth)

    const bar = document.getElementById('my-bar')
    const barwidth = bar?.offsetWidth

    if (bar) {
      const computedWidth = parseFloat(getComputedStyle(bar).width) // Get computed width as a number

      setBarWidth(computedWidth)
    }
    if (barwidth)
      if (count <= 7) {
        console.log('count ', count)
        setnum(num + barwidth / 8)
      }

    if (count === 12) return
    setCurrentBundle(() => {
      let arr = currentBundle
      arr[count] = product
      return arr
    })
    setCount(count + 1)
  }

  const deletefromBundle = (index: number) => {
    const bar = document.getElementById('my-bar')
    const barwidth = bar?.offsetWidth
    if (count > 0 && count <= 8 && barwidth) setnum(num - barwidth / 8)

    let arr = currentBundle
    for (let i = index; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1]
    }

    setCurrentBundle(arr)

    if (index >= 11) {
      arr = currentBundle
      arr[index] = defaultProduct
      setCurrentBundle(arr)
    }

    if (count === 12) {
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
                    className={`border-b-2 border-solid border-b-gray-400 px-16 py-32 outline-none`}
                  >
                    <h2 className="p-5 text-2xl text-[#52525B]">{type}</h2>
                    {singleProducts
                      .filter((product) => product.type === type)
                      .map((product) => {
                        const sizeSplited = product.size.split('-')
                        const sizeSingle = sizeSplited[1].split(' ')
                        console.log(sizeSingle[0])

                        return (
                          <div
                            key={product.id}
                            className={`rounded-8 relative mt-20 flex max-h-96 items-center gap-8 border-2 bg-white px-3 py-2`}
                            style={{
                              borderColor: product.color,
                            }}
                          >
                            <div className="absolute -left-30">
                              <img
                                className="mr-auto ml-auto max-h-126 max-w-126 -rotate-6"
                                src={product.images[0]}
                                alt=""
                              />
                            </div>
                            <div className="ml-100 flex-3 flex-col px-12 py-8">
                              <div>
                                <span className="text-xl text-zinc-600 uppercase">
                                  {product.id} -- {product.title}
                                </span>
                                <div className="flex text-black">
                                  <Stars color={product.color}></Stars>
                                  <span className="ml-20 text-sm text-zinc-600 lowercase underline">
                                    25 reviews
                                  </span>
                                  <Link
                                    to={`/products/${product.id}`}
                                    className="ml-10 text-sm text-zinc-600 lowercase underline"
                                  >
                                    VIEW MORE
                                  </Link>
                                </div>
                                <span className="text-sm text-black lowercase">
                                  1 - {sizeSingle[0]} - $
                                  {product.price.toFixed(2)} ea.
                                </span>
                              </div>
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
          <div className="sticky top-80 ml-20 flex h-fit w-370 -translate-y-20 flex-col rounded border-2 border-[#CBC1B7] bg-white p-16">
            <div>
              <h1 className="text-36 text-zinc-600 uppercase">Your bundle</h1>
              <hr className="mt-5 border-1 text-[#CBC1B7]" />
            </div>
            <div className="mt-10">
              <span className="text-18 text-black">
                {count < 8
                  ? `add ${8 - count} or more and score free shipping!`
                  : 'YOU SCORED FREE SHIPPING! 🥳'}
              </span>
              <div className="relative mt-10">
                <div
                  id="my-bar"
                  className="rounded-10 absolute inset-0 bg-[#CBC1B773] p-7"
                ></div>
                <div
                  style={{
                    maxWidth: num, // Control width based on `num`
                    padding: '7px', // Always have padding from the start
                    clipPath:
                      num < barWidth
                        ? 'polygon(100% 0%, 0% 0%, 0% 100%, 98% 100%)'
                        : 'none',
                    borderTopRightRadius: num >= barWidth ? 10 : 0,
                    borderBottomRightRadius: num >= barWidth ? 10 : 0,
                  }}
                  className={`rounded-l-10 relative transform bg-[#C1803E] transition-all ${
                    num > 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                ></div>
              </div>
            </div>
            <BundleProductsRow
              rowTitle={'4 PACK'}
              rowStartLocation={0}
              products={firstFourProducts}
              deleteFromBundle={deletefromBundle}
            />
            <BundleProductsRow
              rowTitle={'8 PACK'}
              rowStartLocation={4}
              products={secondFourProducts}
              deleteFromBundle={deletefromBundle}
            />
            <BundleProductsRow
              rowTitle={'12 PACK'}
              rowStartLocation={8}
              products={thirdFourProducts}
              deleteFromBundle={deletefromBundle}
            />

            <button
              onClick={submit}
              disabled={count !== 4 && count !== 8 && count !== 12}
              className="text-20 mt-4 w-full cursor-pointer rounded bg-[#3EADB8] p-14 text-white uppercase disabled:cursor-auto"
            >
              <div className="disabled:opacity-50">
                {' '}
                {existCustomBundle.length
                  ? 'update custom bundle'
                  : 'add custom bundle to cart'}
              </div>
              <div className="text-18 text-black lowercase">
                {count < 4 ? `add ${4 - count} more items` : ''}
                {count >= 4 && count < 8
                  ? `add ${8 - count} more items and score free shipping!`
                  : ''}
                <span className="uppercase">
                  {' '}
                  {count === 8 ? 'YOU SCORED FREE SHIPPING! 🥳' : ''}
                </span>
                {count >= 9 && count < 12 ? `add ${12 - count} more items` : ''}
                <span className="uppercase">
                  {' '}
                  {count === 12 ? 'YOU SCORED FREE SHIPPING! 🥳' : ''}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
