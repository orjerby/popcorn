import React, { createContext, useContext, useReducer } from 'react'
import { Product } from '../../../API/models/product'

const ProductsContext = createContext<Product[]>([])

const ProductsDispatchContext = createContext<React.Dispatch<AddedAction>>(
  () => {},
)

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, dispatch] = useReducer(productsReducer, [])

  return (
    <ProductsContext.Provider value={products}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductsContext)
}

export function useProductsDispatch() {
  return useContext(ProductsDispatchContext)
}

type AddedAction = {
  type: 'added'
  products: Product[]
}

function productsReducer(_: Product[], action: AddedAction) {
  switch (action.type) {
    case 'added': {
      return [...action.products]
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
