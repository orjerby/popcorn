import { FieldValues } from 'react-hook-form'
import {
  CountrySelectBase,
  CountrySelectBaseProps,
} from './Bases/CountrySelectBase'
import { SplitSelectBase, SplitSelectProps } from './Bases/SplitSelectBase'
import {
  StandardSelectBase,
  StandardSelectProps,
} from './Bases/StandardSelectBase'
import { createSelect } from './createSelect'
import { CountryOption, SelectItem } from './types'

export const createTypedStandardSelect = <
  T extends FieldValues = FieldValues,
>() => createSelect<T, SelectItem, StandardSelectProps>(StandardSelectBase)

export const createTypedSplitSelect = <T extends FieldValues = FieldValues>() =>
  createSelect<T, SelectItem, SplitSelectProps>(SplitSelectBase)

export const createTypedCountrySelect = <
  T extends FieldValues = FieldValues,
>() => createSelect<T, CountryOption, CountrySelectBaseProps>(CountrySelectBase)

export const StandardSelect = createTypedStandardSelect()
export const CountrySelect = createTypedCountrySelect()
