import { useState } from 'react'
import {
  TextField as AriaTextField,
  composeRenderProps,
  FieldError,
  Input,
  Label,
} from 'react-aria-components'
import { PatternFormat } from 'react-number-format'
import { cn } from '../../../tailwind/tailwindMerge'
import { BaseTextFieldProps } from '../types'

export function StandardTextFieldBase({
  inputRef,
  label,
  placeholder,
  isDirty = false,
  isTouched = false,
  errorMessage,
  format,
  onChange,
  ...props
}: BaseTextFieldProps) {
  const [value, setValue] = useState('')

  const commonInputProps = {
    placeholder,
    className:
      'text-14 rounded-5 border border-[#dedede] bg-white px-11 py-13.5 text-black outline-0 transition-all duration-200 [grid-area:1/1] group-data-has-value:pt-19.5 group-data-has-value:pb-7.5 group-data-invalid:!border-[#dd1d1d] group-data-invalid:!shadow-[0_0_0_1px_#dd1d1d] data-focused:border-[#b69775] data-focused:shadow-[0_0_0_1px_#b69775]',
  }

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <AriaTextField
      {...props}
      data-dirty={isDirty || undefined}
      data-touched={isTouched || undefined}
      data-has-value={value ? true : undefined}
      className={composeRenderProps(props.className, (className) =>
        cn('group font-segoe-ui flex flex-col gap-5', className),
      )}
    >
      <div className="grid items-center">
        <Label className="text-12 pointer-events-none mx-11 -translate-y-6 text-[#707070] opacity-0 transition-all duration-200 [grid-area:1/1] group-data-has-value:-translate-y-10 group-data-has-value:opacity-100">
          {label}
        </Label>
        {format ? (
          <PatternFormat
            getInputRef={inputRef}
            {...commonInputProps}
            format={typeof format === 'string' ? format : format(value)}
            onValueChange={({ value }) => handleChange(value)}
            customInput={Input}
          />
        ) : (
          <Input
            ref={inputRef}
            {...commonInputProps}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        )}
      </div>
      <FieldError className="text-14 text-[#dd1d1d]">{errorMessage}</FieldError>
    </AriaTextField>
  )
}
