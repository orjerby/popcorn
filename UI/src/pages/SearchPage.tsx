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
    <div className="grid max-w-1090 gap-16 p-20 pt-100 md:items-center lg:grid-cols-4">
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
  )
}
