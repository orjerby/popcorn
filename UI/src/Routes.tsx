import { Route, Routes as RoutesRouter } from 'react-router'
import './App.css'
import BundlePage from './pages/BundlePage'
import CheckoutPage from './pages/CheckoutPage'
import Filters from './pages/FiltersPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import SearchPage from './pages/SearchPage'

export default function Routes() {
  return (
    <RoutesRouter>
      <Route index element={<HomePage />} />
      <Route path="products">
        <Route path=":id" element={<ProductPage />} />
      </Route>
      <Route path="search" element={<SearchPage />} />
      <Route path="collections/all-products" element={<Filters />} />
      <Route path="pages/builder" element={<BundlePage />} />
      <Route path="checkouts" element={<CheckoutPage />} />
    </RoutesRouter>
  )
}
