import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Header from './containers/Header'
import ScrollToTop from './containers/ScrollToTop'
import { useAppContext } from './context/AppContext'
import { useData } from './hooks/useData'
import BundlePage from './pages/BundlePage'
import CheckoutPage from './pages/CheckoutPage'
import Filters from './pages/FiltersPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import SearchPage from './pages/SearchPage'
import { getProducts } from './services/productService'

export default function App() {
  const { dispatch } = useAppContext()
  const [scrolled, setScrolled] = useState(false)

  useData({
    promise: getProducts,
    onLoad: (productsData) => {
      dispatch({ type: 'SET_PRODUCTS', payload: productsData })
    },
  })

  const handleScroll = () => {
    if (window.scrollY > 120) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="relative bg-[#f6f3e2]">
      <Header scrolled={scrolled} />
      <ScrollToTop />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="products">
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="search" element={<SearchPage />} />
        <Route path="collections/all-products" element={<Filters />} />
        <Route path="pages/builder" element={<BundlePage />} />
        <Route path="checkouts" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
