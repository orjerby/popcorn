import { CheckboxProps as AriaCheckboxProps } from 'react-aria-components'

export type BaseCheckboxBaseProps = AriaCheckboxProps & {
  isDirty?: boolean
  isTouched?: boolean
}
