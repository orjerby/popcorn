import { Draft } from 'immer'
import {
  initialProductState,
  ProductAction,
  productReducer,
  ProductState,
} from './reducers/productReducer'

export type RootState = {
  productState: ProductState
}

const initialState: RootState = {
  productState: initialProductState,
}

export type Action = ProductAction

export const rootReducer = (
  state: Draft<RootState> = initialState,
  action?: Action,
): RootState => {
  productReducer(state.productState, action)
  return state
}

export const getInitialState = () => initialState
