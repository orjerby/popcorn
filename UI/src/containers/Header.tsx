import { useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { IoSearchSharp } from 'react-icons/io5'
import { PiHandbagSimple } from 'react-icons/pi'
import { NavLink } from 'react-router'
import { useAppContext } from '../context/AppContext'
import { selectCartTotalQuantity } from '../context/selectors'
import Cart from './Cart'

interface HeaderProps {
  scrolled: boolean
}

function Header({ scrolled }: HeaderProps) {
  const { state } = useAppContext()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartTotalQuantity = selectCartTotalQuantity(state)
  return (
    <>
      {scrolled ? (
        <div className="header fixed top-0 z-50 w-full">
          <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <div className="flex h-36 flex-col items-center justify-center bg-[#eb6600]">
            <p className="font-pluto-medium text-center text-sm font-medium text-white uppercase">
              Snag free shipping on orders over $30
            </p>
          </div>
          <div className="grid h-80 grid-cols-3">
            <div className="flex items-center justify-center bg-[#f6f3e2] text-center text-[26px] text-black uppercase">
              <NavLink to="/collections/all-products" className="pl-16">
                shop
              </NavLink>
              <NavLink to="/pages/builder">
                <span className="pl-16">build a bundle</span>
              </NavLink>
              <span className="pl-16">about us</span>
            </div>
            <div className="flex items-center justify-center bg-[#f6f3e2]">
              <div className="absolute flex items-center justify-center rounded-full bg-[#f6f3e2]">
                <NavLink to="/">
                  <img
                    className=""
                    src="https://www.pipsnacks.com/cdn/shop/files/pipsnack-logo.png?v=1707488945&width=80"
                    alt=""
                  />
                </NavLink>
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
              <button aria-label="serach">
                <IoSearchSharp size={34} />
              </button>
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
      ) : (
        <div className="header fixed top-0 z-50 w-full">
          <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <div className="flex h-36 flex-col items-center justify-center bg-[#eb6600]">
            <p className="font-pluto-medium text-center text-sm font-medium text-white uppercase">
              Snag free shipping on orders over $30
            </p>
          </div>
          <div className="grid h-108 grid-cols-3">
            <div className="flex items-center justify-center bg-[#f6f3e2] text-center text-[26px] text-black uppercase">
              <NavLink to="/collections/all-products" className="pl-16">
                shop
              </NavLink>
              <NavLink to="/pages/builder">
                <span className="pl-16">build a bundle</span>
              </NavLink>
              <span className="pl-16">about us</span>
            </div>
            <div className="flex items-center justify-center bg-[#f6f3e2]">
              <div className="absolute mt-55 flex h-156 w-156 items-center justify-center rounded-full bg-[#f6f3e2]">
                <NavLink to="/">
                  <img
                    className=""
                    src="https://www.pipsnacks.com/cdn/shop/files/pipsnack-logo.png?v=1707488945&width=140"
                    alt=""
                  />
                </NavLink>
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
              <button aria-label="serach">
                <IoSearchSharp size={34} />
              </button>
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
      )}
    </>
  )
}
export default Header
