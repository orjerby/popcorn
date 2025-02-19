import { useState } from 'react'
import {
  Select as AriaSelect,
  Button,
  composeRenderProps,
  FieldError,
  Key,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  Popover,
  SelectValue,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { BaseSelectBaseProps, SelectItem } from '../types'

export function StandardSelectBase({
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
}: BaseSelectBaseProps<SelectItem>) {
  const [value, setValue] = useState<Key>(defaultSelectedKey ?? '')

  return (
    <AriaSelect
      {...props}
      data-dirty={isDirty || undefined}
      data-touched={isTouched || undefined}
      data-has-value={value ? true : undefined}
      defaultSelectedKey={defaultSelectedKey}
      onSelectionChange={(key) => {
        setValue(key)
        onSelectionChange?.(key)
      }}
      className={composeRenderProps(props.className, (className) =>
        twMerge('group font-segoe-ui flex flex-col gap-5', className),
      )}
    >
      <div className="grid items-center">
        <Label className="text-12 pointer-events-none mx-11 -translate-y-10 text-gray-500 transition-all duration-200 [grid-area:1/1]">
          {label}
        </Label>
        <Button
          ref={inputRef}
          className="text-14 rounded-5 flex border border-gray-300 bg-white px-11 py-13.5 pt-19.5 pb-7.5 text-black outline-0 transition-all duration-200 [grid-area:1/1] group-data-focused:border-[#b69775] group-data-focused:shadow-[0_0_0_1px_#b69775] group-data-invalid:!border-[#dd1d1d] group-data-invalid:!shadow-[0_0_0_1px_#dd1d1d]"
        >
          <SelectValue />
        </Button>
        <Popover
          offset={0}
          className="text-14 font-segoe-ui rounded-10 overflow-hidden border border-gray-300 bg-white font-normal text-black"
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

export function StandardSelectItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className="text-14 min-w-(--trigger-width) px-10 py-2 font-normal text-black outline-0 data-focused:bg-blue-700 data-focused:text-white"
    />
  )
}
