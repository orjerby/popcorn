import { Button } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { HiOutlineTrash } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { Link } from 'react-router'
import { useAppContext } from '../context/AppContext'
import { selectCartProducts } from '../context/selectors'

type Props = {
  open: boolean
  onClose: () => void
}

export default function Cart({ open, onClose }: Props) {
  const { state, dispatch } = useAppContext()
  const cart = selectCartProducts(state)

  const img =
    'https://cdn.shopify.com/s/files/1/0162/2468/products/cinnamon-sugar-twists-pipcorn-381635.png?v=1673391008'
  const addToCart = (productId: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId },
    })
  }

  const removeFromCart = (productId: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId },
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
        <div className="flex flex-col items-center justify-center overflow-hidden">
          {[...cart].reverse().map((item, index) =>
            item.type === 'products' ? (
              <div
                key={index}
                className="my-10 ms-40 me-40 w-full max-w-480 space-y-15 space-x-15 rounded border border-[#c9c1b8] bg-white p-10"
              >
                <div className="grid max-w-480 grid-cols-[1fr_3fr_1fr]">
                  <div className="flex items-center justify-center border-gray-300 bg-white">
                    <div>
                      <img className="max-w-80" src={img} alt="" />
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
                      <div className="align-bottom text-black">$20</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={index} className="border">
                <Link to={`/pages/builder?bundle=${item.id}`} onClick={onClose}>
                  EDIT
                </Link>
                {item.products.map((product, index) => (
                  <div key={index}>{product.title}</div>
                ))}
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
    <Drawer anchor={'right'} open={open} onClose={onClose}>
      <div className="relative flex h-full w-full flex-col">
        <div className="z-40 flex justify-between px-20 py-15 text-4xl text-[#953300] uppercase">
          <h2>Cart</h2>
          <Button
            className="cursor-pointer text-red-500"
            onClick={() => onClose()}
          >
            <IoCloseOutline color="#953300" size={20} />
          </Button>
        </div>
        <hr className="z-40 opacity-20" />
        <img
          className="absolute z-10 h-full w-full bg-[#f6f3e2] bg-cover"
          src="https://www.pipsnacks.com/cdn/shop/t/205/assets/rice-paper.webp?v=15630725387464339411709904553"
          alt=""
        />
        <div className="z-40 flex text-[#953300]">{DrawerList}</div>
      </div>
    </Drawer>
  )
}
