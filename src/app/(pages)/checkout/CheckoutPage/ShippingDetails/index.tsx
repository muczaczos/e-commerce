'use client'

import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../../_components/Button'
import { Input } from '../../../../_components/Input'
import { Message } from '../../../../_components/Message'
import { useAuth } from '../../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  email: string
  password: string
}

const ShippingDetails = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data)
        if (redirect?.current) router.push(redirect.current as string)
        else router.push('/')
        window.location.href = '/'
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  return (
    <div className={classes.forms}>
      <div className={classes.fullName}>
        <Input
          name="fullname"
          type="text"
          label="Full Name"
          register={register}
          error={null}
          disabled={false}
        />
      </div>
      <div className={classes.address}>
        <Input name="address" type="text" label="Street Address" register={register} error={null} />
      </div>
      <div className={classes.city}>
        <Input name="city" type="text" label="City" register={register} error={null} />
      </div>
      <div className={classes.postalCode}>
        <Input name="postalcode" type="text" label="Postal Code" register={register} error={null} />
      </div>
      <div className={classes.country}>
        <Input name="country" type="text" label="Country" register={register} error={null} />
      </div>
      <div className={classes.phone}>
        <Input name="phone" type="text" label="Phone Number" register={register} error={null} />
      </div>
      <div className={classes.email}>
        <Input name="email" type="text" label="Email" register={register} error={errors.email} />
      </div>
    </div>
  )
}

export default ShippingDetails
