'use client'

import { ComponentType } from 'react'
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form'
import { BaseSelectBaseProps, SelectItem } from './types'

// Define the props for the select component
type SelectProps<T extends FieldValues, U> = Omit<U, 'name'> & {
  name?: Path<T> // Use Path<T> for the name prop
  rules?: RegisterOptions<T>
}

// Factory function to create a select component
export function createSelect<
  T extends FieldValues = FieldValues, // Generic for form values
  P extends SelectItem = SelectItem,
  U extends BaseSelectBaseProps<P> = BaseSelectBaseProps<P>,
>(SelectBase: ComponentType<U>) {
  return function CreatedSelect(props: SelectProps<T, U>) {
    const { name, rules, ...rest } = props
    const form = useFormContext<T>() // Use generic T for form context

    // If no name or form context is provided, render the base component without form integration
    if (!name || !form) {
      return <SelectBase {...(rest as U)} />
    }

    // Use react-hook-form's Controller to manage form state
    return (
      <Controller<T>
        control={form.control}
        name={name}
        rules={rules}
        render={({
          field: { ref, onChange, onBlur, value, disabled },
          fieldState: { error, isDirty, isTouched, invalid },
        }) => (
          <SelectBase
            {...(rest as U)} // Pass all remaining props to the base component
            inputRef={ref}
            selectedKey={value}
            onSelectionChange={onChange}
            onBlur={onBlur}
            isDisabled={disabled}
            isRequired={!!rules?.required}
            errorMessage={error?.message}
            isDirty={isDirty}
            isTouched={isTouched}
            isInvalid={invalid}
            validationBehavior="aria"
          />
        )}
      />
    )
  }
}
