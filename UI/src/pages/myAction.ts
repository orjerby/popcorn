'use server'

import { FieldErrors } from 'react-hook-form'

function fakeFail(name: FormDataEntryValue | null) {
  return new Promise((res) => {
    setTimeout(() => {
      if (name === 'or') return res(false)
      return res(true)
    }, 1500)
  })
}

type ApiResponse = {
  success: boolean
  message?: string
  errors?: FieldErrors
}

export async function myAction(
  previousState: ApiResponse | null,
  formData: FormData,
): Promise<ApiResponse> {
  const error = await fakeFail(formData.get('email'))

  if (error) {
    const errors: FieldErrors = {}

    errors.email = {
      type: 'required',
      message: 'Error from api - email',
    }
    errors.firstName = {
      type: 'required',
      message: 'Error from api - firstName',
    }
    errors.lastName = {
      type: 'required',
      message: 'Error from api - lastName',
    }
    errors.city = {
      type: 'required',
      message: 'Error from api - city',
    }
    errors.zip = {
      type: 'required',
      message: 'Error from api - zip',
    }
    errors.state = {
      type: 'required',
      message: 'Error from api - state',
    }
    return {
      success: false,
      message: 'Global Error!',
      errors,
    }
  }

  return {
    success: true,
    message: 'success!',
  }
}
