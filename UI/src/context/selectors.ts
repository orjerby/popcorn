import { Product } from '../../../API/models/product'
import { SortBy } from '../pages/FiltersPage'
import { RootState } from './rootReducer'

export const selectSingleProducts = (state: RootState) =>
  state.productState.products.filter((item) => item.count === 1)

export const selectBundledProducts = (state: RootState) =>
  state.productState.products.filter((item) => item.count > 1)

export const selectProductTypes = (state: RootState) => state.productState.types

export const selectProductFlavors = (state: RootState) =>
  state.productState.flavors

export const selectFilteredBundledProducts = (
  state: RootState,
  {
    filterBy: { types, flavors },
    sortBy,
  }: {
    filterBy: { types?: string[]; flavors?: string[] }
    sortBy: SortBy
  },
) => {
  let filteredProducts = state.productState.products.filter(
    (item) =>
      item.count > 1 &&
      (types?.length ? types?.includes(item.type) : true) &&
      (flavors?.length ? flavors?.includes(item.flavor) : true),
  )

  if (sortBy === 'MOST REVIEWS') {
    filteredProducts.sort((a, b) => b.reviews.length - a.reviews.length)
  } else if (sortBy === 'ALPHABETICALLY, A-Z') {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortBy === 'ALPHABETICALLY, Z-A') {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title))
  } else if (sortBy === 'PRICE, LOW TO HIGH') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'PRICE, HIGH TO LOW') {
    filteredProducts.sort((a, b) => b.price - a.price)
  }

  return filteredProducts
}

export const selectSearchedBundledProducts = (
  state: RootState,
  query: string,
) => {
  const lowerQuery = query.trim().toLowerCase()
  return lowerQuery
    ? state.productState.products.filter(
        (product) =>
          product.count > 1 && product.title.toLowerCase().includes(lowerQuery),
      )
    : []
}

export const selectCartProducts = (
  state: RootState,
): (
  | {
      type: 'products'
      product: Product
      quantity: number
    }
  | {
      type: 'customBundle'
      id: string
      products: { product: Product; quantity: number }[]
      totalPrice: number
    }
)[] =>
  state.productState.cart.items.map((item) => {
    if (item.type === 'products') {
      const foundProduct = state.productState.products.find(
        (product) => product.id === item.products.id,
      )

      if (foundProduct)
        return {
          type: 'products',
          product: foundProduct,
          quantity: item.products.quantity,
        }
      else throw new Error('Product not exist')
    } else {
      const foundBundle = state.productState.customBundles.find(
        (bundle) => bundle.id === item.customBundle.id,
      )

      if (foundBundle) {
        const productMap = new Map<
          string,
          { product: Product; quantity: number }
        >()

        let totalPrice = 0

        foundBundle.productsId.forEach((productId) => {
          const foundProduct = state.productState.products.find(
            (product) => product.id === productId,
          )

          if (foundProduct) {
            totalPrice += foundProduct.price

            const productInMap = productMap.get(productId)
            if (productInMap) {
              productInMap.quantity += 1
            } else {
              productMap.set(productId, { product: foundProduct, quantity: 1 })
            }
          } else {
            throw new Error('Product not exist')
          }
        })

        return {
          type: 'customBundle',
          id: foundBundle.id,
          products: [...productMap.values()],
          totalPrice,
        }
      } else {
        throw new Error('Bundle not exist')
      }
    }
  })

export const selectCartTotalQuantity = (state: RootState) =>
  state.productState.cart.totalQuantity

export const selectCustomBundle = (state: RootState, id: string) => {
  const foundBundle = state.productState.customBundles.find(
    (bundle) => bundle.id === id,
  )

  if (foundBundle)
    return foundBundle.productsId.map((productId) => {
      const foundProduct = state.productState.products.find(
        (product) => product.id === productId,
      )

      if (foundProduct) return foundProduct
      else throw new Error('Product not exist')
    })

  return []
}

export const selectProduct = (state: RootState, id: string) => {
  const foundProduct = state.productState.products.find(
    (product) => product.id === id,
  )

  return foundProduct ? foundProduct : null
}
