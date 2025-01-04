import { RootState } from './rootReducer'

export const selectProducts = (state: RootState) => state.productState.products
