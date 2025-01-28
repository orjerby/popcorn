import { useState } from 'react'
import { Checkbox, CheckboxGroup, Label } from 'react-aria-components'
import { useSearchParams } from 'react-router'
import { SnackFlavor, SnackType } from '../../../API/models/product'
import Product from '../containers/Product'
import { useAppContext } from '../context/AppContext'
import {
  selectBundledProducts,
  selectFilteredBundledProducts,
  selectProductFlavors,
  selectProductTypes,
} from '../context/selectors'

export default function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { state } = useAppContext()

  // Extract initial parameters from URL
  const typesParam = searchParams.get('types')?.split(',') ?? []
  const flavorsParam = searchParams.get('flavors')?.split(',') ?? []

  // Selectors
  const allProducts = selectBundledProducts(state)
  const filterdProducts = selectFilteredBundledProducts(state, {
    types: typesParam,
    flavors: flavorsParam,
  })
  const productTypes = selectProductTypes(state)
  const productFlavors = selectProductFlavors(state)

  // States for disabled indexes
  const [disabledTypesByIndex, setDisabledTypesByIndex] = useState<boolean[]>(
    getDisabledIndexes(flavorsParam, productTypes, (type) =>
      allProducts.some(
        (product) =>
          flavorsParam.includes(product.flavor) && product.type === type,
      ),
    ),
  )
  const [disabledFlavorsByIndex, setDisabledFlavorsByIndex] = useState<
    boolean[]
  >(
    getDisabledIndexes(typesParam, productFlavors, (flavor) =>
      allProducts.some(
        (product) =>
          typesParam.includes(product.type) && product.flavor === flavor,
      ),
    ),
  )

  function getDisabledIndexes(
    selectedValues: string[],
    allItems: string[],
    matchCallback: (item: string) => boolean,
  ) {
    return allItems.map((item) =>
      selectedValues.length ? !matchCallback(item) : false,
    )
  }

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
  const onTypeChange = (isChecked: boolean, type: SnackType) => {
    const newSelectedTypes = isChecked
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

  const onFlavorChange = (isChecked: boolean, flavor: SnackFlavor) => {
    const newSelectedFlavors = isChecked
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
      <div className="flex items-center justify-center bg-[#24dee4] bg-[url(https://www.pipsnacks.com/cdn/shop/files/plp-chips.webp?v=1727948416)] bg-cover bg-right">
        <h1 className="text-96 px-[48px] py-[80px] font-normal text-white [-webkit-text-stroke-color:#303132] [-webkit-text-stroke-width:thin] [text-shadow:5px_5px_#303132]">
          SHOP ALL
        </h1>
      </div>

      <div className="flex justify-center gap-16 px-[16px] py-[24px]">
        <div className="rounded-6 sticky top-144 hidden h-full w-full max-w-250 border border-[#CBC1B7] bg-white p-[16px] lg:block">
          <CheckboxGroup value={typesParam}>
            <Label className="text-24 mb-16 block font-normal text-[#C1803E] uppercase">
              Filter by snack type
            </Label>

            {productTypes.map((type, index) => (
              <Checkbox
                value={type}
                key={type}
                isDisabled={disabledTypesByIndex[index]}
                onChange={(event) => onTypeChange(event, type)}
                className="group flex items-center gap-8 text-black data-disabled:opacity-60"
              >
                <div aria-hidden="true">
                  <div
                    className={
                      'rounded-4 size-16 border-2 border-[#C1803E] group-data-hovered:cursor-pointer group-data-selected:bg-[#C1803E]'
                    }
                  ></div>
                </div>
                {type}
              </Checkbox>
            ))}
          </CheckboxGroup>

          <CheckboxGroup value={flavorsParam} className="mt-16">
            <Label className="text-24 mb-16 block font-normal text-[#C1803E] uppercase">
              Filter by flavors
            </Label>

            {productFlavors.map((flavor, index) => (
              <Checkbox
                value={flavor}
                key={flavor}
                isDisabled={disabledFlavorsByIndex[index]}
                onChange={(event) => onFlavorChange(event, flavor)}
                className="group flex items-center gap-8 text-black data-disabled:opacity-60"
              >
                <div aria-hidden="true">
                  <div
                    className={
                      'rounded-4 size-16 border-2 border-[#C1803E] group-data-hovered:cursor-pointer group-data-selected:bg-[#C1803E]'
                    }
                  ></div>
                </div>
                {flavor}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>

        {filterdProducts.length > 0 ? (
          <div className="grid w-full gap-y-80 border-t border-t-[#CBC1B7] pt-72 lg:w-auto lg:grid-cols-[repeat(3,minmax(0,274px))] lg:gap-x-16">
            {filterdProducts.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                image={item.images[0]}
                title={item.title}
                count={item.count}
                size={item.size}
                price={item.price}
                reviewsCount={item.reviews.length}
              />
            ))}
          </div>
        ) : (
          <div>no items!</div>
        )}
      </div>
    </>
  )
}
