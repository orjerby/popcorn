import type { FieldValues, RegisterOptions } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'
import { StandardSelectBaseProps } from './Bases/StandardSelectBase'
import { SelectItem } from './types'

type SelectBaseProps<T extends SelectItem> = StandardSelectBaseProps<T>

export function createSelect<T extends SelectItem>(
  SelectBase: React.ComponentType<SelectBaseProps<T>>,
) {
  type Props = SelectBaseProps<T> & {
    rules?: RegisterOptions<FieldValues>
  }

  return function FormSelect(props: Props) {
    const { name, rules, children } = props
    const form = useFormContext()

    if (!name || !form) {
      return <SelectBase {...props} />
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
          <SelectBase
            {...props}
            inputRef={ref}
            name={name}
            isDisabled={disabled}
            selectedKey={value}
            onBlur={onBlur}
            onSelectionChange={onChange}
            isRequired={!!rules?.required}
            isInvalid={invalid}
            isDirty={isDirty}
            isTouched={isTouched}
            errorMessage={error?.message}
            validationBehavior="aria"
          >
            {children}
          </SelectBase>
        )}
      />
    )
  }
}
