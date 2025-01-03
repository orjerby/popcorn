function Header() {
  return (
    <div>
      <div className="bg-[#eb6600] h-36 flex flex-col items-center justify-center">
        <p className="font-medium text-sm text-center text-white uppercase ">
          Snag free shipping on orders over $30
        </p>
      </div>
      <div className="h-108 bg-[#f6f3e2] flex items-center justify-center">
        <div className="h-156 w-156 mt-55 bg-[#f6f3e2] flex rounded-full justify-center items-center absolute">
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
