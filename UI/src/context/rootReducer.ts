import {
  initialProductState,
  ProductAction,
  productReducer,
} from './reducers/productReducer'

export type RootState = {
  productState: ReturnType<typeof productReducer>
}

const initialState: RootState = {
  productState: initialProductState,
}

export type Action = ProductAction

export const rootReducer = (
  state = initialState,
  action?: Action,
): RootState => ({
  productState: productReducer(state.productState, action),
})
