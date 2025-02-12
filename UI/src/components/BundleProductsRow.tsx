import { MdOutlineCancel } from 'react-icons/md'
import { Product } from '../../../API/models/product'

const hexToRgba = (hex: string, alpha = 0.3) => {
  hex = hex.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

interface BundleProductsRowProps {
  rowTitle: string
  products: Product[]
  rowStartLocation: number
  deleteFromBundle: (index: number) => void
}

export default function BundleProductsRow({
  rowTitle,
  rowStartLocation,
  products,
  deleteFromBundle,
}: BundleProductsRowProps) {
  return (
    <div className="flex flex-col justify-center">
      <div className="mt-10 flex flex-col bg-[#F5F5F3] p-5">
        <span className="mb-8 p-3 pl-10 text-black">{rowTitle}</span>
        <div className="flex justify-center gap-10 bg-[#F5F5F3] p-10">
          {products.map((product, index) => {
            if (index === 3 && product.id === '') {
              return (
                <div className="min-h-68 w-full max-w-68">
                  <div
                    className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-dashed border-[#C1803E]"
                    key={index}
                  >
                    <img src={product.images[0]} alt="" />
                    <span className="absolute right-0 bottom-0 text-black">
                      {index + 1 + rowStartLocation}
                    </span>
                  </div>
                </div>
              )
            } else if (product.id === '') {
              return (
                <div className="min-h-68 w-full max-w-68">
                  <div
                    className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-dashed border-[#CBC1B7]"
                    key={index}
                  >
                    <img src={product.images[0]} alt="" />
                    <span className="absolute right-0 bottom-0 text-black">
                      {index + 1 + rowStartLocation}
                    </span>
                  </div>
                </div>
              )
            } else {
              return (
                <div className="min-h-68 w-full max-w-68">
                  <div
                    key={index}
                    style={{
                      backgroundColor: hexToRgba(
                        product.color ? product.color : '',
                        0.3,
                      ),
                      borderColor: product.color,
                    }}
                    className="rounded-8 relative min-h-68 w-full max-w-68 border-2 border-[#de7846]"
                  >
                    <button
                      onClick={() => deleteFromBundle(index + rowStartLocation)}
                      aria-label="delete"
                      className="absolute -top-10 -right-8 cursor-pointer text-black"
                    >
                      <MdOutlineCancel className="z-20 m-0 h-auto w-auto rounded-full bg-white p-0 drop-shadow-none" />
                    </button>
                    <img
                      className="rounded-8 h-full w-full"
                      src={product.images[0]}
                      alt="1"
                    />
                  </div>
                  <p className="text-center text-xs text-black">
                    {product.title}
                  </p>
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}
