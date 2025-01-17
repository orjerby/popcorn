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
  { types, flavors }: { types?: string[]; flavors?: string[] },
) =>
  state.productState.products.filter(
    (item) =>
      item.count > 1 &&
      (types?.length ? types?.includes(item.type) : true) &&
      (flavors?.length ? flavors?.includes(item.flavor) : true),
  )

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

export const selectCartProducts = (state: RootState) =>
  state.productState.cart.products

export const selectCartTotalQuantity = (state: RootState) =>
  state.productState.cart.totalQuantity
