import { useState } from 'react'
import { useParams } from 'react-router'
import { useAppContext } from '../context/AppContext'
import { selectProduct } from '../context/selectors'

export default function Product() {
  let { id } = useParams()
  const { state } = useAppContext()
  const product = selectProduct(state, id ?? '')
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="mx-auto mt-80 box-content flex max-w-1120 flex-col gap-32 px-16 lg:flex-row">
      <div className="flex-[0.55]">
        <div className="bg-[#faf8ee]">
          <img src={product?.images[selectedImage]} alt="" />
        </div>

        <div className="mt-32 flex h-71 gap-12">
          {product?.images.map((image, index) => (
            <button
              onClick={() => setSelectedImage(index)}
              aria-label="image"
              key={index}
              className="flex-0-0-71 bg-[#faf8ee] p-[8px]"
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-[0.45]">
        <p className="text-14 font-normal text-[#c59259]">{product?.type}</p>

        <h1 className="text-48 font-normal text-black">{product?.title}</h1>

        <div>
          <p className="text-18 font-normal text-black">
            {product?.reviews.length} Reviews
          </p>
        </div>

        <p className="text-14 font-normal text-black">Select a size</p>

        <div className="mt-4"></div>

        <div className="rounded-4 mt-16 bg-white p-[8px]"></div>

        <div className="mt-16 flex">
          <div className="rounded-6 bg-white"></div>
          <button className="rounded-6 bg-[#3EADB8] p-[12px]">
            <span className="text-18 font-normal text-white">
              add to cart | 40$
            </span>
          </button>
        </div>

        <p className="text-18 mt-64 font-normal text-black">
          {product?.description}
        </p>
      </div>
    </div>
  )
}
