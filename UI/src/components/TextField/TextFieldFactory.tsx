import { ComponentType } from 'react'
import type { FieldValues, RegisterOptions } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'
import { StandardTextFieldBaseProps } from './Bases/StandardTextFieldBase'

type TextFieldBaseProps = StandardTextFieldBaseProps

export function createTextField<T extends TextFieldBaseProps>(
  TextFieldBase: ComponentType<T>,
) {
  type Props = T & {
    rules?: RegisterOptions<FieldValues>
  }

  return function TextField(props: Props) {
    const { name, rules } = props
    const form = useFormContext()

    if (!name || !form) {
      return <TextFieldBase {...props} />
    }

    return (
      <Controller
        control={form.control}
        name={name}
        rules={rules}
        render={({
          field: { ref, name, disabled, value, onBlur, onChange },
          fieldState: { invalid, isDirty, isTouched, error },
        }) => (
          <TextFieldBase
            {...props}
            inputRef={ref}
            name={name}
            isDisabled={disabled}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isRequired={!!rules?.required}
            isInvalid={invalid}
            isDirty={isDirty}
            isTouched={isTouched}
            errorMessage={error?.message}
            validationBehavior="aria"
          />
        )}
      />
    )
  }
}
