import { useState } from 'react'
import { Button, Group, Input, NumberField } from 'react-aria-components'
import { useParams } from 'react-router'
import { useAppContext } from '../context/AppContext'
import { selectProduct } from '../context/selectors'

export default function ProductPage() {
  let { id } = useParams()
  const { state, dispatch } = useAppContext()
  const product = selectProduct(state, id ?? '')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const totalPrice = product.price * quantity

  const addToCart = (quantity: number) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId: product.id, quantity },
    })
  }

  return (
    <div className="mx-auto mt-80 box-content flex max-w-1120 flex-col gap-32 px-16 py-80 lg:flex-row">
      <div className="flex-[0.55]">
        <div className="bg-[#faf8ee]">
          <img src={product.images[selectedImageIndex]} alt="" />
        </div>

        <div className="mt-32 flex h-71 gap-12">
          {product.images.map((image, index) => (
            <button
              onClick={() => setSelectedImageIndex(index)}
              aria-label="image"
              key={index}
              className="flex-0-0-71 bg-[#faf8ee] p-[8px]"
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-[0.45]">
        <p className="text-14 font-normal text-[#c59259] uppercase">
          {product.type}
        </p>

        <h1 className="text-48 font-normal text-black uppercase">
          {product.title}
        </h1>

        <div>
          <p className="text-18 font-normal text-black">
            {product.reviews.length} Reviews
          </p>
        </div>

        <p className="text-14 font-normal text-black">Select a size</p>

        <div className="mt-4"></div>

        <div className="rounded-4 mt-16 bg-white p-[8px]"></div>

        <div className="mt-16 flex">
          <div className="rounded-6 bg-white"></div>

          <div className="flex w-full gap-12">
            <NumberField
              defaultValue={1}
              minValue={0}
              maxValue={99}
              aria-label="quantity"
              value={quantity}
              onChange={setQuantity}
              onBlur={(e) =>
                (e.target as HTMLInputElement).value === ''
                  ? setQuantity(0)
                  : undefined
              }
              className="rounded-6 bg-white"
            >
              <Group className="flex h-full items-center justify-center">
                <Button slot="decrement" className="px-[16px]">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#BD8447]"
                  >
                    <path
                      d="M3.4375 9.75781H16.5625C16.6667 9.75781 16.7188 9.8099 16.7188 9.91406V11.0859C16.7188 11.1901 16.6667 11.2422 16.5625 11.2422H3.4375C3.33333 11.2422 3.28125 11.1901 3.28125 11.0859V9.91406C3.28125 9.8099 3.33333 9.75781 3.4375 9.75781Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                    ></path>
                  </svg>
                </Button>
                <Input className="text-18 w-24 text-center font-bold text-[#414141]" />
                <Button slot="increment" className="px-[16px]">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#BD8447]"
                  >
                    <path
                      d="M9.41406 3.46875H10.5859C10.6901 3.46875 10.7422 3.52083 10.7422 3.625V17.375C10.7422 17.4792 10.6901 17.5312 10.5859 17.5312H9.41406C9.3099 17.5312 9.25781 17.4792 9.25781 17.375V3.625C9.25781 3.52083 9.3099 3.46875 9.41406 3.46875Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                    ></path>
                    <path
                      d="M3.4375 9.75781H16.5625C16.6667 9.75781 16.7188 9.8099 16.7188 9.91406V11.0859C16.7188 11.1901 16.6667 11.2422 16.5625 11.2422H3.4375C3.33333 11.2422 3.28125 11.1901 3.28125 11.0859V9.91406C3.28125 9.8099 3.33333 9.75781 3.4375 9.75781Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                    ></path>
                  </svg>
                </Button>
              </Group>
            </NumberField>

            <Button
              onPress={() => addToCart(quantity)}
              className="rounded-6 flex-1 bg-[#3EADB8] p-[12px]"
            >
              <span className="text-18 font-normal text-white uppercase">
                add to cart | {totalPrice}$
              </span>
            </Button>
          </div>
        </div>

        <p className="text-18 mt-64 font-normal text-black">
          {product.description}
        </p>
      </div>
    </div>
  )
}
