import { Draft } from 'immer'
import { Product, SnackFlavor, SnackType } from '../../../../API/models/product'

type Cart = {
  totalQuantity: number
  products: {
    productId: string
    quantity: number
  }[]
}

export type ProductState = {
  products: Product[]
  types: SnackType[]
  flavors: SnackFlavor[]
  cart: Cart
}

export type ProductAction =
  | { type: 'NO_ACTION'; payload: null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: { productId: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'SET_CART'; payload: { productId: string; quantity: number } }

export const initialProductState: ProductState = {
  products: [],
  types: [],
  flavors: [],
  cart: { totalQuantity: 0, products: [] },
}

export const productReducer = (
  state: Draft<ProductState> = initialProductState,
  action: ProductAction = { type: 'NO_ACTION', payload: null },
) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      state.products = action.payload
      state.types = Array.from(
        new Set(action.payload.map((product) => product.type).filter(Boolean)),
      ).sort()

      state.flavors = Array.from(
        new Set(
          action.payload.map((product) => product.flavor).filter(Boolean),
        ),
      ).sort()
      break
    case 'ADD_TO_CART': {
      const { productId } = action.payload
      const existingItemIndex = state.cart.products.findIndex(
        (item) => item.productId === productId,
      )

      if (existingItemIndex !== -1) {
        state.cart.products[existingItemIndex].quantity++
      } else {
        state.cart.products.push({ productId, quantity: 1 })
      }

      state.cart.totalQuantity++
      break
    }
    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload
      const existingItemIndex = state.cart.products.findIndex(
        (item) => item.productId === productId,
      )

      if (existingItemIndex !== -1) {
        if (state.cart.products[existingItemIndex].quantity <= 1) {
          state.cart.products.splice(existingItemIndex, 1)
        } else {
          state.cart.products[existingItemIndex].quantity--
        }

        state.cart.totalQuantity--
      }
      break
    }
    case 'SET_CART': {
      const { productId, quantity } = action.payload
      const existingItemIndex = state.cart.products.findIndex(
        (item) => item.productId === productId,
      )

      if (existingItemIndex !== -1) {
        if (quantity <= 0) {
          state.cart.totalQuantity -=
            state.cart.products[existingItemIndex].quantity
          state.cart.products.splice(existingItemIndex, 1)
        } else {
          state.cart.totalQuantity +=
            quantity - state.cart.products[existingItemIndex].quantity
          state.cart.products[existingItemIndex].quantity = quantity
        }
      } else {
        if (quantity > 0) {
          state.cart.totalQuantity += quantity
          state.cart.products.push({ productId, quantity })
        }
      }
      break
    }
    default:
      break
  }
}
