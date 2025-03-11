export type SortBy =
  | ''
  | 'MOST REVIEWS'
  | 'ALPHABETICALLY, A-Z'
  | 'ALPHABETICALLY, Z-A'
  | 'PRICE, LOW TO HIGH'
  | 'PRICE, HIGH TO LOW'

const sortByOptions: { id: SortBy; value: string }[] = [
  { id: '', value: 'FEATURED' },
  { id: 'MOST REVIEWS', value: 'MOST REVIEWS' },
  { id: 'ALPHABETICALLY, A-Z', value: 'ALPHABETICALLY, A-Z' },
  { id: 'ALPHABETICALLY, Z-A', value: 'ALPHABETICALLY, Z-A' },
  { id: 'PRICE, LOW TO HIGH', value: 'PRICE, LOW TO HIGH' },
  { id: 'PRICE, HIGH TO LOW', value: 'PRICE, HIGH TO LOW' },
]

export default function FiltersPage() {
  return (
    <>
      <div className="flex items-center justify-center bg-[#24dee4] bg-[url(https://www.pipsnacks.com/cdn/shop/files/plp-chips.webp?v=1727948416)] bg-cover bg-right">
        <h1 className="text-96 px-[48px] py-[80px] font-normal text-white [-webkit-text-stroke-color:#303132] [-webkit-text-stroke-width:thin] [text-shadow:5px_5px_#303132]">
          SHOP ALL
        </h1>
      </div>

      <div className="px-[16px] py-[24px]">
        <div className="flex justify-center gap-16">
          <div className="rounded-6 sticky top-144 hidden h-full w-full max-w-250 border border-[#CBC1B7] bg-white p-[16px] lg:block"></div>
          <div className="flex w-full flex-col">
            <div className="flex flex-wrap justify-between gap-8 border-b border-b-[#CBC1B7] pb-16">
              <div className="flex items-center gap-12">
                <span className="hidden text-[#414141] lg:block">
                  10 PRODUCTS
                </span>

                <div className="lg:hidden">
                  {/* <DialogTrigger>
                    <Button
                      aria-label="Open filter"
                      className="flex cursor-pointer items-center justify-center text-black"
                    >
                      <span className="text-16 font-normal">FILTER</span>
                      <svg
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="-mt-2 w-16 -rotate-90"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        ></path>
                      </svg>
                    </Button>

                    <Dialog
                      type="leftToRight"
                      dialogProps={{
                        className: cn('bg-white px-16 py-24'),
                      }}
                    >
                      <Button
                        slot="close"
                        className="-mt-2 flex cursor-pointer items-center justify-center gap-8 py-16 text-black"
                      >
                        <svg
                          fill="none"
                          stroke-width="1.5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="w-16 rotate-90"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          ></path>
                        </svg>

                        <span className="text-20 font-normal">FILTER</span>
                      </Button>

                      <hr className="border-zinc-400" />

                      <div className="mt-24"></div>
                    </Dialog>
                  </DialogTrigger> */}
                </div>

                {/* <Button
                  aria-label="clear filters"
                  className={`rounded-6 flex cursor-pointer items-center gap-4 border bg-white p-10 px-16 py-6 text-[#C1803E]`}
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
                </Button> */}
              </div>
              <form className="flex items-center gap-8" action="">
                <p id="sort-by" className="text-[#414141]">
                  SORT BY:
                </p>

                {/* <StandardSelect
                  aria-labelledby="sort-by"
                  items={sortByOptions}
                  className="w-175"
                >
                  {({ value }) => (
                    <StandardSelectItem>{value}</StandardSelectItem>
                  )}
                </StandardSelect> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
