import { useEffect, useRef, useState } from 'react'
import { Button, RouterProvider } from 'react-aria-components'
import { useHref, useNavigate } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Header from './containers/Header'
import { useAppContext } from './context/AppContext'
import { useData } from './hooks/useData'
import Routes from './Routes'
import { getProducts } from './services/productService'

export default function App() {
  const { dispatch } = useAppContext()
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const mainRef = useRef<HTMLDivElement>(null)

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
    <RouterProvider navigate={navigate} useHref={useHref}>
      <Button onPress={() => mainRef.current?.focus()} className="sr-only">
        skip to content
      </Button>
      <div className="relative bg-[#f6f3e2]">
        <Header scrolled={scrolled} />
        {/* <ScrollToTop /> */}
        <div ref={mainRef} tabIndex={-1}>
          <Routes />
        </div>
        <Footer />
      </div>
    </RouterProvider>
  )
}
