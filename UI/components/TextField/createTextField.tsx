'use client'

import { ComponentType } from 'react'
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form'
import { BaseTextFieldProps } from './types'

// Define the props for the text field component
type TextFieldProps<T extends FieldValues> = Omit<
  // Removes specific props from BaseTextFieldProps because they will be provided by react-hook-form’s Controller
  BaseTextFieldProps,
  'name' | 'value' | 'onChange' | 'onBlur' | 'inputRef'
> & {
  name?: Path<T> // Use Path<T> for the name prop
  rules?: RegisterOptions<T>
}

// Factory function to create a text field component
export function createTextField<
  T extends FieldValues = FieldValues, // Generic for form values
  P extends BaseTextFieldProps = BaseTextFieldProps, // Generic for component props
>(TextFieldBase: ComponentType<P>) {
  return function CreatedTextField(props: TextFieldProps<T> & P) {
    const { name, rules, ...rest } = props
    const form = useFormContext<T>() // Use generic T for form context

    // If no name or form context is provided, render the base component without form integration
    if (!name || !form) {
      return <TextFieldBase {...(rest as P)} />
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
          <TextFieldBase
            {...(rest as P)} // Pass all remaining props to the base component
            inputRef={ref}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
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
