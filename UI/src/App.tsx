import './App.css'
import Products from './products/Products'
import { ProductsProvider } from './products/ProductsContext'

function App() {
  return (
    <>
      <ProductsProvider>
        <Products />
      </ProductsProvider>
    </>
  )
}

export default App
