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
      return <SelectBase {...(props as SelectBaseProps<T>)} />
    }

    return (
      <Controller
        name={name}
        control={form.control}
        rules={rules}
        render={({
          field: { ref, onChange, value, ...field },
          fieldState: { invalid, isDirty, isTouched, error },
        }) => (
          <SelectBase
            {...props}
            {...field}
            inputRef={ref}
            onSelectionChange={onChange}
            isRequired={!!rules?.required}
            selectedKey={value}
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
