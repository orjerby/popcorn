import { TextFieldProps, ValidationResult } from 'react-aria-components'
import { RefCallBack } from 'react-hook-form'

export type BaseTextFieldProps = TextFieldProps & {
  label: string
  placeholder: string
  inputRef?: RefCallBack
  isDirty?: boolean
  isTouched?: boolean
  errorMessage?: string | ((validation: ValidationResult) => string)
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  validationBehavior?: 'aria' | 'native'
  format?: string | ((value: string) => string)
}
