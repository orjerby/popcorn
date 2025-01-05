import { RootState } from './rootReducer'

export const selectProducts = (state: RootState) => state.productState.products

export const selectCart = (state: RootState) => state.productState.cart
