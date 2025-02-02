import {
  ComponentProps,
  ElementType,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  AriaLinkOptions,
  useFocusVisible,
  useHover,
  useLink,
  useObjectRef,
} from 'react-aria'
import { Link } from 'react-aria-components'
import { MdOutlineCancel } from 'react-icons/md'
import { useSearchParams } from 'react-router'
import { Product, SnackType } from '../../../API/models/product'
import Stars from '../components/Stars'
import { useAppContext } from '../context/AppContext'
import {
  selectCustomBundle,
  selectProductTypes,
  selectSingleProducts,
} from '../context/selectors'

//

// Types for ScrollSection component

type ScrollSectionProps = ComponentProps<'section'> & {
  as?: ElementType
}

function ScrollSection({
  ref,
  as: Component = 'div',
  children,
  ...props
}: ScrollSectionProps) {
  return (
    <Component
      {...props}
      ref={ref}
      tabIndex={-1}
      className={`${props.className} outline-none`}
    >
      {children}
    </Component>
  )
}

// Types for ScrollButton component

type ScrollButtonProps = ComponentProps<'a'> & {
  sectionRef?: RefObject<HTMLElement | null>
  ariaLinkProps?: AriaLinkOptions
  isCurrent?: boolean
  onSelected?: () => void
}

function ScrollButton({
  ref,
  sectionRef,
  ariaLinkProps,
  isCurrent,
  onSelected,
  children,
  ...props
}: ScrollButtonProps) {
  const { hoverProps, isHovered } = useHover({})
  const [isFocused, setIsFocused] = useState(false)
  const { isFocusVisible } = useFocusVisible()
  const { linkProps, isPressed } = useLink(
    {
      ...ariaLinkProps,
      elementType: 'span',
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      onPress: () => {
        sectionRef?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })

        sectionRef?.current?.focus({ preventScroll: true })

        onSelected?.()
      },
    },
    useObjectRef(ref),
  )

  return (
    <a
      tabIndex={0}
      {...props}
      {...linkProps}
      {...hoverProps}
      ref={ref}
      aria-current={isCurrent}
      data-current={isCurrent || undefined}
      data-hovered={isHovered || undefined}
      data-pressed={(isPressed && isHovered) || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={(isFocused && isFocusVisible) || undefined}
    >
      {children}
    </a>
  )
}

//

type SnackTypeSelectorProps = {
  types: SnackType[]
}

export const SnackTypeSelector = ({ types }: SnackTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<SnackType | null>(null)

  return (
    <ul className="flex items-center gap-x-8">
      <li className="text-16 font-normal text-black">JUMP TO:</li>
      {types.map((type) => (
        <li key={type} className="cursor-pointer">
          <Link
            aria-current={selectedType === type}
            onPress={() => {
              setSelectedType(type)
            }}
            className="text-14 rounded-6 block border border-[#C1803E] px-[8px] py-[2px] font-normal text-black data-current:bg-[#C1803E] data-current:text-white data-pressed:outline-none"
          >
            {type}
          </Link>
        </li>
      ))}
    </ul>
  )
}

type SnackItemProps = {
  product: Product
  onAddToBundle: (product: Product) => void
}

export const SnackItem = ({ product, onAddToBundle }: SnackItemProps) => (
  <div className="mt-20 flex max-h-96 items-center rounded border-2 border-amber-600 bg-white">
    <div className="max-h-130 max-w-130 flex-1 -rotate-6">
      <img src={product.images[0]} alt={product.title} />
    </div>
    <div className="flex-3 flex-col">
      <div>
        <span className="text-xl text-black uppercase">
          {product.id} -- {product.title}
        </span>
        <div className="flex text-black">
          {/* Assuming you pass Stars here */}
          <span className="ml-20 text-sm underline">25 reviews</span>
          <Link className="ml-10 text-sm underline">view product</Link>
        </div>
        <span className="text-sm text-black">
          1 - {product.size} - ${product.price.toFixed(2)} ea.
        </span>
      </div>
    </div>
    <div className="flex h-full !items-end !justify-end self-end">
      <button
        onClick={() => onAddToBundle(product)}
        className="cursor-pointer rounded-tl-xl bg-amber-500 p-7 text-xl text-white uppercase"
      >
        Add to Bundle
      </button>
    </div>
  </div>
)

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

  const [selectedType, setSelectedType] = useState<SnackType | null>(null)

  const focusRefs = useRef<Map<string, React.RefObject<HTMLElement | null>>>(
    new Map(),
  )

  const getFocusRefs = () => {
    if (!focusRefs.current) {
      focusRefs.current = new Map()
    }

    return focusRefs.current
  }

  return (
    <div className="">
      <div className="">
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
                {types.map((type) => (
                  <li key={type} className="cursor-pointer">
                    <ScrollButton
                      sectionRef={getFocusRefs().get(type)}
                      isCurrent={selectedType === type}
                      onSelected={() => setSelectedType(type)}
                      className="text-14 rounded-6 block border border-[#C1803E] px-[8px] py-[2px] font-normal text-black data-current:bg-[#C1803E] data-current:text-white data-pressed:outline-none"
                    >
                      {type}
                    </ScrollButton>

                    {/* <Link
                      aria-current={selectedType === type}
                      onPress={() => {
                        setSelectedType(type)
                        onSelectedType(type)
                      }}
                      className="text-14 rounded-6 block border border-[#C1803E] px-[8px] py-[2px] font-normal text-black data-current:bg-[#C1803E] data-current:text-white data-pressed:outline-none"
                    >
                      {type}
                    </Link> */}
                  </li>
                ))}
              </ul>
            </div>
            {/* add to bundle comp */}
            <ul className="flex flex-col gap-x-10 text-sm font-bold text-black uppercase">
              {types.map((type) => {
                return (
                  <ScrollSection
                    as={'li'}
                    key={type}
                    ref={(node) => {
                      const focusRefs = getFocusRefs()
                      if (node) {
                        focusRefs.set(type, { current: node })
                      } else {
                        focusRefs.delete(type)
                      }
                    }}
                    className="outline-4 outline-blue-300"
                  >
                    <h2 className="p-5 text-2xl text-[#52525B]">{type}</h2>
                    {singleProducts
                      .filter((product) => product.type === type)
                      .map((product) => {
                        return (
                          <div
                            key={product.id}
                            className="mt-20 flex max-h-96 items-center rounded border-2 border-amber-600 bg-white"
                          >
                            <div className="max-h-130 max-w-130 flex-1 -rotate-6">
                              <img src={product.images[0]} alt="" />
                            </div>
                            <div className="flex-3 flex-col">
                              <div>
                                <span className="text-xl text-black uppercase">
                                  {product.id} -- {product.title}
                                </span>
                                <div className="flex text-black">
                                  <Stars></Stars>
                                  <span className="ml-20 text-sm underline">
                                    25 reviews
                                  </span>
                                  <Link className="ml-10 text-sm underline">
                                    view product
                                  </Link>
                                </div>

                                <span className="text-sm text-black">
                                  1 - {product.size} - $5.00 ea.
                                </span>
                              </div>
                              <div></div>
                              <div></div>
                            </div>
                            <div className="flex h-full !items-end !justify-end self-end">
                              <button
                                onClick={() => {
                                  addToBundle(product)
                                }}
                                className="cursor-pointer rounded-tl-xl bg-amber-500 p-7 text-xl text-white uppercase"
                              >
                                add to bundle
                              </button>
                            </div>
                          </div>
                        )
                      })}
                  </ScrollSection>
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
