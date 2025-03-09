import { useEffect, useRef, useState } from 'react'
import {
  Button,
  DialogTrigger,
  Disclosure,
  DisclosurePanel,
  Form,
  Input,
  Link,
} from 'react-aria-components'
import { useLocation, useNavigate } from 'react-router'
import { Dialog } from '../components/Dialog/Dialog'
import { useAppContext } from '../context/AppContext'
import { selectCartTotalQuantity } from '../context/selectors'
import { cn } from '../tailwind/tailwindMerge'
import Cart from './Cart'

interface HeaderProps {
  scrolled: boolean
}

type FilterLink = {
  imgUrl: string
  url: string
  label: string
}

const filterLinks: FilterLink[] = [
  {
    imgUrl:
      'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-1.jpg?v=18025441256930656871722260791',
    url: `collections/all-products?types=Popcorn`,
    label: 'Popcorn',
  },
  {
    imgUrl:
      'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-2.jpg?v=178033008074263268701722260792',
    url: `collections/all-products?types=Twists`,
    label: 'Twists',
  },
  {
    imgUrl:
      'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-3.jpg?v=128671358667049938361722260792',
    url: `collections/all-products?types=Cheese Balls`,
    label: 'Cheese Balls',
  },
  {
    imgUrl:
      'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-4.jpg?v=110319659324798520061722260792',
    url: `collections/all-products?types=Dippers`,
    label: 'Dippers',
  },
  {
    imgUrl:
      'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-5.jpg?v=97072198646365212981722260793',
    url: `collections/all-products?types=Crunchies`,
    label: 'Crunchies',
  },
  {
    imgUrl:
      'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-6.jpg?v=107906387397591227471722260793',
    url: `collections/all-products?types=Fries`,
    label: 'Fries',
  },
  {
    imgUrl:
      'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-7.jpg?v=112408079595935340441722260794',
    url: `collections/snack-size`,
    label: 'snack-size',
  },
  {
    imgUrl:
      'https://www.pipsnacks.com/cdn/shop/t/205/assets/navigation-pic-item-8.jpg?v=118325367229204719031722260794',
    url: `pages/builder`,
    label: 'builder',
  },
]

