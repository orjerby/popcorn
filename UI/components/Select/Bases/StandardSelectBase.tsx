'use client'

import { cn, twMergeConfig } from '@/tailwind/tailwindMerge'
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
import { tv } from 'tailwind-variants'
import { BaseSelectBaseProps, SelectItem } from '../types'

const select = tv(
  {
    slots: {
      base: 'flex flex-col gap-5',
      container: 'rounded-6 border border-[#CBC1B7] bg-white',
      button:
        'text-18 flex w-full cursor-pointer items-center justify-between py-6 pr-4 pl-12 font-normal text-[#C1803E]',
      icon: 'block w-20 text-[#CBC1B7]',
      popover: 'rounded-6 overflow-hidden border border-gray-300 bg-white',
      listItem:
        'text-18 min-w-(--trigger-width) px-10 py-2 font-normal text-[#C1803E] outline-0 data-focused:bg-blue-700 data-focused:text-white',
      error: 'text-14 text-red-600',
    },
  },
  { twMergeConfig },
)

export type StandardSelectProps = BaseSelectBaseProps<SelectItem> & {
  containerClassName?: string
  buttonClassName?: string
  iconClassName?: string
  popoverClassName?: string
  errorClassName?: string
}

export function StandardSelectBase({
  inputRef,
  items,
  children,
  isDirty = false,
  isTouched = false,
  errorMessage,
  onSelectionChange,
  defaultSelectedKey,
  className,
  containerClassName,
  buttonClassName,
  iconClassName,
  popoverClassName,
  errorClassName,
  ...props
}: StandardSelectProps) {
  const styles = select()
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
      className={composeRenderProps(className, (className, renderProps) =>
        styles.base({ ...renderProps, className }),
      )}
    >
      <div className={cn(styles.container(), containerClassName)}>
        <Button
          ref={inputRef}
          className={composeRenderProps(
            buttonClassName,
            (className, renderProps) =>
              styles.button({ ...renderProps, className }),
          )}
        >
          <SelectValue />
          <span aria-hidden="true" className={cn(styles.icon(), iconClassName)}>
            <svg
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              ></path>
            </svg>
          </span>
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

export function StandardSelectItem({ className, ...props }: ListBoxItemProps) {
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
