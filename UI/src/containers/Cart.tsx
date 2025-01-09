import Drawer from '@mui/material/Drawer'
import { useAppContext } from '../context/AppContext'
import { selectCart } from '../context/selectors'

type Props = {
  isOpen: boolean
  close: () => void
}

export default function Cart({ isOpen, close }: Props) {
  const { state, dispatch } = useAppContext()
  const cart = selectCart(state)

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
        <ul>
          {[...cart].reverse().map((item) => (
            <li key={item.productId}>
              <button onClick={() => setCart(item.productId, 0)}>
                DELETE ALL
              </button>
              <button onClick={() => addToCart(item.productId)}>+</button>
              <button onClick={() => removeFromCart(item.productId)}>-</button>
              <input
                value={item.quantity}
                onChange={(e) => setCart(item.productId, +e.target.value)}
                type="number"
              />
              {item.productId}
            </li>
          ))}
        </ul>
      ) : (
        <div>no items in cart!</div>
      )}
    </div>
  )

  return (
    <Drawer anchor={'right'} open={isOpen} onClose={close}>
      {DrawerList}
    </Drawer>
  )
}
