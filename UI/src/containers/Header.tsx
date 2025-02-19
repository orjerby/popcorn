import { useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { IoSearchSharp } from 'react-icons/io5'
import { PiHandbagSimple } from 'react-icons/pi'
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
        <div
          className={`grid grid-cols-3 transition-all ${scrolled ? 'min-h-80' : 'min-h-108'}`}
        >
          <div className="flex items-center justify-center bg-[#f6f3e2] text-center text-[26px] text-black uppercase">
            <Link to="/collections/all-products" className="pl-16">
              shop
            </Link>
            <Link to="/pages/builder">
              <span className="pl-16">build a bundle</span>
            </Link>
            <span className="pl-16">about us</span>
          </div>
          <div className="flex items-center justify-center bg-[#f6f3e2]">
            <div
              className={`absolute flex items-center justify-center rounded-full border-[#f6f3e2] bg-[#f6f3e2] transition-all ${scrolled ? 'mt-0' : 'mt-50 max-h-156 max-w-156 border-8'}`}
            >
              <Link to="/">
                <img
                  className={`${scrolled ? 'w-80' : 'w-140'} transition-all`}
                  src="https://www.pipsnacks.com/cdn/shop/files/pipsnack-logo.png?v=1707488945"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center gap-23 bg-[#f6f3e2] text-black">
            <a
              className="relative flex h-44 w-full max-w-188 rounded bg-[#3eadb8] text-white uppercase"
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
            <form action={search}>
              <input
                aria-label="search"
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
              />
              <button aria-label="serach">
                <IoSearchSharp size={34} />
              </button>
            </form>
            <button
              title="Cart"
              onClick={() => setIsCartOpen(true)}
              className="arial-label='cart' cursor-pointer"
            >
              <span className="relative">
                <PiHandbagSimple size={34} />
                <span className="absolute -top-10 -right-10 flex h-28 w-24 items-center justify-center rounded-full bg-[#e5d1b3] text-sm text-white">
                  {cartTotalQuantity}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Header
