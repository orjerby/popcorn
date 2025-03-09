import { useSearchParams } from 'react-router'
import Product from '../containers/Product'
import { useAppContext } from '../context/AppContext'
import { selectSearchedBundledProducts } from '../context/selectors'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const { state } = useAppContext()

  const typesParam = searchParams.get('q')

  const searchedProducts = selectSearchedBundledProducts(
    state,
    typesParam ?? '',
  )

  return (
    <div className="mx-auto max-w-1090 p-20 pt-160">
      <p className="text-18 font-normal text-black">
        {searchedProducts.length} PRODUCTS
      </p>

      <hr className="mt-16 border-[#953300]" />

      <div className="grid w-full gap-y-80 pt-72 lg:w-auto lg:grid-cols-[repeat(3,minmax(0,274px))] lg:gap-x-16">
        {searchedProducts.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            image={product.images[0]}
            title={product.title}
            count={product.count}
            price={product.price}
            reviewsCount={product.reviews.length}
          />
        ))}
      </div>
    </div>
  )
}
