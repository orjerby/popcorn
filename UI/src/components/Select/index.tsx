import { FieldValues } from 'react-hook-form'
import {
  CountrySelectBase,
  CountrySelectBaseProps,
} from './Bases/CountrySelectBase'
import { StandardSelectBase } from './Bases/StandardSelectBase'
import { createSelect } from './createSelect'
import { CountryOption } from './types'

export const createTypedStandardSelect = <
  T extends FieldValues = FieldValues,
>() => createSelect<T>(StandardSelectBase)

export const createTypedCountrySelect = <
  T extends FieldValues = FieldValues,
>() => createSelect<T, CountryOption, CountrySelectBaseProps>(CountrySelectBase)

export const StandardSelect = createTypedStandardSelect()
export const CountrySelect = createTypedCountrySelect()
