import './App.css'
import Products from './products/Products'
import { ProductsProvider } from './products/ProductsContext'

function App() {
  return (
    <>
      <ProductsProvider>
        <h1>Day off in Kyoto</h1>
        <Products />
      </ProductsProvider>
    </>
  )
}

export default App
