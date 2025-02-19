import { Button, TooltipTrigger } from 'react-aria-components'
import { CountrySelect } from '../Select'
import { CountrySelectItem } from '../Select/Bases/CountrySelectBase'
import { CountryOption } from '../Select/types'
import { StandardTextField } from '../TextField'
import { BaseTextFieldProps } from '../TextField/types'
import { Tooltip } from '../Tooltip/Tooltip'

const phoneFormat = (value: string) =>
  value.length > 3 ? '+972 ### ### ####' : '+972 ####'

export type PhoneFieldProps = BaseTextFieldProps & {
  selectLabel: string
  countries: CountryOption[]
}

export function PhoneField({ selectLabel, countries }: PhoneFieldProps) {
  return (
    <div className="flex">
      <StandardTextField
        name="phone"
        label="Phone (optional)"
        placeholder="Phone (optional)"
        format={phoneFormat}
        className="flex-1"
      />

      <div className="flex-0-0-91 flex gap-14">
        <div className="flex">
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
        </div>

        <CountrySelect
          name="country"
          label={selectLabel}
          items={countries}
          className="w-64"
        >
          {({ value }) => <CountrySelectItem>{value}</CountrySelectItem>}
        </CountrySelect>
      </div>
    </div>
  )
}
