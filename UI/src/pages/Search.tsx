import { useSearchParams } from 'react-router'
import Product from '../containers/Product'
import { useAppContext } from '../context/AppContext'
import { selectSearchedBundledProducts } from '../context/selectors'

export default function Search() {
  const [searchParams] = useSearchParams()
  const { state } = useAppContext()

  const typesParam = searchParams.get('q')

  const searchedProducts = selectSearchedBundledProducts(
    state,
    typesParam ?? '',
  )

  return (
    <div className="flex flex-wrap gap-10">
      {searchedProducts.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          image={product.images[0]}
          title={product.title}
          count={product.count}
          size={product.size}
          price={product.price}
          reviewsCount={product.reviews.length}
        />
      ))}
    </div>
  )
}