function Header({ scrolled }: HeaderProps) {
  const { state } = useAppContext()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()
  const disclosureBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // disclosureBtnRef.current?.focus()
    setIsExpanded(false)

    setIsNavbarOpen(false)
  }, [location, disclosureBtnRef])

  const cartTotalQuantity = selectCartTotalQuantity(state)

  const search = (formData: FormData) => {
    const query = formData.get('search')
    setIsSearchOpen(false)
    navigate(`/search?q=${query}`)
  }

  return (
    <>
      <div className="header sticky top-0 z-50 h-(--header-height) w-full">
        {/* <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}
        <div className="flex h-36 flex-col items-center justify-center bg-[#eb6600]">
          <p className="font-pluto-medium text-center text-sm font-medium text-white uppercase">
            Snag free shipping on orders over $30
          </p>
        </div>
        <div className="relative w-full bg-[#f6f3e2]">
          <div
            className={`container mx-auto grid grid-cols-3 justify-between gap-8 bg-[#f6f3e2] px-4 transition-all duration-300 lg:gap-0 ${scrolled ? 'min-h-80' : 'min-h-80 lg:min-h-108'}`}
          >
            <div className="flex flex-col justify-center px-12 text-black lg:hidden">
              <span className="justify-start">
                <DialogTrigger
                  onOpenChange={setIsNavbarOpen}
                  isOpen={isNavbarOpen}
                >
                  <Button
                    aria-label="Open navigation"
                    className="cursor-pointer"
                  >
                    <svg
                      className="w-28 fill-current text-[#953300]"
                      viewBox="0 0 29 28"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="origin-center transition-all duration-500"
                        d="M24.9263 3.57379H4.07381C3.76657 3.57379 3.47191 3.69584 3.25465 3.9131C3.0374 4.13035 2.91534 4.42501 2.91534 4.73226C2.91534 5.0395 3.0374 5.33417 3.25465 5.55142C3.47191 5.76868 3.76657 5.89073 4.07381 5.89073H24.9263C25.2335 5.89073 25.5282 5.76868 25.7454 5.55142C25.9627 5.33417 26.0847 5.0395 26.0847 4.73226C26.0847 4.42501 25.9627 4.13035 25.7454 3.9131C25.5282 3.69584 25.2335 3.57379 24.9263 3.57379Z"
                      ></path>
                      <path
                        className="transition-all duration-500"
                        d="M26.0847 14C26.0847 13.6928 25.9627 13.3981 25.7454 13.1808C25.5282 12.9636 25.2335 12.8415 24.9263 12.8415H4.07381C3.76657 12.8415 3.47191 12.9636 3.25465 13.1808C3.0374 13.3981 2.91534 13.6928 2.91534 14C2.91534 14.3072 3.0374 14.6019 3.25465 14.8192C3.47191 15.0364 3.76657 15.1585 4.07381 15.1585H24.9263C25.2335 15.1585 25.5282 15.0364 25.7454 14.8192C25.9627 14.6019 26.0847 14.3072 26.0847 14Z"
                      ></path>
                      <path
                        className="transition-all duration-500"
                        d="M14.5 22.1093H4.07381C3.76657 22.1093 3.47191 22.2313 3.25465 22.4486C3.0374 22.6658 2.91534 22.9605 2.91534 23.2678C2.91534 23.575 3.0374 23.8697 3.25465 24.0869C3.47191 24.3042 3.76657 24.4262 4.07381 24.4262H14.5C14.8073 24.4262 15.1019 24.3042 15.3192 24.0869C15.5364 23.8697 15.6585 23.575 15.6585 23.2678C15.6585 22.9605 15.5364 22.6658 15.3192 22.4486C15.1019 22.2313 14.8073 22.1093 14.5 22.1093Z"
                      ></path>
                    </svg>
                  </Button>
                  <Dialog
                    type="leftToRight"
                    // modalProps={{
                    //   className: cn('top-116'),
                    // }}
                    // dialogProps={{ className: cn('bg-white px-16 py-24') }}
                    overlayProps={{
                      isDismissable: true,
                    }}
                    modalProps={{
                      className: cn('w-512'),
                    }}
                    dialogProps={{
                      className: cn('bg-white px-16 py-24'),
                    }}
                  >
                    <Button
                      slot="close"
                      aria-label="Close navigation"
                      className="cursor-pointer"
                    >
                      <svg
                        className="w-28 fill-current text-[#953300]"
                        viewBox="0 0 29 28"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="origin-center -translate-x-6 translate-y-8 rotate-45 transition-all duration-500"
                          d="M24.9263 3.57379H4.07381C3.76657 3.57379 3.47191 3.69584 3.25465 3.9131C3.0374 4.13035 2.91534 4.42501 2.91534 4.73226C2.91534 5.0395 3.0374 5.33417 3.25465 5.55142C3.47191 5.76868 3.76657 5.89073 4.07381 5.89073H24.9263C25.2335 5.89073 25.5282 5.76868 25.7454 5.55142C25.9627 5.33417 26.0847 5.0395 26.0847 4.73226C26.0847 4.42501 25.9627 4.13035 25.7454 3.9131C25.5282 3.69584 25.2335 3.57379 24.9263 3.57379Z"
                        ></path>
                        <path
                          className="-translate-x-6 translate-y-16 -rotate-45 transition-all duration-500"
                          d="M26.0847 14C26.0847 13.6928 25.9627 13.3981 25.7454 13.1808C25.5282 12.9636 25.2335 12.8415 24.9263 12.8415H4.07381C3.76657 12.8415 3.47191 12.9636 3.25465 13.1808C3.0374 13.3981 2.91534 13.6928 2.91534 14C2.91534 14.3072 3.0374 14.6019 3.25465 14.8192C3.47191 15.0364 3.76657 15.1585 4.07381 15.1585H24.9263C25.2335 15.1585 25.5282 15.0364 25.7454 14.8192C25.9627 14.6019 26.0847 14.3072 26.0847 14Z"
                        ></path>
                        <path
                          className="-translate-x-8 opacity-0 transition-all duration-500"
                          d="M14.5 22.1093H4.07381C3.76657 22.1093 3.47191 22.2313 3.25465 22.4486C3.0374 22.6658 2.91534 22.9605 2.91534 23.2678C2.91534 23.575 3.0374 23.8697 3.25465 24.0869C3.47191 24.3042 3.76657 24.4262 4.07381 24.4262H14.5C14.8073 24.4262 15.1019 24.3042 15.3192 24.0869C15.5364 23.8697 15.6585 23.575 15.6585 23.2678C15.6585 22.9605 15.5364 22.6658 15.3192 22.4486C15.1019 22.2313 14.8073 22.1093 14.5 22.1093Z"
                        ></path>
                      </svg>
                    </Button>

                    <Link
                      href={'/collections/all-products'}
                      className="text-18 mb-12 block self-start text-[#BD8447] uppercase underline"
                    >
                      shop all heirloom snacks
                    </Link>

                    <ul className="mt-12 grid grid-cols-3 gap-8">
                      {filterLinks.map((link, index) => (
                        <li
                          key={index}
                          className="flex last:col-span-3 nth-last-2:col-span-3"
                        >
                          <Link
                            aria-label={link.label}
                            href={link.url}
                            className="w-full"
                          >
                            <img
                              alt={link.label}
                              src={link.imgUrl}
                              className="w-full"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Dialog>
                </DialogTrigger>
              </span>
            </div>
            <div className="z-90 hidden items-center justify-start gap-1 bg-[#f6f3e2] text-center text-[26px] whitespace-nowrap text-black uppercase lg:visible lg:flex">
              {/* <Link to="/collections/all-products" className="px-16">
                  shop
                </Link> */}
              <Disclosure
                isExpanded={isExpanded}
                onExpandedChange={setIsExpanded}
              >
                <Button
                  ref={disclosureBtnRef}
                  slot="trigger"
                  className={'cursor-pointer px-16 uppercase'}
                >
                  shop
                </Button>
                <DisclosurePanel
                  className={`absolute right-0 left-0 transition-all duration-300 ${scrolled ? 'top-80' : 'top-108'}`}
                >
                  <div className="max-w-full bg-white text-black">
                    <div className="container mx-auto flex flex-col px-16 pt-36 pb-24">
                      <Link
                        href={'/collections/all-products'}
                        className="text-18 mb-12 self-start text-[#BD8447] uppercase underline"
                      >
                        shop all heirloom snacks
                      </Link>
                      {/* אופציה לרפקטור בהמשך להשתמש במסד נתונים ולתת לכל סוג תמונה */}

                      <ul className="flex items-center gap-16">
                        {filterLinks.map((link, index) => (
                          <li key={index}>
                            <Link aria-label={link.label} href={link.url}>
                              <img alt={link.label} src={link.imgUrl} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
              <Link href="/pages/builder">
                <span className="px-16">build a bundle</span>
              </Link>
            </div>
            <div className="z-90 flex items-center justify-center bg-[#f6f3e2]">
              <div
                className={`absolute flex items-center justify-center rounded-full border-[#f6f3e2] bg-[#f6f3e2] ${scrolled ? 'mt-0' : 'mt-0 lg:mt-55 lg:max-h-156 lg:max-w-156 lg:border-8'}`}
              >
                <h1 aria-label="Pipcorn">
                  <Link href="/">
                    <img
                      className={` ${scrolled ? 'w-80' : 'w-80 lg:w-140'}`}
                      src="https://www.pipsnacks.com/cdn/shop/files/pipsnack-logo.png?v=1707488945"
                      alt=""
                      width={scrolled ? 80 : 140}
                    />
                  </Link>
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-end gap-23 bg-[#f6f3e2] px-16 text-black">
              <DialogTrigger
                onOpenChange={setIsSearchOpen}
                isOpen={isSearchOpen}
              >
                <Button
                  aria-label="Search"
                  className="cursor-pointer text-[#141B34]"
                >
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
                      strokeWidth="2.96551"
                    ></circle>
                    <path
                      d="M17.3057 18.4939L26.2022 26.8962"
                      stroke="currentColor"
                      strokeWidth="2.96551"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </Button>

                <Dialog
                  type="topToBottom"
                  overlayProps={{ isDismissable: true }}
                  modalProps={{
                    className: cn('h-116', scrolled ? 'lg:h-116' : 'lg:h-144'),
                  }}
                  dialogProps={{
                    className: cn('bg-[#f6f3e2] px-16'),
                  }}
                >
                  <Form
                    action={search}
                    className="flex h-full items-center justify-center gap-16"
                  >
                    <Input
                      placeholder="Search"
                      name="search"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      type="text"
                      autoFocus
                      className="text-18 h-48 max-w-520 flex-1 border-2 border-black px-12 text-black placeholder:text-gray-500"
                    />

                    <Button
                      type="submit"
                      aria-label="Submit search"
                      className="w-24 cursor-pointer text-[#141B34] lg:w-28"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 28 29"
                        fill="none"
                      >
                        <circle
                          cx="10.88"
                          cy="11.5744"
                          r="9.39077"
                          stroke="currentColor"
                          strokeWidth="2.96551"
                        ></circle>
                        <path
                          d="M17.3057 18.4939L26.2022 26.8962"
                          stroke="currentColor"
                          strokeWidth="2.96551"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </Button>

                    <Button
                      slot="close"
                      aria-label="Clear search term"
                      className="w-24 cursor-pointer text-[#141B34] lg:w-28"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.8841 4.11599C20.3722 4.60415 20.3722 5.39561 19.8841 5.88376L5.88407 19.8838C5.39591 20.3719 4.60445 20.3719 4.1163 19.8838C3.62814 19.3956 3.62814 18.6041 4.1163 18.116L18.1163 4.11599C18.6045 3.62784 19.3959 3.62784 19.8841 4.11599Z"
                          fill="currentColor"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.1163 4.11599C4.60445 3.62784 5.39591 3.62784 5.88407 4.11599L19.8841 18.116C20.3722 18.6041 20.3722 19.3956 19.8841 19.8838C19.3959 20.3719 18.6045 20.3719 18.1163 19.8838L4.1163 5.88376C3.62814 5.39561 3.62814 4.60415 4.1163 4.11599Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Button>
                  </Form>
                </Dialog>
              </DialogTrigger>

              <DialogTrigger onOpenChange={setIsCartOpen} isOpen={isCartOpen}>
                <Button aria-label="Cart" className="cursor-pointer">
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
                        strokeWidth="3"
                      />
                    </svg>
                    <span className="absolute -top-13 -right-13 flex h-28 w-24 items-center justify-center rounded-full bg-[#e5d1b3] text-sm text-white">
                      {cartTotalQuantity}
                    </span>
                  </span>
                </Button>

                <Dialog
                  type="rightToLeft"
                  overlayProps={{
                    isDismissable: true,
                  }}
                  modalProps={{
                    className: cn('w-512'),
                  }}
                >
                  <Cart
                    open={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                  />
                </Dialog>
              </DialogTrigger>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Header
