import {
  BaseSyntheticEvent,
  startTransition,
  useActionState,
  useEffect,
} from 'react'
import { Button, Form, Key } from 'react-aria-components'
import {
  FieldErrors,
  FieldValues,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { createTypedStandardCheckbox } from '../components/Checkbox'
import { createTypedSplitSelect } from '../components/Select'
import { SplitSelectItem } from '../components/Select/Bases/SplitSelectBase'
import {
  createTypedPhoneTextField,
  createTypedStandardTextField,
} from '../components/TextField'
import { myAction } from './myAction'

export type MyFormData = {
  country: Key
  email: string
  emailOffers: boolean
  firstName: string
  lastName: string
  company: string
  address: string
  apartment: string
  city: string
  state: string
  zip: string
  phone: string
  textOffers: boolean
}

const PhoneTextField = createTypedPhoneTextField<MyFormData>()
const StandardTextField = createTypedStandardTextField<MyFormData>()
const StandardCheckbox = createTypedStandardCheckbox<MyFormData>()
const SplitSelect = createTypedSplitSelect<MyFormData>()

const options = [{ id: 1, value: 'United States' }]

export default function CheckoutPage() {
  const [returnedApiData, submitAction, isPending] = useActionState(
    myAction,
    null,
  )

  const methods = useForm<MyFormData>({
    defaultValues: {
      country: 1,
      email: '',
      emailOffers: false,
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      textOffers: false,
    },
    errors: returnedApiData?.errors,
    mode: 'onTouched',
  })

  const { handleSubmit, setFocus } = methods

  function getFirstError<T extends FieldValues>(errors?: FieldErrors<T>) {
    if (errors) {
      const values = Object.keys(errors) as (keyof T)[]
      return values[0]
    }
  }

  useEffect(() => {
    const firstError = getFirstError<MyFormData>(returnedApiData?.errors)

    if (firstError) {
      setFocus(firstError)
    }
  }, [returnedApiData])

  const onSubmit = (data: MyFormData, event?: BaseSyntheticEvent) => {
    const formData = new FormData(event?.target)

    startTransition(() => {
      submitAction(formData)
    })
  }

  return (
    <>
      <div className="mt-200 flex">
        <div className="flex flex-1 justify-end bg-white">
          <FormProvider {...methods}>
            <Form
              onSubmit={handleSubmit((_, event) => onSubmit(_, event))}
              validationErrors={{ email: 'Please select a frequency.' }}
              className="flex w-full max-w-660 flex-col gap-32 p-38"
            >
              <p className="text-30 text-black">{isPending && 'Loading...'}</p>

              <div className="flex flex-col gap-14">
                <h2 className="text-21 font-semibold text-black">Contact</h2>
                <div className="flex flex-col gap-14">
                  <StandardTextField
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    rules={{
                      required: 'Enter an email',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Enter a valid email',
                      },
                    }}
                  />
                </div>

                <StandardCheckbox name="emailOffers">
                  Email me with news and offers
                </StandardCheckbox>
              </div>

              <div className="flex flex-col gap-14">
                <h2 className="text-21 font-semibold text-black">Delivery</h2>

                <div className="flex flex-col gap-14">
                  <SplitSelect
                    name="country"
                    label="Country/Region"
                    items={options}
                  >
                    {({ value }) => <SplitSelectItem>{value}</SplitSelectItem>}
                  </SplitSelect>

                  <div className="flex gap-14">
                    <StandardTextField
                      name="firstName"
                      label="First name"
                      placeholder="First name"
                      rules={{
                        required: 'Enter a first name',
                      }}
                      className="w-full"
                    />

                    <StandardTextField
                      name="lastName"
                      label="Last name"
                      placeholder="Last name"
                      rules={{
                        required: 'Enter a last name',
                      }}
                      className="w-full"
                    />
                  </div>

                  <StandardTextField
                    name="company"
                    label="Company (optional)"
                    placeholder="Company (optional)"
                  />

                  <StandardTextField
                    name="address"
                    label="Address"
                    placeholder="Address"
                    rules={{
                      required: 'Enter an address',
                    }}
                  />

                  <StandardTextField
                    name="apartment"
                    label="Apartment, suite, etc. (optional)"
                    placeholder="Apartment, suite, etc. (optional)"
                  />

                  <div className="flex gap-14">
                    <StandardTextField
                      name="city"
                      label="City"
                      placeholder="City"
                      rules={{
                        required: 'Enter a city',
                      }}
                      className="w-full"
                    />

                    <StandardTextField
                      name="state"
                      label="State"
                      placeholder="State"
                      rules={{
                        required: 'Select a state / province',
                      }}
                      className="w-full"
                    />

                    <StandardTextField
                      name="zip"
                      label="ZIP code"
                      placeholder="ZIP code"
                      rules={{
                        required: 'Enter a ZIP / postal code',
                      }}
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-14">
                    <PhoneTextField
                      name="phone"
                      label="Phone (optional)"
                      selectLabel="Country/Region"
                      placeholder="Phone (optional)"
                    />

                    <StandardCheckbox name="textOffers">
                      Text me with news and offers
                    </StandardCheckbox>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className={
                  'text-19 rounded-5 cursor-pointer bg-[#3eadb8] p-[14px] font-semibold text-white'
                }
              >
                Pay now
              </Button>

              <p className="text-14 text-[#dd1d1d]">
                {returnedApiData?.message}
              </p>
            </Form>
          </FormProvider>
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  )
}
