'use client'

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
import { tv } from 'tailwind-variants'
import { cn, twMergeConfig } from '../../../tailwind/tailwindMerge'
import { BaseSelectBaseProps, SelectItem } from '../types'

const select = tv(
  {
    slots: {
      base: 'group font-segoe-ui flex flex-col gap-5',
      container: 'grid items-center',
      label:
        'text-12 pointer-events-none mx-11 -translate-y-10 font-normal text-gray-500 transition-all duration-200 [grid-area:1/1]',
      button: [
        'text-14 rounded-5 flex border border-gray-300 bg-white px-11 py-13.5 pt-19.5 pb-7.5 font-normal',
        'text-black outline-0 transition-all duration-200 [grid-area:1/1]',
        'group-data-focused:border-[#b69775] group-data-focused:shadow-[0_0_0_1px_#b69775]',
        'group-data-invalid:!border-[#dd1d1d] group-data-invalid:!shadow-[0_0_0_1px_#dd1d1d]',
      ],
      popover: 'rounded-10 overflow-hidden border border-gray-300 bg-white',
      listItem:
        'font-segoe-ui text-14 min-w-(--trigger-width) px-10 py-2 font-normal text-black outline-0 data-focused:bg-blue-700 data-focused:text-white',
      error: 'text-14 text-red-600',
    },
  },
  { twMergeConfig },
)

export type SplitSelectProps = BaseSelectBaseProps<SelectItem> & {
  label: string
  containerClassName?: string
  labelClassName?: string
  buttonClassName?: string
  popoverClassName?: string
  errorClassName?: string
}

export function SplitSelectBase({
  inputRef,
  label,
  items,
  children,
  isDirty = false,
  isTouched = false,
  errorMessage,
  onSelectionChange,
  defaultSelectedKey,
  className,
  containerClassName,
  labelClassName,
  buttonClassName,
  popoverClassName,
  errorClassName,
  ...props
}: SplitSelectProps) {
  const [value, setValue] = useState<Key>(defaultSelectedKey ?? '')
  const styles = select()

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
      className={composeRenderProps(className, (className, renderProps) =>
        styles.base({ ...renderProps, className }),
      )}
    >
      <div className={cn(styles.container(), containerClassName)}>
        <Label className={cn(styles.label(), labelClassName)}>{label}</Label>
        <Button
          ref={inputRef}
          className={composeRenderProps(
            buttonClassName,
            (className, renderProps) =>
              styles.button({ ...renderProps, className }),
          )}
        >
          <SelectValue />
        </Button>
        <Popover
          offset={0}
          className={composeRenderProps(
            popoverClassName,
            (className, renderProps) =>
              styles.popover({ ...renderProps, className }),
          )}
        >
          <ListBox items={items}>{children}</ListBox>
        </Popover>
      </div>
      {errorMessage && (
        <FieldError
          className={composeRenderProps(
            errorClassName,
            (className, renderProps) =>
              styles.error({ ...renderProps, className }),
          )}
        >
          {errorMessage}
        </FieldError>
      )}
    </AriaSelect>
  )
}

export function SplitSelectItem({ className, ...props }: ListBoxItemProps) {
  const styles = select()

  return (
    <ListBoxItem
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles.listItem({ ...renderProps, className }),
      )}
    />
  )
}
