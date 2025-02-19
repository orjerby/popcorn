import {
  SelectProps as AriaSelectProps,
  Key,
  ValidationResult,
} from 'react-aria-components'
import { RefCallBack } from 'react-hook-form'

export type SelectItem = {
  id: number | string
  value: Key
}

export type CountryOption = {
  id: number | string
  value: Key
  phoneNumberPrefix: number
  image: string
}

export type BaseSelectBaseProps<T extends SelectItem> = Omit<
  AriaSelectProps<T>,
  'children'
> & {
  label: string
  items: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
  inputRef?: RefCallBack
  isDirty?: boolean
  isTouched?: boolean
  errorMessage?: string | ((validation: ValidationResult) => string)
  onSelectionChange?: (key: Key) => void
}
