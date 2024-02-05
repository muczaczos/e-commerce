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
        <Input
          name="fullname"
          type="text"
          label="Fullname"
          required
          register={register}
          error={errors.email}
        />
        <Input
          name="email"
          type="email"
          label="Email"
          required
          register={register}
          error={errors.email}
        />
        <Input
          name="phone"
          type="number"
          label="Phone Number"
          required
          register={register}
          error={errors.email}
        />
     
      
    </div>
  )
}

export default ShippingDetails
