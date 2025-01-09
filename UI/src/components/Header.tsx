import Button from '@mui/material/Button'
import { useState } from 'react'
import Cart from '../containers/Cart'

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div>
      <div>
        <Button onClick={() => setIsCartOpen(true)}>Open cart</Button>
        <Cart isOpen={isCartOpen} close={() => setIsCartOpen(false)} />
      </div>
      <div className="flex h-36 flex-col items-center justify-center bg-[#eb6600]">
        <p className="font-pluto-medium text-center text-sm font-medium text-white uppercase">
          Snag free shipping on orders over $30
        </p>
      </div>
      <div className="flex h-108 items-center justify-center bg-[#f6f3e2]">
        <div className="absolute mt-55 flex h-156 w-156 items-center justify-center rounded-full bg-[#f6f3e2]">
          <img
            className=""
            src="//www.pipsnacks.com/cdn/shop/files/pipsnack-logo.png?v=1707488945&width=140"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
export default Header
