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

const ShippingDetails = ({setFullName, setAddress, setCity, setPostalCode, setCountry, setPhone, setEmail}) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  const handleName = (e) => {
    setFullName(e.target.value)
    console.log(e.target.value)
  }

  const handleAddress = (e) => {
    setAddress(e.target.value)
  }

  const handleCity = (e) => {
    setCity(e.target.value)
  }

  const handlePostalCode = (e) => {
    setPostalCode(e.target.value)
  }

  const handleCountry = (e) => {
    setCountry(e.target.value)
  }

  const handlePhone = (e) => {
    setPhone(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  return (
    <div className={classes.shippingSection}>
      <h3 className={classes.shipping}>Shipping Details</h3>
      <div className={classes.forms}>
        <div className={classes.fullName}>
          <Input name="fullname" type="text" label="Full Name" register={register} error={null} disabled={false} onChange={handleName}/>
        </div>
        <div className={classes.address}>
          <Input name="address" type="text" label="Street Address" register={register} error={null} onChange={handleAddress} />
        </div>
        <div className={classes.city}>
          <Input name="city" type="text" label="City" register={register} error={null} onChange={handleCity}/>
        </div>
        <div className={classes.postalCode}>
          <Input name="postalcode" type="text" label="Postal Code" register={register} error={null} onChange={handlePostalCode}/>
        </div>
        <div className={classes.country}>
          <Input name="country" type="text" label="Country" register={register} error={null} onChange={handleCountry}/>
        </div>
        <div className={classes.phone}>
          <Input name="phone" type="text" label="Phone Number" register={register} error={null} onChange={handlePhone}/>
        </div>
        <div className={classes.email}>
          <Input name="email" type="email" label="Email" register={register} error={null} onChange={handleEmail}/>
        </div>
      </div>
      </div>
  )
}

export default ShippingDetails
