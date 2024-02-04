'use client'

import React, { useCallback } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { priceFromJSON } from '../../../_components/Price'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const CheckoutForm: React.FC<{}> = () => {
 

  return (
    <form onSubmit={Object} className={classes.form}>
     {/* <PaymentElement /> */ }
      <div className={classes.actions}>
        <Button label="Back to cart" href="/cart" appearance="secondary" />
        <Button
          label={'Checkout'}
          type="submit"
          appearance="primary"
        />
      </div>
    </form>
  )
}

export default CheckoutForm
