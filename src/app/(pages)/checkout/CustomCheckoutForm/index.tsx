'use client'

import React, { useCallback } from 'react'
import axios from 'axios'
import { sha1 } from 'js-sha1'
import { useRouter } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { priceFromJSON } from '../../../_components/Price'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

const CustomCheckoutForm: React.FC<{ method: string }> = ({ method }) => {
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { cart, cartTotal, totalAmount} = useCart()

  const handleSubmit = async () => {
    if (method === 'gateway') {
      let data = JSON.stringify({
        title: 'test nr 1',
        amount: {
          value: 150,
          currencyCode: 'pln',
        },
        description: 'Order no: 1222',
        additionalData: 'no: 1222',
        returnUrl: 'https://www.planet-of-mushrooms.com',
        negativeReturnUrl: 'https://www.shroom.it',
        languageCode: 'pl',
        referer: 'UiTeH',
        sign: 'string',
      })

      const dataObj = JSON.parse(data)

      var crypto = sha1(
        dataObj.title +
          '' +
          dataObj.amount.value +
          '' +
          dataObj.amount.currencyCode +
          '' +
          dataObj.description +
          '' +
          dataObj.additionalData +
          '' +
          dataObj.additionalData +
          '' +
          dataObj.returnUrl +
          '' +
          dataObj.negativeReturnUrl +
          '' +
          dataObj.languageCode +
          '' +
          dataObj.referer +
          '649998925d9c03ce63525b4c84711054',
      )

      dataObj.sign = crypto

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://pay.cashbill.pl/testws/rest/payment/planet-of-mushrooms.com',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Content-Security-Policy': 'connect-src https://pay.cashbill.pl',
        },
        data: data,
      }

      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          console.log('dupa')
        })
    } else if (method === 'transfer') {
      console.log('1')
      const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total: totalAmount,
          stripePaymentIntentID: '',
          items: (cart?.items || [])?.map(({ product, quantity }) => ({
            product: typeof product === 'string' ? product : product.id,
            quantity,
            price: typeof product === 'object' ? priceFromJSON(product.priceJSON, 1, true) : undefined,
          })),
        }),
      })

      const {
        error: errorFromRes,
        doc,
      }: {
        message?: string
        error?: string
        doc: Order
      } = await orderReq.json()
      router.push(`/order-confirmation?order_id=${doc.id}`)
      console.log('end transfer')
    } else if (method === 'eth') {
      console.log('dupa eth')
    }
  }

  return (
    <div className={classes.form}>
      <div className={classes.actions}>
        <Button label="Back to cart" href="/cart" appearance="secondary" />
        <button onClick={handleSubmit}>Place the Order</button>
      </div>
    </div>
  )
}

export default CustomCheckoutForm
