import { Draft } from 'immer'
import { Product, SnackFlavor, SnackType } from '../../../../API/models/product'

type CartProduct = {
  type: 'products'
  products: {
    id: string
    quantity: number
  }
}

type CartCustomBundle = {
  type: 'customBundle'
  customBundle: {
    id: string
  }
}

export type Cart = {
  totalQuantity: number
  items: (CartProduct | CartCustomBundle)[]
}

type CustomBundles = {
  id: string
  products: {
    id: string
  }[]
}[]

export type ProductState = {
  products: Product[]
  types: SnackType[]
  flavors: SnackFlavor[]
  cart: Cart
  customBundles: CustomBundles
}

export type ProductAction =
  | { type: 'NO_ACTION'; payload: null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: { productId: string } }
  | { type: 'ADD_CUSTOM_BUNDLE_TO_CART'; payload: { productsId: string[] } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'SET_CART'; payload: { productId: string; quantity: number } }

export const initialProductState: ProductState = {
  products: [],
  types: [],
  flavors: [],
  cart: { totalQuantity: 0, items: [] },
  customBundles: [],
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
      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.type === 'products' && item.products.id === productId,
      )

      if (
        existingItemIndex !== -1 &&
        state.cart.items[existingItemIndex].type === 'products'
      ) {
        state.cart.items[existingItemIndex].products.quantity++
      } else {
        state.cart.items.push({
          type: 'products',
          products: { id: productId, quantity: 1 },
        })
      }

      state.cart.totalQuantity++
      break
    }
    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload
      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.type === 'products' && item.products.id === productId,
      )

      if (
        existingItemIndex !== -1 &&
        state.cart.items[existingItemIndex].type === 'products'
      ) {
        if (state.cart.items[existingItemIndex].products.quantity <= 1) {
          state.cart.items.splice(existingItemIndex, 1)
        } else {
          state.cart.items[existingItemIndex].products.quantity--
        }

        state.cart.totalQuantity--
      }
      break
    }
    case 'SET_CART': {
      const { productId, quantity } = action.payload
      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.type === 'products' && item.products.id === productId,
      )

      if (
        existingItemIndex !== -1 &&
        state.cart.items[existingItemIndex].type === 'products'
      ) {
        if (quantity <= 0) {
          state.cart.totalQuantity -=
            state.cart.items[existingItemIndex].products.quantity
          state.cart.items.splice(existingItemIndex, 1)
        } else {
          state.cart.totalQuantity +=
            quantity - state.cart.items[existingItemIndex].products.quantity
          state.cart.items[existingItemIndex].products.quantity = quantity
        }
      } else {
        if (quantity > 0) {
          state.cart.totalQuantity += quantity
          state.cart.items.push({
            type: 'products',
            products: { id: productId, quantity },
          })
        }
      }
      break
    }
    case 'ADD_CUSTOM_BUNDLE_TO_CART': {
      const { productsId } = action.payload

      state.customBundles.push({
        id: '1',
        products: productsId.map((product) => ({
          id: product,
        })),
      })

      state.cart.items.push({
        type: 'customBundle',
        customBundle: {
          id: '1',
        },
      })

      state.cart.totalQuantity += productsId.length
      break
    }
    default:
      break
  }
}
