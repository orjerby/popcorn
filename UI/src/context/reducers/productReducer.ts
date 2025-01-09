import { Draft } from 'immer'
import { Product } from '../../../../API/models/product'

type Cart = {
  productId: string
  quantity: number
}

export type ProductState = {
  products: Product[]
  cart: Cart[]
}

export type ProductAction =
  | { type: 'NO_ACTION'; payload: null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: { productId: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'SET_CART'; payload: { productId: string; quantity: number } }

export const initialProductState: ProductState = {
  products: [],
  cart: [],
}

export const productReducer = (
  state: Draft<ProductState> = initialProductState,
  action: ProductAction = { type: 'NO_ACTION', payload: null },
) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      state.products = action.payload
      break
    case 'ADD_TO_CART': {
      const { productId } = action.payload
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === productId,
      )

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity++
      } else {
        state.cart.push({ productId, quantity: 1 })
      }
      break
    }
    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === productId,
      )

      if (existingItemIndex !== -1) {
        if (state.cart[existingItemIndex].quantity <= 1) {
          state.cart.splice(existingItemIndex, 1)
        } else {
          state.cart[existingItemIndex].quantity--
        }
      }
      break
    }
    case 'SET_CART': {
      const { productId, quantity } = action.payload
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === productId,
      )

      if (existingItemIndex !== -1) {
        if (quantity <= 0) {
          state.cart.splice(existingItemIndex, 1)
        } else {
          state.cart[existingItemIndex].quantity = quantity
        }
      } else {
        if (quantity > 0) {
          state.cart.push({ productId, quantity })
        }
      }
      break
    }
    default:
      break
  }
}
