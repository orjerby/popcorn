import { useState } from 'react'

export default function Bundle() {
  const [bundle, setBundle] = useState<string[]>([])
  return (
    <div className="h-1300">
      <h1 className="text-9xl text-black">Bundle</h1>
      <div className="flex w-fit cursor-pointer flex-wrap gap-3 border text-black uppercase hover:scale-105">
        <div className="ml-20 p-3 text-blue-600">
          CBC45C12 -- Cheddar Cheese Balls
        </div>
        <div
          className="ml-4 bg-amber-300 p-3"
          onClick={() => {
            setBundle([...bundle, 'CBC45C12'])
            console.log(bundle)
          }}
        >
          ADD TO BUNDLE
        </div>
      </div>

      <div className="relative bottom-40 left-700 text-black">
        {bundle.map((item) => {
          return <div className="text-blue-600">{item}</div>
        })}
      </div>
    </div>
  )
}
