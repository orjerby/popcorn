import { useState } from 'react'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  DialogTrigger,
  Label,
} from 'react-aria-components'
import { useSearchParams } from 'react-router'
import { SnackFlavor, SnackType } from '../../../API/models/product'
import { Dialog } from '../components/Dialog/Dialog'
import { StandardSelect } from '../components/Select'
import { StandardSelectItem } from '../components/Select/Bases/StandardSelectBase'
import Product from '../containers/Product'
import { useAppContext } from '../context/AppContext'
import {
  selectBundledProducts,
  selectFilteredBundledProducts,
  selectProductFlavors,
  selectProductTypes,
} from '../context/selectors'

const sortByOptions = [
  { id: 1, value: 'FEATURED' },
  { id: 2, value: 'MOST REVIEWS' },
  { id: 3, value: 'ALPHABETICALLY, A-Z' },
  { id: 4, value: 'ALPHABETICALLY, Z-A' },
  { id: 5, value: 'PRICE, LOW TO HIGH' },
  { id: 6, value: 'PRICE, HIGH TO LOW' },
]

export default function FiltersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { state } = useAppContext()

  // Extract initial parameters from URL
  const typesParam = searchParams.get('types')?.split(',') ?? []
  const flavorsParam = searchParams.get('flavors')?.split(',') ?? []

  // Selectors
  const allProducts = selectBundledProducts(state)
  const filterdProducts = selectFilteredBundledProducts(state, {
    filterBy: {
      types: typesParam,
      flavors: flavorsParam,
    },
    sortBy: 'FEATURED',
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

  const filterCheckboxes = (
    <>
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
    </>
  )

  return (
    <>
      <div className="flex items-center justify-center bg-[#24dee4] bg-[url(https://www.pipsnacks.com/cdn/shop/files/plp-chips.webp?v=1727948416)] bg-cover bg-right">
        <h1 className="text-96 px-[48px] py-[80px] font-normal text-white [-webkit-text-stroke-color:#303132] [-webkit-text-stroke-width:thin] [text-shadow:5px_5px_#303132]">
          SHOP ALL
        </h1>
      </div>

      <div className="px-[16px] py-[24px]">
        <div className="mb-16 lg:hidden">
          <DialogTrigger>
            <Button
              aria-label="Open filter"
              className="text-16 cursor-pointer font-normal text-black"
            >
              FILTER
            </Button>

            <Dialog aboveHeader>
              <Button
                slot="close"
                className="text-20 w-full cursor-pointer border-b border-zinc-400 py-16 text-left font-normal text-black"
              >
                FILTER
              </Button>

              <div className="mt-24">{filterCheckboxes}</div>
            </Dialog>
          </DialogTrigger>
        </div>

        <div className="flex justify-center gap-16">
          <div className="rounded-6 sticky top-144 hidden h-full w-full max-w-250 border border-[#CBC1B7] bg-white p-[16px] lg:block">
            {filterCheckboxes}
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex items-center gap-12">
                <span className="text-[#414141]">
                  {filterdProducts.length} PRODUCTS
                </span>
                <Button
                  aria-label="clear filters"
                  onPress={() => setSearchParams()}
                  className={`${!typesParam.length && !flavorsParam.length ? 'hidden' : 'visible'} rounded-6 flex items-center gap-4 border bg-white p-10 px-16 py-6 text-[#C1803E]`}
                >
                  <span>CLEAR FILTERS</span>
                  <span>
                    <svg
                      className="w-16"
                      data-slot="icon"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </span>
                </Button>
              </div>
              <form className="flex items-center" action="">
                <span id="sort-by" className="text-[#414141]">
                  SORT BY:
                </span>

                <StandardSelect
                  aria-labelledby="sort-by"
                  items={sortByOptions}
                  defaultSelectedKey={1}
                  className="w-175"
                >
                  {({ value }) => (
                    <StandardSelectItem>{value}</StandardSelectItem>
                  )}
                </StandardSelect>
              </form>
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
                    price={item.price}
                    reviewsCount={item.reviews.length}
                  />
                ))}
              </div>
            ) : (
              <div>no items!</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
