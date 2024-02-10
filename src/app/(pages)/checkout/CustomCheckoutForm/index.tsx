'use client'

import React, { useCallback } from 'react'
import axios from 'axios'
import { sha1 } from 'js-sha1'
import { useRouter } from 'next/navigation'

import { Input } from '../../../_components/Input'
import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { priceFromJSON } from '../../../_components/Price'
import { useCart } from '../../../_providers/Cart'
import ShippingDetails from '../CheckoutPage/ShippingDetails'
import PaymentMethods from '../CheckoutPage/PaymentMethods'

import classes from './index.module.scss'
import { useForm } from 'react-hook-form'

const CustomCheckoutForm: React.FC<{}> = ({}) => {
  const [error, setError] = React.useState<string | null>(null)
  //const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { cart, cartTotal, totalAmount } = useCart()
  const {
    register,
    formState: { errors, isLoading },
  } = useForm<FormData>()



 

  return (
    <>
    
    
    </>
  )
}

export default CustomCheckoutForm
