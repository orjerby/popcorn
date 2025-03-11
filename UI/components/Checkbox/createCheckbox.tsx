'use client'

import { ComponentType } from 'react'
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form'
import { BaseCheckboxBaseProps } from './types'

// Define the props for the checkbox component
type CheckboxProps<T extends FieldValues> = Omit<
  BaseCheckboxBaseProps,
  'name' | 'isSelected' | 'onChange' | 'inputRef'
> & {
  name?: Path<T> // Use Path<T> for the name prop
  rules?: RegisterOptions<T>
}

// Factory function to create a checkbox component
export function createCheckbox<
  T extends FieldValues = FieldValues, // Generic for form values
  P extends BaseCheckboxBaseProps = BaseCheckboxBaseProps, // Generic for component props
>(CheckboxBase: ComponentType<P>) {
  return function CreatedCheckbox(props: CheckboxProps<T> & P) {
    const { name, rules, ...rest } = props
    const form = useFormContext<T>() // Use generic T for form context

    // If no name or form context is provided, render the base component without form integration
    if (!name || !form) {
      return <CheckboxBase {...(rest as P)} />
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
          <CheckboxBase
            {...(rest as P)}
            inputRef={ref}
            isSelected={value}
            onChange={onChange}
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
