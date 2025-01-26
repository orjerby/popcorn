import { Draft } from 'immer'
import { Product, SnackFlavor, SnackType } from '../../../../API/models/product'

export type ProductState = {
  products: Product[]
  types: SnackType[]
  flavors: SnackFlavor[]
  cart: {
    totalQuantity: number
    items: (
      | {
          type: 'products'
          products: {
            id: string
            quantity: number
          }
        }
      | {
          type: 'customBundle'
          customBundle: {
            id: string
          }
        }
    )[]
  }
  customBundles: {
    id: string
    productsId: string[]
  }[]
}

export type ProductAction =
  | { type: 'NO_ACTION'; payload: null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: { productId: string; quantity: number } }
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
      state.types = [
        ...new Set(
          action.payload.map((product) => product.type).filter(Boolean),
        ),
      ].sort()

      // Extract and sort unique product flavors from the payload
      state.flavors = [
        ...new Set(
          action.payload.map((product) => product.flavor).filter(Boolean),
        ),
      ].sort()

      // Filter out invalid products from custom bundles and remove empty bundles
      state.customBundles = state.customBundles
        .map((bundle) => ({
          ...bundle,
          productsId: bundle.productsId.filter((productId) =>
            action.payload.some((product) => product.id === productId),
          ),
        }))
        .filter((bundle) => bundle.productsId.length > 0)

      // Filter out invalid products and custom bundles from the cart
      state.cart.items = state.cart.items.filter((item) => {
        if (item.type === 'customBundle') {
          return state.customBundles.some(
            (bundle) => bundle.id === item.customBundle.id,
          )
        }
        return action.payload.some((product) => product.id === item.products.id)
      })

      // Recalculate the total quantity in the cart
      state.cart.totalQuantity = state.cart.items.reduce((acc, item) => {
        if (item.type === 'customBundle') {
          const foundBundle = state.customBundles.find(
            (bundle) => bundle.id === item.customBundle.id,
          )
          return acc + (foundBundle ? foundBundle.productsId.length : 0)
        }
        return acc + (item.type === 'products' ? item.products.quantity : 0)
      }, 0)
      break
    case 'ADD_TO_CART': {
      const { productId, quantity } = action.payload
      const existingItem = state.cart.items.find(
        (item) => item.type === 'products' && item.products.id === productId,
      )

      if (existingItem && existingItem.type === 'products') {
        // If the product is already in the cart, increase its quantity
        existingItem.products.quantity += quantity
      } else {
        // If the product is not in the cart, add it with quantity 1
        state.cart.items.push({
          type: 'products',
          products: { id: productId, quantity },
        })
      }

      // Increase the total quantity in the cart
      state.cart.totalQuantity += quantity
      break
    }
    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload
      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.type === 'products' && item.products.id === productId,
      )

      if (existingItemIndex !== -1) {
        const existingItem = state.cart.items[existingItemIndex]
        if (existingItem.type === 'products') {
          if (existingItem.products.quantity <= 1) {
            // If the product quantity is 1 or less, remove it from the cart
            state.cart.items.splice(existingItemIndex, 1)
          } else {
            // Otherwise, decrease the product quantity
            existingItem.products.quantity--
          }
          // Decrease the total quantity in the cart
          state.cart.totalQuantity--
        }
      }
      break
    }
    case 'SET_CART': {
      const { productId, quantity } = action.payload
      const existingItem = state.cart.items.find(
        (item) => item.type === 'products' && item.products.id === productId,
      )

      if (existingItem && existingItem.type === 'products') {
        // Adjust the total quantity based on the new quantity
        state.cart.totalQuantity += quantity - existingItem.products.quantity
        if (quantity <= 0) {
          // If the new quantity is 0 or less, remove the product from the cart
          state.cart.items = state.cart.items.filter(
            (item) =>
              item.type === 'products' && item.products.id !== productId,
          )
        } else {
          // Otherwise, update the product quantity
          existingItem.products.quantity = quantity
        }
      } else if (quantity > 0) {
        // If the product is not in the cart and quantity is positive, add it
        state.cart.items.push({
          type: 'products',
          products: { id: productId, quantity },
        })
        state.cart.totalQuantity += quantity
      }
      break
    }
    case 'ADD_CUSTOM_BUNDLE_TO_CART': {
      const { productsId } = action.payload
      const bundleId = `${state.customBundles.length + 1}`

      // Add the new custom bundle to the customBundles array
      state.customBundles.push({ id: bundleId, productsId })
      // Add the custom bundle to the cart
      state.cart.items.push({
        type: 'customBundle',
        customBundle: { id: bundleId },
      })
      // Increase the total quantity in the cart by the number of products in the bundle
      state.cart.totalQuantity += productsId.length
      break
    }
    case 'UPDATE_CUSTOM_BUNDLE_IN_CART': {
      const { bundleId, productsId } = action.payload
      const foundBundle = state.customBundles.find(
        (bundle) => bundle.id === bundleId,
      )

      if (foundBundle) {
        // Update the productsId of the found custom bundle
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
        // Decrease the total quantity in the cart by the number of products in the bundle
        state.cart.totalQuantity -=
          state.customBundles[foundBundleIndex].productsId.length
        // Remove the custom bundle from the customBundles array
        state.customBundles.splice(foundBundleIndex, 1)
      }

      // Remove the custom bundle from the cart
      state.cart.items = state.cart.items.filter(
        (item) =>
          !(item.type === 'customBundle' && item.customBundle.id === bundleId),
      )
      break
    }
    default:
      break
  }
}
