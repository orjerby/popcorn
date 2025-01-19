import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router'
import { Product } from '../../../API/models/product'
import { useAppContext } from '../context/AppContext'
import {
  selectCustomBundle,
  selectProductTypes,
  selectSingleProducts,
} from '../context/selectors'

export default function Bundle() {
  const { state, dispatch } = useAppContext()

  const [searchParams] = useSearchParams()

  const types = selectProductTypes(state)
  const singleProducts = selectSingleProducts(state)

  const bundleIdParam = searchParams.get('bundle') ?? ''
  const existCustomBundle = selectCustomBundle(state, bundleIdParam)

  const [currentBundle, setCurrentBundle] = useState<Product[]>([])

  useEffect(() => {
    setCurrentBundle(existCustomBundle)
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
    setCurrentBundle([...currentBundle, product])
  }

  const submit = () => {
    const productsId = currentBundle.map((p) => p.id)

    if (existCustomBundle.length) updateCustomBundleToCart(productsId)
    else addCustomBundleToCart(productsId)
  }

  return (
    <div className="h-1300 overflow-hidden scroll-smooth">
      <h1 className="text-9xl text-black">Bundle</h1>
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

      <div className="flex">
        <div className="flex flex-col gap-10">
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
                  <div>
                    {singleProducts
                      .filter((product) => product.type === type)
                      .map((product) => {
                        return (
                          <div
                            key={product.id}
                            className="mt-10 flex w-fit cursor-pointer flex-wrap gap-3 border text-black uppercase hover:scale-105"
                          >
                            <div className="ml-20 p-3 text-blue-600">
                              {product.id} - {product.title}
                            </div>
                            <button
                              onClick={() => {
                                addToBundle(product)
                              }}
                              disabled={currentBundle.length === 12}
                              className="ml-4 bg-amber-300 p-3 disabled:opacity-50"
                            >
                              ADD TO BUNDLE
                            </button>
                          </div>
                        )
                      })}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        {/* <div className="ml-200 grid max-h-500 grid-cols-4 gap-5 text-black">
          <div className="max-w-240 bg-amber-500">b</div>
          <div>c</div>
          <div>d</div>
          <div>a</div>

          <div>b</div>
          <div>c</div>
          <div>d</div>
          <div>a</div>

          <div>b</div>
          <div>c</div>
          <div>d</div>
          <div>a</div>
        </div> */}
        <div className="relative bottom-40 mt-100 flex-col overflow-hidden text-black">
          <ul className="flex flex-col gap-10 text-lg font-bold text-black uppercase">
            {currentBundle.map((product, index) => {
              return (
                <li key={index} className="uppercase">
                  <span className="border p-3 text-blue-600">
                    {product.title}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentBundle(
                        currentBundle.filter((_p, idx) => idx !== index),
                      )
                    }
                    className="ml-10 cursor-pointer rounded border bg-red-500 p-3"
                  >
                    DELETE
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <button
          onClick={submit}
          disabled={
            currentBundle.length !== 4 &&
            currentBundle.length !== 8 &&
            currentBundle.length !== 12
          }
          className="h-50 cursor-pointer border border-black bg-amber-300 text-3xl disabled:cursor-auto disabled:opacity-50"
        >
          {existCustomBundle.length ? 'update' : 'add'} custom bundle
        </button>
      </div>
    </div>
  )
}
