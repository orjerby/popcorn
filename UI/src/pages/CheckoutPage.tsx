import {
  BaseSyntheticEvent,
  startTransition,
  useActionState,
  useEffect,
} from 'react'
import { Button, Form } from 'react-aria-components'
import { FieldErrors, FieldValues, useForm } from 'react-hook-form'
import { FormField } from '../components/FormField/FormField'
import { myAction } from './myAction'

export type MyFormData = {
  email: string
  firstName: string
  lastName: string
  company: string
  address: string
  apartment: string
  city: string
  state: string
  zip: string
  phone: string
}

export default function CheckoutPage() {
  const [returnedApiData, submitAction, isPending] = useActionState(
    myAction,
    null,
  )

  const { control, handleSubmit, setFocus } = useForm<MyFormData>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
    },
    errors: returnedApiData?.errors,
    mode: 'onTouched',
  })

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

  const onSubmit = (_: MyFormData, event?: BaseSyntheticEvent) => {
    const formData = new FormData(event?.target)

    startTransition(() => {
      submitAction(formData)
    })
  }

  return (
    <>
      <div className="mt-200 flex">
        <div className="flex flex-1 justify-end bg-white">
          <Form
            onSubmit={handleSubmit((_, event) => onSubmit(_, event))}
            validationErrors={{ email: 'Please select a frequency.' }}
            className="flex w-full max-w-660 flex-col gap-32 p-38"
          >
            <p className="text-30 text-black">{isPending && 'Loading...'}</p>

            <div className="flex flex-col gap-14">
              <h2 className="text-21 font-semibold text-black">Contact</h2>

              <FormField
                control={control}
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

            <div className="flex flex-col gap-14">
              <h2 className="text-21 font-semibold text-black">Delivery</h2>

              <div className="flex flex-col gap-14">
                <div className="flex gap-14">
                  <FormField
                    control={control}
                    name="firstName"
                    label="First name"
                    placeholder="First name"
                    rules={{
                      required: 'Enter a first name',
                    }}
                    className="w-full"
                  />

                  <FormField
                    control={control}
                    name="lastName"
                    label="Last name"
                    placeholder="Last name"
                    rules={{
                      required: 'Enter a last name',
                    }}
                    className="w-full"
                  />
                </div>

                <FormField
                  control={control}
                  name="company"
                  label="Company (optional)"
                  placeholder="Company (optional)"
                />

                <FormField
                  control={control}
                  name="address"
                  label="Address"
                  placeholder="Address"
                  rules={{
                    required: 'Enter an address',
                  }}
                />

                <FormField
                  control={control}
                  name="apartment"
                  label="Apartment, suite, etc. (optional)"
                  placeholder="Apartment, suite, etc. (optional)"
                />

                <div className="flex gap-14">
                  <FormField
                    control={control}
                    name="city"
                    label="City"
                    placeholder="City"
                    rules={{
                      required: 'Enter a city',
                    }}
                    className="w-full"
                  />

                  <FormField
                    control={control}
                    name="state"
                    label="State"
                    placeholder="State"
                    rules={{
                      required: 'Select a state / province',
                    }}
                    className="w-full"
                  />

                  <FormField
                    control={control}
                    name="zip"
                    label="ZIP code"
                    placeholder="ZIP code"
                    rules={{
                      required: 'Enter a ZIP / postal code',
                    }}
                    className="w-full"
                  />
                </div>

                <FormField
                  control={control}
                  name="phone"
                  label="Phone (optional)"
                  placeholder="Phone (optional)"
                />
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

            <p className="text-14 text-[#dd1d1d]">{returnedApiData?.message}</p>
          </Form>
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  )
}
