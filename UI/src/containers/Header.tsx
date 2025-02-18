import { useState } from 'react'
import {
  Button,
  Disclosure,
  DisclosurePanel,
  Heading,
} from 'react-aria-components'
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
  const snackTypes = [
    'Popcorn',
    'Twists',
    'Cheese Balls',
    'Dippers',
    'Crunchies',
    'Fries',
  ]

  const imageSources = [
    'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-1.jpg?v=18025441256930656871722260791',
    'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-2.jpg?v=178033008074263268701722260792',
    'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-3.jpg?v=128671358667049938361722260792',
    'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-4.jpg?v=110319659324798520061722260792',
    'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-5.jpg?v=97072198646365212981722260793',
    'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-6.jpg?v=107906387397591227471722260793',
  ]
  // 'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-tag.svg?v=103215220483127730151722260795',  icon for fries image

  return (
    <>
      <div className="header sticky top-0 z-50 h-(--header-height) w-full">
        <Disclosure>
          <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <div className="flex h-36 flex-col items-center justify-center bg-[#eb6600]">
            <p className="font-pluto-medium text-center text-sm font-medium text-white uppercase">
              Snag free shipping on orders over $30
            </p>
          </div>
          <div className="w-full bg-[#f6f3e2]">
            <div
              className={`container mx-auto grid grid-cols-3 justify-between gap-8 bg-[#f6f3e2] px-4 transition-all duration-300 lg:gap-0 ${scrolled ? 'min-h-80' : 'min-h-80 lg:min-h-108'}`}
            >
              <div className="flex flex-col justify-center px-12 text-black lg:hidden">
                <span className="justify-start">
                  <svg
                    className="h-27 w-28 fill-current text-[#953300]"
                    viewBox="0 0 29 28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="origin-center transition-all group-[.active]:-translate-x-1.5 group-[.active]:translate-y-2 group-[.active]:rotate-45"
                      d="M24.9263 3.57379H4.07381C3.76657 3.57379 3.47191 3.69584 3.25465 3.9131C3.0374 4.13035 2.91534 4.42501 2.91534 4.73226C2.91534 5.0395 3.0374 5.33417 3.25465 5.55142C3.47191 5.76868 3.76657 5.89073 4.07381 5.89073H24.9263C25.2335 5.89073 25.5282 5.76868 25.7454 5.55142C25.9627 5.33417 26.0847 5.0395 26.0847 4.73226C26.0847 4.42501 25.9627 4.13035 25.7454 3.9131C25.5282 3.69584 25.2335 3.57379 24.9263 3.57379Z"
                    ></path>
                    <path
                      className="transition-all group-[.active]:-translate-x-1.5 group-[.active]:translate-y-4 group-[.active]:-rotate-45"
                      d="M26.0847 14C26.0847 13.6928 25.9627 13.3981 25.7454 13.1808C25.5282 12.9636 25.2335 12.8415 24.9263 12.8415H4.07381C3.76657 12.8415 3.47191 12.9636 3.25465 13.1808C3.0374 13.3981 2.91534 13.6928 2.91534 14C2.91534 14.3072 3.0374 14.6019 3.25465 14.8192C3.47191 15.0364 3.76657 15.1585 4.07381 15.1585H24.9263C25.2335 15.1585 25.5282 15.0364 25.7454 14.8192C25.9627 14.6019 26.0847 14.3072 26.0847 14Z"
                    ></path>
                    <path
                      className="transition-all group-[.active]:-translate-x-2 group-[.active]:opacity-0"
                      d="M14.5 22.1093H4.07381C3.76657 22.1093 3.47191 22.2313 3.25465 22.4486C3.0374 22.6658 2.91534 22.9605 2.91534 23.2678C2.91534 23.575 3.0374 23.8697 3.25465 24.0869C3.47191 24.3042 3.76657 24.4262 4.07381 24.4262H14.5C14.8073 24.4262 15.1019 24.3042 15.3192 24.0869C15.5364 23.8697 15.6585 23.575 15.6585 23.2678C15.6585 22.9605 15.5364 22.6658 15.3192 22.4486C15.1019 22.2313 14.8073 22.1093 14.5 22.1093Z"
                    ></path>
                  </svg>
                </span>
              </div>
              <div className="z-90 hidden items-center justify-start gap-1 bg-[#f6f3e2] text-center text-[26px] whitespace-nowrap text-black uppercase lg:visible lg:flex">
                {/* <Link to="/collections/all-products" className="px-16">
                  shop
                </Link> */}
                <Heading>
                  <Button className={'px-16 uppercase'} slot="trigger">
                    shop
                  </Button>
                </Heading>
                <Link to="/pages/builder">
                  <span className="px-16">build a bundle</span>
                </Link>
                <span className="px-16">about us</span>
              </div>
              <div className="flex items-center justify-center bg-[#f6f3e2]">
                <div
                  className={`absolute flex items-center justify-center rounded-full border-[#f6f3e2] bg-[#f6f3e2] ${scrolled ? 'mt-0' : 'mt-0 lg:mt-55 lg:max-h-156 lg:max-w-156 lg:border-8'}`}
                >
                  <Link to="/">
                    <img
                      className={` ${scrolled ? 'w-80' : 'w-80 lg:w-140'}`}
                      src="https://www.pipsnacks.com/cdn/shop/files/pipsnack-logo.png?v=1707488945"
                      alt=""
                      width={scrolled ? 80 : 140}
                    />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-end gap-23 bg-[#f6f3e2] px-16 text-black">
                <div className="rounded-8 relative flex min-h-44 w-full max-w-188 items-center whitespace-nowrap text-white uppercase lg:hidden"></div>

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
                    className={`font-bold ${scrolled ? 'max-h-24 w-full min-w-24' : 'max-h-24 w-full min-w-24 lg:max-h-29 lg:min-w-28'}`}
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
                      className={`font-bold ${scrolled ? 'max-h-23 w-full min-w-24' : 'max-h-23 w-full min-w-24 lg:max-h-27 lg:min-w-28'}`}
                      viewBox="0 0 35 34"
                      fill="none"
                      stroke="black"
                    >
                      <path
                        d="M13.7075 9.16067H9.09144C7.73619 9.16067 6.55337 10.0794 6.2181 11.3926L1.80139 28.6913C1.32261 30.5666 2.73933 32.3905 4.67472 32.3905H30.2321C32.1429 32.3905 33.555 30.6097 33.1195 28.7492L29.0709 11.4504C28.757 10.1092 27.5609 9.16067 26.1834 9.16067H22.604M13.7075 9.16067V5.20666C13.7075 3.56885 15.0352 2.24115 16.673 2.24115H19.6385C21.2763 2.24115 22.604 3.56885 22.604 5.20666V9.16067M13.7075 9.16067H22.604"
                        stroke-width="3"
                      />
                    </svg>
                    <span className="absolute -top-13 -right-13 flex h-28 w-24 items-center justify-center rounded-full bg-[#e5d1b3] text-sm text-white">
                      {cartTotalQuantity}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <DisclosurePanel>
            <div className="max-w-full bg-white text-black">
              <div className="container mx-auto flex flex-col px-16 pt-36 pb-24">
                <Link
                  to={'/collections/all-products'}
                  className="text-18 mb-12 text-[#BD8447] uppercase underline"
                >
                  shop all heirloom snacks
                </Link>
                {/* אופציה לרפקטור בהמשך להשתמש במסד נתונים ולתת לכל סוג תמונה */}

                <ul className="flex items-center gap-4 lg:max-h-72">
                  {imageSources.map((image, index) => (
                    <li className="mr-8 lg:max-w-135">
                      <Link
                        to={`collections/all-products?types=${snackTypes[index]}`}
                        className=""
                      >
                        <img
                          className="lg:h-full lg:max-h-72 lg:w-full lg:max-w-135"
                          src={image}
                          alt=""
                        />
                      </Link>
                    </li>
                  ))}

                  <li className="mr-8 lg:max-w-289">
                    <Link to={''}>
                      <img
                        className="lg:h-full lg:max-h-72 lg:w-full lg:max-w-289"
                        src="https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-7.jpg?v=112408079595935340441722260794"
                        alt=""
                      />
                    </Link>
                  </li>

                  <li className="mr-8 lg:max-w-289">
                    <Link to={'pages/builder'}>
                      <img
                        className="lg:h-full lg:max-h-72 lg:w-full lg:max-w-289"
                        src="https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-8.jpg?v=118325367229204719031722260794"
                        alt=""
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </>
  )
}
export default Header
