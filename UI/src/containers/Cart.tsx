import { Button } from '@mui/material'
import { Link } from 'react-aria-components'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { HiOutlineTrash } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { useAppContext } from '../context/AppContext'
import { selectCartProducts } from '../context/selectors'

type Props = {
  onClose: () => void
}

export default function Cart({ onClose }: Props) {
  const { state, dispatch } = useAppContext()
  const cart = selectCartProducts(state)

  const addToCart = (productId: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity: 1 },
    })
  }

  const removeFromCart = (productId: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId },
    })
  }

  const removeBundleFromCart = (bundleId: string) => {
    dispatch({
      type: 'REMOVE_CUSTOM_BUNDLE_FROM_CART',
      payload: { bundleId },
    })
  }

  const setCart = (productId: string, quantity: number) => {
    dispatch({
      type: 'SET_CART',
      payload: { productId, quantity },
    })
  }

  const DrawerList = (
    <div>
      {cart.length > 0 ? (
        <div className="flex flex-col items-center justify-center">
          {[...cart].reverse().map((item, index) =>
            item.type === 'products' ? (
              <div
                key={index}
                className="my-10 ms-40 me-40 w-full max-w-480 space-y-15 space-x-15 rounded border border-[#c9c1b8] bg-white p-10"
              >
                <div className="grid max-w-480 grid-cols-[1fr_3fr_1fr]">
                  <div className="flex items-center justify-center border-gray-300 bg-white">
                    <div>
                      <img
                        className="max-w-80"
                        src={item.product.images[0]}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex items-center border-gray-300 bg-white">
                    <div>
                      <div className="text-xl uppercase">{item.product.id}</div>
                      <span className="text-black">size 4g-oz</span>
                      <span className="flex gap-5">
                        <span className="pr-6 text-black">Qty:</span>

                        <button
                          className="cursor-pointer"
                          title="-"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <FaMinus />
                        </button>
                        <input
                          className="qty-input max-w-40 pl-10 text-center font-bold text-black"
                          aria-label="quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            setCart(item.product.id, +e.target.value)
                          }
                          type="number"
                        />
                        <button
                          className="cursor-pointer"
                          title="+"
                          onClick={() => addToCart(item.product.id)}
                        >
                          <FaPlus />
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center border-gray-300 bg-white">
                    <div className="mb-30 ml-20 flex flex-col items-center justify-center">
                      <div>
                        <button
                          className="cursor-pointer"
                          title="?"
                          onClick={() => setCart(item.product.id, 0)}
                        >
                          <HiOutlineTrash color="black" size={25} />
                        </button>
                      </div>
                      <div className="align-bottom text-black">
                        ${item.product.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // BUNDLE DESIGN
              <div
                key={index}
                className="my-10 ms-40 me-40 inline-flex w-full max-w-480 flex-col space-y-15 space-x-15 border border-[#c9c1b8]"
              >
                <div>
                  {item.products.map((productData, index) => (
                    <div key={index} className="bg-white p-10">
                      <div className="grid max-w-480 grid-cols-[1fr_3fr_1fr]">
                        <div className="flex items-center justify-center bg-white">
                          <div>
                            <img
                              className="max-w-80"
                              src={productData.product.images[0]}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-center overflow-hidden border-gray-300 bg-white">
                          <div className="overflow-hidden">
                            {/* <div className="text-xl uppercase line-clamp-1"> */}
                            <div className="overflow-hidden text-xl text-ellipsis whitespace-nowrap uppercase">
                              {productData.product.id} -{' '}
                              {productData.product.title}
                            </div>
                            <span className="text-black uppercase">
                              {productData.quantity} bag $
                              {productData.product.price}
                            </span>
                          </div>
                        </div>
                        <div className="mt-15 flex items-center justify-center place-self-start border-gray-300 bg-white">
                          <div className="ml-20 flex flex-col items-center justify-center">
                            <div>
                              <div className="text-black">
                                $
                                {productData.product.price *
                                  productData.quantity}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                  <div className="me-40 w-full max-w-480 space-y-15 space-x-15 bg-white p-10">
                    <div className="mb-30 flex gap-10">
                      <Link
                        className="rounded border border-gray-200 px-25 py-8 text-black"
                        href={`/pages/builder?bundle=${item.id}`}
                        onPress={onClose}
                      >
                        EDIT
                      </Link>
                      <button
                        onClick={() => removeBundleFromCart(item.id)}
                        className="text-16 cursor-pointer rounded bg-[#ff6c68] px-25 py-8 text-black uppercase"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      ) : (
        <div>no items in cart!</div>
      )}
    </div>
  )

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden">
      <img
        className="absolute h-full w-full bg-[#f6f3e2] bg-cover"
        src="https://www.pipsnacks.com/cdn/shop/t/205/assets/rice-paper.webp?v=15630725387464339411709904553"
        alt=""
      />
      <div className="relative flex justify-between border-b px-20 py-15 text-4xl text-[rgba(0,0,0,20%)] uppercase">
        <h2 className="text-[#953300]">Cart</h2>
        <Button
          className="cursor-pointer text-red-500"
          onClick={() => onClose()}
        >
          <IoCloseOutline color="#953300" size={20} />
        </Button>
      </div>

      <div className="relative flex h-full overflow-y-auto text-[#953300]">
        {DrawerList}
      </div>

      <div className="relative flex flex-col">
        <div className="flex justify-between bg-[#e5d1b3] px-16 py-8 text-black">
          <span className="text-black">Discounts</span>
          <span className="">-$0</span>
        </div>
        <div className="bg-[#ebe6d3] p-16">
          <div className="flex justify-between">
            <div className="text-20 text-[#b74600] uppercase">shipping</div>
            <div className="text-20 text-[#b74600] uppercase">subtotal</div>
          </div>
          <div className="flex justify-between">
            <div className="text-14 text-black uppercase">
              Woo hoo! you scored free shipping 🥳
            </div>
            <div className="text-20 text-[#b74600] uppercase">$666</div>
          </div>
        </div>
        <div className="flex justify-center bg-[#3eadb8]">
          <Link
            className="text-20 px-16 py-14 text-white uppercase"
            onPress={onClose}
            href={'checkouts'}
          >
            continue to checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
