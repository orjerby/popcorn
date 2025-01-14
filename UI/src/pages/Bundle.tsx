import { useState } from 'react'
import { Product } from '../../../API/models/product'
import { useAppContext } from '../context/AppContext'
import { selectProductTypes, selectSingleProducts } from '../context/selectors'

export default function Bundle() {
  const [bundle, setBundle] = useState<Product[]>([])
  const [index, setIndex] = useState<number>(0)

  const { state } = useAppContext()
  const types = selectProductTypes(state)
  const singleProducts = selectSingleProducts(state)

  return (
    <div className="h-1300 overflow-hidden">
      <h1 className="text-9xl text-black">Bundle</h1>
      <ul className="flex gap-x-10 text-sm font-bold text-black uppercase">
        <li className="p-5">Jump to: </li>
        {types.map((type) => {
          return (
            <li key={type}>
              <button className="border p-5">{type}</button>
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
                      <h2 className="p-5 text-2xl text-[#52525B]">{type}</h2>
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
                            <div
                              className="ml-4 bg-amber-300 p-3"
                              onClick={() => {
                                setBundle([...bundle, product])
                              }}
                            >
                              ADD TO BUNDLE
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="relative bottom-40 left-700 mt-100 flex-col overflow-hidden text-black">
          <ul className="flex flex-col gap-10 text-lg font-bold text-black uppercase">
            {bundle.map((product, index) => {
              return (
                <li key={index} className="uppercase">
                  <span className="border p-3 text-blue-600">
                    {product.title}
                  </span>
                  <button
                    onClick={() =>
                      setBundle(bundle.filter((_p, idx) => idx !== index))
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
      </div>
    </div>
  )
}
