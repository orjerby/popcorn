import { useState } from 'react'
import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  composeRenderProps,
  FieldError,
  Input,
  Label,
  ValidationResult,
} from 'react-aria-components'
import { RefCallBack } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export type StandardTextFieldBaseProps = AriaTextFieldProps & {
  label: string
  placeholder: string
  inputRef?: RefCallBack
  isDirty?: boolean
  isTouched?: boolean
  errorMessage?: string | ((validation: ValidationResult) => string)
  onChange?: (value: string) => void
}

export function StandardTextFieldBase({
  inputRef,
  label,
  placeholder,
  isDirty = false,
  isTouched = false,
  errorMessage,
  onChange,
  ...props
}: StandardTextFieldBaseProps) {
  const [value, setValue] = useState<string>()

  return (
    <AriaTextField
      {...props}
      data-dirty={isDirty || undefined}
      data-touched={isTouched || undefined}
      data-has-value={value ? true : undefined}
      onChange={(value) => {
        setValue(value)
        onChange?.(value)
      }}
      className={composeRenderProps(props.className, (className) =>
        twMerge('group font-segoe-ui flex flex-col gap-5', className),
      )}
    >
      <div className="grid items-center">
        <Label className="text-12 pointer-events-none mx-11 -translate-y-6 text-[#707070] opacity-0 transition-all duration-200 [grid-area:1/1] group-data-has-value:-translate-y-10 group-data-has-value:opacity-100">
          {label}
        </Label>
        <Input
          ref={inputRef}
          placeholder={placeholder}
          className="text-14 rounded-5 border border-[#dedede] bg-white px-11 py-13.5 text-black outline-0 transition-all duration-200 [grid-area:1/1] group-data-has-value:pt-19.5 group-data-has-value:pb-7.5 group-data-invalid:!border-[#dd1d1d] group-data-invalid:!shadow-[0_0_0_1px_#dd1d1d] data-focused:border-[#b69775] data-focused:shadow-[0_0_0_1px_#b69775]"
        />
      </div>
      <FieldError className="text-14 text-[#dd1d1d]">{errorMessage}</FieldError>
    </AriaTextField>
  )
}
