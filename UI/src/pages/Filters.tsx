import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router'
import { SnackFlavor, SnackType } from '../../../API/models/product'
import { useAppContext } from '../context/AppContext'
import {
  selectFilteredProducts,
  selectProductFlavors,
  selectProducts,
  selectProductTypes,
} from '../context/selectors'

export default function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { state } = useAppContext()

  // Extract initial parameters from URL
  const typesParam = searchParams.get('types')?.split(',') ?? []
  const flavorsParam = searchParams.get('flavors')?.split(',') ?? []

  // Selectors
  const allProducts = selectProducts(state)
  const filterdProducts = selectFilteredProducts(state, {
    types: typesParam,
    flavors: flavorsParam,
  })
  const productTypes = selectProductTypes(state)
  const productFlavors = selectProductFlavors(state)

  // States for disabled indexes
  const [disabledTypesByIndex, setDisabledTypesByIndex] = useState<boolean[]>(
    Array(productTypes.length).fill(false),
  )
  const [disabledFlavorsByIndex, setDisabledFlavorsByIndex] = useState<
    boolean[]
  >(Array(productFlavors.length).fill(false))

  // Utility: Update search params
  const updateSearchParams = (key: string, values: string[]) => {
    setSearchParams((prev) => {
      if (values.length) {
        prev.set(key, values.join(','))
      } else {
        prev.delete(key)
      }
      return prev
    })
  }

  // Utility: Compute disabled indexes
  const updateDisabledIndexes = (
    selectedValues: string[],
    allItems: string[],
    matchCallback: (item: string) => boolean,
  ) => {
    const disabledIndexes = allItems.map((item) =>
      selectedValues.length ? !matchCallback(item) : false,
    )

    // Remove unchecked items from query string if they become disabled
    const enabledItems = allItems.filter((_, index) => !disabledIndexes[index])
    return { disabledIndexes, enabledItems }
  }

  // Handlers
  const onTypeChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: SnackType,
  ) => {
    const newSelectedTypes = event.target.checked
      ? [...typesParam, type]
      : typesParam.filter((t) => t !== type)

    updateSearchParams('types', newSelectedTypes)

    const { disabledIndexes, enabledItems } = updateDisabledIndexes(
      newSelectedTypes,
      productFlavors,
      (flavor) =>
        allProducts.some(
          (product) =>
            newSelectedTypes.includes(product.type) &&
            product.flavor === flavor,
        ),
    )

    setDisabledFlavorsByIndex(disabledIndexes)
    updateSearchParams(
      'flavors',
      flavorsParam.filter((flavor) => enabledItems.includes(flavor)),
    )
  }

  const onFlavorChange = (
    event: ChangeEvent<HTMLInputElement>,
    flavor: SnackFlavor,
  ) => {
    const newSelectedFlavors = event.target.checked
      ? [...flavorsParam, flavor]
      : flavorsParam.filter((f) => f !== flavor)

    updateSearchParams('flavors', newSelectedFlavors)

    const { disabledIndexes, enabledItems } = updateDisabledIndexes(
      newSelectedFlavors,
      productTypes,
      (type) =>
        allProducts.some(
          (product) =>
            newSelectedFlavors.includes(product.flavor) &&
            product.type === type,
        ),
    )

    setDisabledTypesByIndex(disabledIndexes)
    updateSearchParams(
      'types',
      typesParam.filter((type) => enabledItems.includes(type)),
    )
  }

  return (
    <>
      <div className="flex text-black">
        <div className="flex flex-col">
          <h2 className="text-red-500">Filter by snack type</h2>
          {productTypes.map((type, index) => (
            <div
              key={type}
              className={disabledTypesByIndex?.[index] ? 'opacity-50' : ''}
            >
              <label htmlFor={`filter-type-${type}`}>{type}</label>
              <input
                aria-label={type}
                type="checkbox"
                name={type}
                id={`filter-type-${type}`}
                onChange={(event) => onTypeChange(event, type)}
                checked={typesParam.includes(type)}
                disabled={disabledTypesByIndex[index]}
              />
            </div>
          ))}

          <h2 className="text-red-500">Filter by flavors</h2>
          {productFlavors.map((flavor, index) => (
            <div
              key={flavor}
              className={disabledFlavorsByIndex?.[index] ? 'opacity-50' : ''}
            >
              <label htmlFor={`filter-flavor-${flavor}`}>{flavor}</label>
              <input
                aria-label={flavor}
                type="checkbox"
                name={flavor}
                id={`filter-flavor-${flavor}`}
                onChange={(event) => onFlavorChange(event, flavor)}
                checked={flavorsParam.includes(flavor)}
                disabled={disabledFlavorsByIndex[index]}
              />
            </div>
          ))}
        </div>

        {filterdProducts.length > 0 ? (
          <ul className="text-blue-500">
            {filterdProducts.map((item) => (
              <li key={item.id}>
                <p className="">{item.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="">no items!</div>
        )}
      </div>
    </>
  )
}
