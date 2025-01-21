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
  productsId: string[]
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
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'SET_CART'; payload: { productId: string; quantity: number } }
  | { type: 'ADD_CUSTOM_BUNDLE_TO_CART'; payload: { productsId: string[] } }
  | {
      type: 'UPDATE_CUSTOM_BUNDLE_IN_CART'
      payload: { bundleId: string; productsId: string[] }
    }
  | {
      type: 'REMOVE_CUSTOM_BUNDLE_FROM_CART'
      payload: { bundleId: string }
    }

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
      // Update the products list with the new payload
      state.products = action.payload

      // Extract and sort unique product types from the payload
      state.types = Array.from(
        new Set(action.payload.map((product) => product.type).filter(Boolean)),
      ).sort()

      // Extract and sort unique product flavors from the payload
      state.flavors = Array.from(
        new Set(
          action.payload.map((product) => product.flavor).filter(Boolean),
        ),
      ).sort()

      // Update custom bundles to only include products that exist in the new payload
      state.customBundles = state.customBundles.map((bundle) => ({
        ...bundle,
        productsId: bundle.productsId.filter((productId) =>
          action.payload.find((product) => product.id === productId),
        ),
      }))

      // Remove custom bundles that no longer have any valid products
      state.customBundles = state.customBundles.filter(
        (bundle) => bundle.productsId.length > 0,
      )

      // Update the cart items to only include products and custom bundles that exist in the new payload
      state.cart.items = state.cart.items.filter(
        (item) =>
          (item.type === 'customBundle' &&
            state.customBundles.find(
              (bundle) => bundle.id === item.customBundle.id,
            )) ||
          (item.type === 'products' &&
            action.payload.find((product) => product.id === item.products.id)),
      )

      // Recalculate the total quantity in the cart
      state.cart.totalQuantity = state.cart.items.reduce((acc, item) => {
        if (item.type === 'customBundle') {
          const foundBundle = state.customBundles.find(
            (bundle) => bundle.id === item.customBundle.id,
          )
          return acc + (foundBundle ? foundBundle?.productsId.length : 0)
        }
        return acc + (item.type === 'products' ? item.products.quantity : 0)
      }, 0)
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

      const bundleId = state.customBundles.length + 1

      state.customBundles.push({
        id: `${bundleId}`,
        productsId,
      })

      state.cart.items.push({
        type: 'customBundle',
        customBundle: {
          id: `${bundleId}`,
        },
      })

      state.cart.totalQuantity += productsId.length
      break
    }
    case 'UPDATE_CUSTOM_BUNDLE_IN_CART': {
      const { bundleId, productsId } = action.payload

      const foundBundle = state.customBundles.find(
        (bundle) => bundle.id === bundleId,
      )

      if (foundBundle) {
        foundBundle.productsId = productsId
      }
      break
    }
    case 'REMOVE_CUSTOM_BUNDLE_FROM_CART': {
      const { bundleId } = action.payload

      const foundBundleIndex = state.customBundles.findIndex(
        (bundle) => bundle.id === bundleId,
      )

      if (foundBundleIndex !== -1) {
        state.cart.totalQuantity -=
          state.customBundles[foundBundleIndex].productsId.length

        state.customBundles.splice(foundBundleIndex, 1)
      }

      const foundCartBundle = state.cart.items.findIndex(
        (item) =>
          item.type === 'customBundle' && item.customBundle.id === bundleId,
      )

      state.cart.items.splice(foundCartBundle, 1)
      break
    }
    default:
      break
  }
}
