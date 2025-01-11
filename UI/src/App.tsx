import { Route, Routes } from 'react-router'
import './App.css'
import Header from './containers/Header'
import { useAppContext } from './context/AppContext'
import { useData } from './hooks/useData'
import Filters from './pages/Filters'
import Home from './pages/Home'
import { getProducts } from './services/productService'

export default function App() {
  const { dispatch } = useAppContext()

  useData({
    promise: getProducts,
    onLoad: (productsData) => {
      console.log('loaded', productsData)
      dispatch({ type: 'SET_PRODUCTS', payload: productsData })
    },
  })

  return (
    <div className="bg-[#f6f3e2]">
      <Header></Header>
      <Routes>
        <Route index element={<Home />} />
        <Route path="collections/all-products" element={<Filters />} />
      </Routes>
    </div>
  )
}
