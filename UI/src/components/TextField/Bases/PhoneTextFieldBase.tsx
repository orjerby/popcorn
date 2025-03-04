import { Key, useEffect, useMemo, useState } from 'react'
import { useFocusRing } from 'react-aria'
import {
  TextField as AriaTextField,
  Button,
  composeRenderProps,
  FieldError,
  Input,
  Label,
  TooltipTrigger,
} from 'react-aria-components'
import { PatternFormat } from 'react-number-format'
import countriesData from '../../../data/countries.json'
import { cn } from '../../../tailwind/tailwindMerge'
import { CountrySelect } from '../../Select'
import { CountrySelectItem } from '../../Select/Bases/CountrySelectBase'
import { CountryOption } from '../../Select/types'
import { Tooltip } from '../../Tooltip/Tooltip'
import { BaseTextFieldProps } from '../types'

const DEFAULT_PHONE_FORMAT = '##########'

const getPhoneFormat = (prefix: number, value: string) =>
  value.length > 3 ? `(+${prefix}) ###-#######` : `(+${prefix}) ####`

const getPhoneFormatByCountry = (country: CountryOption, value: string) => {
  return country
    ? getPhoneFormat(country.phoneNumberPrefix, value)
    : DEFAULT_PHONE_FORMAT
}

export type PhoneTextFieldBaseProps = BaseTextFieldProps & {
  selectLabel: string
  defaultCountry?: string
}

export function PhoneTextFieldBase({
  inputRef,
  label,
  placeholder,
  selectLabel,
  defaultCountry = 'IL',
  isDirty = false,
  isTouched = false,
  errorMessage,
  onChange,
  ...props
}: PhoneTextFieldBaseProps) {
  const [value, setValue] = useState('')
  const [format, setformat] = useState(DEFAULT_PHONE_FORMAT)
  const [currentlySelectedCountry, setCurrentlySelectedCountry] =
    useState<CountryOption>()
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({
    within: true,
  })

  const countries = useMemo(
    () =>
      new Map(
        countriesData.map((country) => [
          country.code,
          {
            id: country.code,
            value: country.name,
            image: country.image,
            phoneNumberPrefix: country.phoneNumberPrefix,
          },
        ]),
      ),
    [countriesData],
  )

  const countriesArr = useMemo(
    () => Array.from(countries.values()),
    [countriesData],
  )

  useEffect(() => {
    const country = countries.get(defaultCountry)
    setCurrentlySelectedCountry(country)
    if (country) {
      setformat(getPhoneFormatByCountry(country, value))
    }
  }, [])

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onChange?.(newValue)
    if (currentlySelectedCountry) {
      setformat(getPhoneFormatByCountry(currentlySelectedCountry, newValue))
    }
  }

  const handleSelectChange = (newValue: Key) => {
    const country = countries.get(`${newValue}`)
    setCurrentlySelectedCountry(country)

    if (country) {
      setformat(getPhoneFormatByCountry(country, value))
    }
  }

  return (
    <div {...focusProps}>
      <AriaTextField
        {...props}
        data-focused={isFocused || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-dirty={isDirty || undefined}
        data-touched={isTouched || undefined}
        data-has-value={value ? true : undefined}
        className={composeRenderProps(props.className, (className) =>
          cn(
            'group font-segoe-ui rounded-5 flex flex-col gap-5 border border-[#dedede] bg-white transition-all duration-200 data-focused:border-[#b69775] data-focused:shadow-[0_0_0_1px_#b69775] data-invalid:!border-[#dd1d1d] data-invalid:!shadow-[0_0_0_1px_#dd1d1d]',
            className,
          ),
        )}
      >
        <div className="flex">
          <div className="grid flex-1 items-center">
            <Label className="text-12 pointer-events-none mx-11 -translate-y-6 text-[#707070] opacity-0 transition-all duration-200 [grid-area:1/1] group-data-has-value:-translate-y-10 group-data-has-value:opacity-100">
              {label}
            </Label>
            <PatternFormat
              getInputRef={inputRef}
              placeholder={placeholder}
              format={format}
              onValueChange={({ value }) => handleChange(value)}
              customInput={Input}
              className="text-14 px-11 py-13.5 text-black outline-0 [grid-area:1/1] group-data-has-value:pt-19.5 group-data-has-value:pb-7.5"
            />
          </div>

          <div className="flex-0-0-91 flex items-center gap-14">
            <TooltipTrigger delay={0} closeDelay={0}>
              <Button className="w-18 cursor-pointer overflow-hidden rounded-full text-[#707070] data-focus-visible:outline-2 data-focus-visible:outline-[#b69775]">
                <svg viewBox="0 0 14 14" stroke="currentColor" fill="none">
                  <circle cx="7" cy="7" r="5.6"></circle>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.6 5.1c.2-1.3 2.6-1.3 2.8 0S6.95 6.4 6.95 7.45m.055 2.35H7v.005h.005z"
                  ></path>
                  <circle cx="7" cy="9.7" r="0.1"></circle>
                </svg>
              </Button>

              <Tooltip>In case we need to contact you about your order</Tooltip>
            </TooltipTrigger>

            <CountrySelect
              label={selectLabel}
              items={countriesArr}
              defaultSelectedKey={defaultCountry}
              onSelectionChange={handleSelectChange}
              className="w-64"
            >
              {({ value, phoneNumberPrefix }) => (
                <CountrySelectItem>{`${value}(+${phoneNumberPrefix})`}</CountrySelectItem>
              )}
            </CountrySelect>
          </div>
        </div>

        <FieldError className="text-14 text-[#dd1d1d]">
          {errorMessage}
        </FieldError>
      </AriaTextField>
    </div>
  )
}
