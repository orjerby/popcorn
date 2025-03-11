import { FieldValues } from 'react-hook-form'
import { StandardCheckboxBase } from './Bases/StandardCheckboxBase'
import { createCheckbox } from './createCheckbox'

export const StandardCheckbox = createCheckbox(StandardCheckboxBase)

export const createTypedStandardCheckbox = <
  T extends FieldValues = FieldValues,
>() => createCheckbox<T>(StandardCheckboxBase)

export const StandardTextField = createTypedStandardCheckbox()
