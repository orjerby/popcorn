import { Product } from '../../../../API/models/product'

type ProductState = {
  products: Product[]
}

export type ProductAction =
  | { type: 'NO_ACTION'; payload: null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }

export const initialProductState: ProductState = {
  products: [],
}

export const productReducer = (
  state: ProductState = initialProductState,
  action: ProductAction = { type: 'NO_ACTION', payload: null },
): ProductState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload }
    default:
      return state
  }
}
