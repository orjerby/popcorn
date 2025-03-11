import { FieldValues } from 'react-hook-form'
import {
  PhoneTextFieldBase,
  PhoneTextFieldBaseProps,
} from './Bases/PhoneTextFieldBase'
import { StandardTextFieldBase } from './Bases/StandardTextFieldBase'
import { createTextField } from './createTextField'

export const createTypedStandardTextField = <
  T extends FieldValues = FieldValues,
>() => createTextField<T>(StandardTextFieldBase)

export const createTypedPhoneTextField = <
  T extends FieldValues = FieldValues,
>() => createTextField<T, PhoneTextFieldBaseProps>(PhoneTextFieldBase)

export const StandardTextField = createTypedStandardTextField()
export const PhoneTextField = createTypedPhoneTextField()
