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
          fieldState: { error, isDirty, isTouched, invalid },
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
