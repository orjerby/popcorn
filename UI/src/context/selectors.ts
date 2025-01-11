import { RootState } from './rootReducer'

export const selectProducts = (state: RootState) => state.productState.products

export const selectProductTypes = (state: RootState) => state.productState.types

export const selectProductFlavors = (state: RootState) =>
  state.productState.flavors

export const selectFilteredProducts = (
  state: RootState,
  { types, flavors }: { types?: string[]; flavors?: string[] },
) =>
  state.productState.products.filter(
    (item) =>
      (types?.length ? types?.includes(item.type) : true) &&
      (flavors?.length ? flavors?.includes(item.flavor) : true),
  )

export const selectCartProducts = (state: RootState) =>
  state.productState.cart.products

export const selectCartTotalQuantity = (state: RootState) =>
  state.productState.cart.totalQuantity
