import { useState } from 'react'
import {
  Select as AriaSelect,
  Button,
  composeRenderProps,
  FieldError,
  Key,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  Popover,
  SelectValue,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { BaseSelectBaseProps, CountryOption } from '../types'

export type CountrySelectBaseProps = BaseSelectBaseProps<CountryOption>

export function CountrySelectBase<T extends CountryOption = CountryOption>({
  inputRef,
  label,
  items,
  children,
  isDirty = false,
  isTouched = false,
  errorMessage,
  onSelectionChange,
  defaultSelectedKey,
  ...props
}: CountrySelectBaseProps) {
  const [value, setValue] = useState<Key>(defaultSelectedKey ?? '')

  return (
    <AriaSelect
      {...props}
      aria-label={label}
      data-dirty={isDirty || undefined}
      data-touched={isTouched || undefined}
      data-has-value={value ? true : undefined}
      defaultSelectedKey={defaultSelectedKey}
      onSelectionChange={(key) => {
        setValue(key)
        onSelectionChange?.(key)
      }}
      className={composeRenderProps(props.className, (className) =>
        twMerge(
          'group/select font-segoe-ui flex h-full flex-col gap-5',
          className,
        ),
      )}
    >
      <div className="grid h-full items-center">
        <Button
          ref={inputRef}
          className="flex h-full items-center justify-center gap-5 px-11 text-[#707070] outline-0 group-data-focused/select:bg-[#e2d6c8] group-data-open/select:bg-[#e2d6c8]"
        >
          <div className="w-27">
            <SelectValue<T>>
              {({ selectedItem }) => {
                return (
                  <>
                    <img src={selectedItem?.image} />
                  </>
                )
              }}
            </SelectValue>
          </div>

          <svg
            viewBox="0 0 14 14"
            stroke="currentColor"
            fill="none"
            className="w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.9 5.6-4.653 4.653a.35.35 0 0 1-.495 0L2.1 5.6"
            ></path>
          </svg>
        </Button>
        <Popover
          offset={0}
          className="text-14 font-segoe-ui rounded-10 overflow-x-hidden border border-gray-300 bg-white font-normal text-black"
        >
          <ListBox items={items}>{children}</ListBox>
        </Popover>
      </div>
      {errorMessage && (
        <FieldError className="text-14 text-red-600">{errorMessage}</FieldError>
      )}
    </AriaSelect>
  )
}

export function CountrySelectItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className="text-14 min-w-(--trigger-width) px-10 py-2 font-normal text-black outline-0 data-focused:bg-blue-700 data-focused:text-white"
    />
  )
}
