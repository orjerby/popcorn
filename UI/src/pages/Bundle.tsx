import { useEffect, useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md'

import { Link, useSearchParams } from 'react-router'
import { Product } from '../../../API/models/product'
import Stars from '../components/Stars'
import { useAppContext } from '../context/AppContext'
import { selectProductTypes, selectSingleProducts } from '../context/selectors'
const defaultProduct: Product = {
  id: '',
  title: 'Default Snack',
  count: 1,
  size: 'Medium',
  price: 10.99,
  description: 'A default snack description.',
  images: [''],
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
export default function Bundle() {
  const { state, dispatch } = useAppContext()

  const [searchParams] = useSearchParams()

  const types = selectProductTypes(state)
  const singleProducts = selectSingleProducts(state)

  const bundleIdParam = searchParams.get('bundle') ?? ''
  // const existCustomBundle = selectCustomBundle(state, bundleIdParam)

  const [currentBundle, setCurrentBundle] = useState<Product[]>(
    Array(12).fill(defaultProduct),
  )
  console.log(currentBundle)
  // const [currentBundleImages1, setCurrentBundleImages1] = useState<string[]>(
  //   Array(4).fill(null),
  // )

  // const [currentBundleImages2, setCurrentBundleImages2] = useState<string[]>(
  //   Array(4).fill(null),
  // )

  // const [currentBundleImages3, setCurrentBundleImages3] = useState<string[]>(
  //   Array(4).fill(null),
  // )

  const firstFourProducts = currentBundle.slice(0, 4)
  console.log(firstFourProducts)

  const secondFourProducts = currentBundle.slice(4, 8)

  const thirdFourProducts = currentBundle.slice(8, 12)

  const [count, setCount] = useState<number>(0)

  // useEffect(() => {
  //   setCurrentBundle(existCustomBundle)
  // }, [bundleIdParam])

  useEffect(() => {
    setCurrentBundle(currentBundle)
  }, [currentBundle])

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
    setCurrentBundle([...currentBundle, product])
  }

  const PrepareToAddToBundle = (product: Product) => {
    if (count === 12) return
    setCurrentBundle((prevState) => {
      const newState = [...prevState]
      newState[count] = product
      return newState
    })

    setCount(count + 1)

    // const PrepareToAddToBundle = (product: Product) => {
    //   if (count === 12) return
    //   if (count >= 0 && count < 4)
    //     setCurrentBundleImages1((prevState) => {
    //       const newState = [...prevState]
    //       newState[count] = product.images[0]
    //       return newState
    //     })
    //   else if (count >= 4 && count < 8)
    //     setCurrentBundleImages2((prevState) => {
    //       const newState = [...prevState]
    //       newState[count - 4] = product.images[0]
    //       return newState
    //     })
    //   else
    //     setCurrentBundleImages3((prevState) => {
    //       const newState = [...prevState]
    //       newState[count - 8] = product.images[0]
    //       return newState
    //     })
    //   setCount(count + 1)
  }

  // const submit = () => {
  //   const productsId = currentBundle.map((p) => p.id)

  //   if (existCustomBundle.length) updateCustomBundleToCart(productsId)
  //   else addCustomBundleToCart(productsId)
  // }

  const submit = () => {
    const productsId = currentBundle.map((p) => p.id)

    if (currentBundle.length) updateCustomBundleToCart(productsId)
    else addCustomBundleToCart(productsId)
  }

  return (
    // NEW DESIGN
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
              <ul className="flex gap-x-10 text-sm font-bold text-black uppercase">
                <li className="p-5">Jump to: </li>
                {types.map((type) => {
                  return (
                    <li key={type} className="cursor-pointer">
                      <button
                        onClick={() => {
                          const element = document.getElementById(type)
                          if (element) {
                            const yOffset = -120
                            const y =
                              element.getBoundingClientRect().top +
                              window.scrollY +
                              yOffset
                            window.scrollTo({ top: y, behavior: 'smooth' })
                          }
                        }}
                        className="border p-5"
                      >
                        {type}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            {/* add to bundle comp */}
            <ul className="flex flex-col gap-x-10 text-sm font-bold text-black uppercase">
              {types.map((type) => {
                return (
                  <li key={type}>
                    <ul>
                      <li key={type}>
                        <h2 id={type} className="p-5 text-2xl text-[#52525B]">
                          {type}
                        </h2>
                      </li>
                    </ul>
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
                                  <Link
                                    className="ml-10 text-sm underline"
                                    to=""
                                  >
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
                                  PrepareToAddToBundle(product)
                                }}
                                className="cursor-pointer rounded-tl-xl bg-amber-500 p-7 text-xl text-white uppercase"
                              >
                                add to bundle
                              </button>
                            </div>{' '}
                          </div>
                        )
                      })}
                  </li>
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
                          onClick={() => {
                            setCurrentBundle((prevState) => {
                              const newState = [...prevState]
                              newState[index] = defaultProduct
                              return newState
                            })
                            setCount(index)
                          }}
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

              {/* <div className="mt-10 flex flex-col bg-[#F5F5F3] p-5">
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
                          onClick={() => {
                            setCurrentBundle((prevState) => {
                              const newState = [...prevState]
                              newState[index] = defaultProduct
                              return newState
                            })
                          }}
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
                          onClick={() => {}}
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
              </div> */}

              {/* <div className="mt-10 flex flex-col bg-[#F5F5F3] p-5">
                <span className="ml-30 text-black">8 PACK</span>
                <div className="mt-10 flex justify-center gap-10 bg-[#F5F5F3] p-10">
                  {currentBundleImages2.map((image, index) =>
                    image === null || image === '' ? (
                      <div className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-dashed border-[#CBC1B7]">
                        <img src={image} alt="" />
                        <span className="absolute right-0 bottom-0 text-black">
                          {index + 5}
                        </span>
                      </div>
                    ) : (
                      <div className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-[#de7846]">
                        <button
                          onClick={() => {
                            setCurrentBundleImages2((prevState) => {
                              const newState = [...prevState]
                              newState[index] = ''
                              return newState
                            })

                            // if (index - 1 >= 0)
                            //   setCurrentBundleImages1((prevState) => {
                            //     const newState = [...prevState]

                            //     newState[index] = currentBundleImages1[index + 1]
                            //     newState[index + 1] = ''

                            //     return newState
                            //   })
                            setCount(count - 1)
                          }}
                          aria-label="delete"
                          className="absolute top-[-10px] right-[-8px] cursor-pointer text-black"
                        >
                          <MdOutlineCancel className="z-20 m-0 h-auto w-auto rounded-full bg-white p-0 drop-shadow-none" />
                        </button>
                        <img
                          className="rounded-8 h-full w-full bg-[#f5d6c7]"
                          src={image}
                          alt=""
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-10 flex flex-col bg-[#F5F5F3] p-5">
                <span className="ml-30 text-black">8 PACK</span>
                <div className="mt-10 flex justify-center gap-10 bg-[#F5F5F3] p-10">
                  {currentBundleImages3.map((image, index) =>
                    image === null || image === '' ? (
                      <div className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-dashed border-[#CBC1B7]">
                        <img src={image} alt="" />
                        <span className="absolute right-0 bottom-0 text-black">
                          {index + 9}
                        </span>
                      </div>
                    ) : (
                      <div className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-[#de7846]">
                        <button
                          onClick={() => {
                            setCurrentBundleImages3((prevState) => {
                              const newState = [...prevState]
                              newState[index] = ''
                              return newState
                            })
                            // if (index - 1 >= 0)
                            //   setCurrentBundleImages1((prevState) => {
                            //     const newState = [...prevState]

                            //     newState[index] = currentBundleImages1[index + 1]
                            //     newState[index + 1] = ''

                            //     return newState
                            //   })
                            setCount(count - 1)
                          }}
                          aria-label="delete"
                          className="absolute top-[-10px] right-[-8px] cursor-pointer text-black"
                        >
                          <MdOutlineCancel className="z-20 m-0 h-auto w-auto rounded-full bg-white p-0 drop-shadow-none" />
                        </button>
                        <img
                          className="rounded-8 h-full w-full bg-[#f5d6c7]"
                          src={image}
                          alt=""
                        />
                      </div>
                    ),
                  )}
                </div>
              </div> */}

              <button className="text-20 mt-4 w-full rounded bg-[#3EADB8] p-14 text-white uppercase opacity-75">
                add custom bundle to cart
              </button>
              <div></div>

              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // OLD DESIGN
    // <div className="h-1300 overflow-hidden scroll-smooth">
    //   <h1 className="text-9xl text-black">Bundle</h1>
    //   <ul className="flex gap-x-10 text-sm font-bold text-black uppercase">
    //     <li className="p-5">Jump to: </li>
    //     {types.map((type) => {
    //       return (
    //         <li key={type} className="cursor-pointer">
    //           <button
    //             onClick={() => {
    //               const element = document.getElementById(type)
    //               if (element) {
    //                 const yOffset = -120
    //                 const y =
    //                   element.getBoundingClientRect().top +
    //                   window.scrollY +
    //                   yOffset
    //                 window.scrollTo({ top: y, behavior: 'smooth' })
    //               }
    //             }}
    //             className="border p-5"
    //           >
    //             {type}
    //           </button>
    //         </li>
    //       )
    //     })}
    //   </ul>

    //   <div className="flex">
    //     <div className="flex flex-col gap-10">
    //       <ul className="flex flex-col gap-x-10 text-sm font-bold text-black uppercase">
    //         {types.map((type) => {
    //           return (
    //             <li key={type}>
    //               <ul>
    //                 <li key={type}>
    //                   <h2 id={type} className="p-5 text-2xl text-[#52525B]">
    //                     {type}
    //                   </h2>
    //                 </li>
    //               </ul>
    //               <div>
    //                 {singleProducts
    //                   .filter((product) => product.type === type)
    //                   .map((product) => {
    //                     return (
    //                       <div
    //                         key={product.id}
    //                         className="mt-10 flex w-fit cursor-pointer flex-wrap gap-3 border text-black uppercase hover:scale-105"
    //                       >
    //                         <div className="ml-20 p-3 text-blue-600">
    //                           {product.id} - {product.title}
    //                         </div>
    //                         <button
    //                           onClick={() => {
    //                             addToBundle(product)
    //                           }}
    //                           disabled={currentBundle.length === 12}
    //                           className="ml-4 bg-amber-300 p-3 disabled:opacity-50"
    //                         >
    //                           ADD TO BUNDLE
    //                         </button>
    //                       </div>
    //                     )
    //                   })}
    //               </div>
    //             </li>
    //           )
    //         })}
    //       </ul>
    //     </div>
    //     {/* <div className="ml-200 grid max-h-500 grid-cols-4 gap-5 text-black">
    //       <div className="max-w-240 bg-amber-500">b</div>
    //       <div>c</div>
    //       <div>d</div>
    //       <div>a</div>

    //       <div>b</div>
    //       <div>c</div>
    //       <div>d</div>
    //       <div>a</div>

    //       <div>b</div>
    //       <div>c</div>
    //       <div>d</div>
    //       <div>a</div>
    //     </div> */}
    //     <div className="relative bottom-40 mt-100 flex-col overflow-hidden text-black">
    //       <ul className="flex flex-col gap-10 text-lg font-bold text-black uppercase">
    //         {currentBundle.map((product, index) => {
    //           return (
    //             <li key={index} className="uppercase">
    //               <span className="border p-3 text-blue-600">
    //                 {product.title}
    //               </span>
    //               <button
    //                 onClick={() =>
    //                   setCurrentBundle(
    //                     currentBundle.filter((_p, idx) => idx !== index),
    //                   )
    //                 }
    //                 className="ml-10 cursor-pointer rounded border bg-red-500 p-3"
    //               >
    //                 DELETE
    //               </button>
    //             </li>
    //           )
    //         })}
    //       </ul>
    //     </div>
    //     <button
    //       onClick={submit}
    //       disabled={
    //         currentBundle.length !== 4 &&
    //         currentBundle.length !== 8 &&
    //         currentBundle.length !== 12
    //       }
    //       className="h-50 cursor-pointer border border-black bg-amber-300 text-3xl disabled:cursor-auto disabled:opacity-50"
    //     >
    //       {existCustomBundle.length ? 'update' : 'add'} custom bundle
    //     </button>
    //   </div>
    // </div>
  )
}
