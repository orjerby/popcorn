import { ComponentType } from 'react'
import type { FieldValues, RegisterOptions } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'
import { StandardCheckboxBaseProps } from './Bases/StandardCheckboxBase'

type CheckboxBaseProps = StandardCheckboxBaseProps

export function createCheckbox<T extends CheckboxBaseProps>(
  CheckboxBase: ComponentType<T>,
) {
  type Props = T & {
    rules?: RegisterOptions<FieldValues>
  }

  return function Checkbox(props: Props) {
    const { name, rules } = props
    const form = useFormContext()

    if (!name || !form) {
      return <CheckboxBase {...props} />
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
          <CheckboxBase
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
