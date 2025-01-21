import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Header from './containers/Header'
import ScrollToTop from './containers/ScrollToTop'
import { useAppContext } from './context/AppContext'
import { useData } from './hooks/useData'
import Bundle from './pages/Bundle'
import Filters from './pages/Filters'
import Home from './pages/Home'
import Product from './pages/Product'
import Search from './pages/Search'
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
    // console.log(window.scrollY)

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
      <div className="mt-140">
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="products">
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="collections/all-products" element={<Filters />} />
          <Route path="pages/builder" element={<Bundle />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}
