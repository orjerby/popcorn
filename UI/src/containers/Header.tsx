import { useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router'
import { useAppContext } from '../context/AppContext'
import { selectCartTotalQuantity } from '../context/selectors'
import Cart from './Cart'

interface HeaderProps {
  scrolled: boolean
}

function Header({ scrolled }: HeaderProps) {
  const { state } = useAppContext()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  const cartTotalQuantity = selectCartTotalQuantity(state)

  const search = (formData: FormData) => {
    const query = formData.get('search')
    navigate(`/search?q=${query}`)
  }

  return (
    <>
      <div className="header sticky top-0 z-50 h-(--header-height) w-full">
        <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <div className="flex h-36 flex-col items-center justify-center bg-[#eb6600]">
          <p className="font-pluto-medium text-center text-sm font-medium text-white uppercase">
            Snag free shipping on orders over $30
          </p>
        </div>
        <div className="w-full bg-[#f6f3e2]">
          <div
            className={`mx-96 grid grid-cols-3 items-center justify-between bg-[#f6f3e2] px-16 transition-all duration-300 ${scrolled ? 'min-h-80' : 'min-h-108'}`}
          >
            <div className="flex items-center justify-center gap-1 bg-[#f6f3e2] text-center text-[26px] whitespace-nowrap text-black uppercase">
              <Link to="/collections/all-products" className="px-16">
                shop
              </Link>
              <Link to="/pages/builder">
                <span className="px-16">build a bundle</span>
              </Link>
              <span className="px-16">about us</span>
            </div>
            <div className="flex items-center justify-center bg-[#f6f3e2]">
              <div
                className={`absolute flex items-center justify-center rounded-full border-[#f6f3e2] bg-[#f6f3e2] ${scrolled ? 'mt-0' : 'mt-55 max-h-156 max-w-156 border-8'}`}
              >
                <Link to="/">
                  <img
                    className=""
                    src="https://www.pipsnacks.com/cdn/shop/files/pipsnack-logo.png?v=1707488945"
                    alt=""
                    width={scrolled ? 80 : 140}
                  />
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center gap-23 bg-[#f6f3e2] px-16 text-black">
              <a
                className="rounded-8 relative flex min-h-44 w-full max-w-188 min-w-188 items-center bg-[#3eadb8] whitespace-nowrap text-white uppercase"
                href=""
              >
                <span className="ml-24 text-[26px]">find a store</span>
                <span className="absolute -top-5 right-1">
                  <FaLocationDot
                    size={35}
                    strokeWidth={12}
                    stroke="white"
                    fill="rgb(205, 89, 52)"
                  />
                </span>
              </a>
              {/* <form action={search}>
                <input
                  aria-label="search"
                  name="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                />
                <button aria-label="serach">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full max-w-28"
                    viewBox="0 0 28 29"
                    fill="none"
                  >
                    <circle
                      cx="10.88"
                      cy="11.5744"
                      r="9.39077"
                      stroke="currentColor"
                      stroke-width="2.96551"
                    ></circle>
                    <path
                      d="M17.3057 18.4939L26.2022 26.8962"
                      stroke="currentColor"
                      stroke-width="2.96551"
                      stroke-linecap="round"
                    ></path>
                  </svg>{' '}
                </button>
              </form> */}
              <button aria-label="serach">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-h-29 w-full min-w-28"
                  viewBox="0 0 28 29"
                  fill="none"
                >
                  <circle
                    cx="10.88"
                    cy="11.5744"
                    r="9.39077"
                    stroke="currentColor"
                    stroke-width="2.96551"
                  ></circle>
                  <path
                    d="M17.3057 18.4939L26.2022 26.8962"
                    stroke="currentColor"
                    stroke-width="2.96551"
                    stroke-linecap="round"
                  ></path>
                </svg>{' '}
              </button>
              <button
                title="Cart"
                onClick={() => setIsCartOpen(true)}
                className="arial-label='cart' cursor-pointer"
              >
                <span className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="max-h-29 w-full min-w-28 font-bold"
                    viewBox="0 0 35 34"
                    fill="none"
                    stroke="black"
                  >
                    <path
                      d="M13.7075 9.16067H9.09144C7.73619 9.16067 6.55337 10.0794 6.2181 11.3926L1.80139 28.6913C1.32261 30.5666 2.73933 32.3905 4.67472 32.3905H30.2321C32.1429 32.3905 33.555 30.6097 33.1195 28.7492L29.0709 11.4504C28.757 10.1092 27.5609 9.16067 26.1834 9.16067H22.604M13.7075 9.16067V5.20666C13.7075 3.56885 15.0352 2.24115 16.673 2.24115H19.6385C21.2763 2.24115 22.604 3.56885 22.604 5.20666V9.16067M13.7075 9.16067H22.604"
                      stroke-width="3"
                    />
                  </svg>{' '}
                  <span className="absolute -top-10 -right-10 flex h-28 w-24 items-center justify-center rounded-full bg-[#e5d1b3] text-sm text-white">
                    {cartTotalQuantity}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Header
