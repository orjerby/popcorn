import { ComponentProps } from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'
import { TextField } from '../TextField/TextField'

type FormFieldProps = {
  name: string
  control: Control<any>
  label: string
  placeholder: string
  type?: string
  rules?: RegisterOptions
  className?: string
} & Partial<ComponentProps<typeof TextField>>

export function FormField({
  name,
  control,
  label,
  type = 'text',
  rules,
  className,
  placeholder,
  ...props
}: FormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { ref, ...field },
        fieldState: { invalid, isDirty, isTouched, error },
      }) => (
        <TextField
          {...props}
          {...field}
          inputRef={ref}
          type={type}
          isRequired={!!rules?.required}
          validationBehavior="aria"
          isInvalid={invalid}
          isDirty={isDirty}
          isTouched={isTouched}
          label={label}
          placeholder={placeholder}
          errorMessage={error?.message}
          className={className}
        />
      )}
    />
  )
}
