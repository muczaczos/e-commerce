'use client'

import React, { Fragment, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import { useTheme } from '../../../_providers/Theme'
import cssVariables from '../../../cssVariables'
import { CheckoutForm } from '../CheckoutForm'
import { CheckoutItem } from '../CheckoutItem'
import CustomCheckoutForm from '../CustomCheckoutForm'
import PaymentMethods from './PaymentMethods'
import ShippingDetails from './ShippingDetails'

import classes from './index.module.scss'

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
const stripe = loadStripe(apiKey)

export const CheckoutPage: React.FC<{
  settings: Settings
}> = props => {
  const {
    settings: { productsPage },
  } = props
  const [method, setMethod] = React.useState('')

  const { user } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [clientSecret, setClientSecret] = React.useState()
  const hasMadePaymentIntent = React.useRef(false)
  const { theme } = useTheme()

  const { cart, cartIsEmpty, cartTotal, totalAmount } = useCart()

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  useEffect(() => {
    if (user && cart && hasMadePaymentIntent.current === false) {
      hasMadePaymentIntent.current = true

      const makeIntent = async () => {
        try {
          const paymentReq = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-payment-intent`,
            {
              method: 'POST',
              credentials: 'include',
            },
          )

          const res = await paymentReq.json()

          if (res.error) {
            setError(res.error)
          } else if (res.client_secret) {
            setError(null)
            setClientSecret(res.client_secret)
          }
        } catch (e) {
          setError('Something went wrong.')
        }
      }

      makeIntent()
    }
  }, [cart, user])

  //if (!user || !stripe) return null

  const generatePayment = () => {
    const axios = require('axios')

    var crypto = require('crypto')
    var shasum = crypto.createHash('sha1')
    $transactionRequest['sign'] = sha1($transactionRequest['title']
    . $transactionRequest['amount']['value'] . $transactionRequest['amount']['currencyCode']
    . $transactionRequest['returnUrl'] . $transactionRequest['description'] . $transactionRequest['additionalData']
    . $secretPhrase);

    let data = JSON.stringify({
      title: 'test nr 1',
      amount: {
        value: 150,
        currencyCode: 'pln',
      },
      description: 'Order no: 1222',
      additionalData: 'no: 1222',
      returnUrl: 'https://www.planet-of-mushrooms.com',
      negativeReturnUrl: 'htpps://www.shroom.it',
      languageCode: 'pl',
      personalData: {
        firstName: 'Jan',
        surname: 'Kowalski',
        email: 'jan@tlen.pl',
        country: 'Poland',
        city: 'Warszawa',
        postcode: '44-444',
        street: 'zachlapana',
        house: 'zachlapany',
        flat: 'string',
        ip: 'string',
      },
      referer: 'UiTeH',
      sign: 'string',
    })
    

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://pay.cashbill.pl/ws/rest/payment/:shopId',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Fragment>
      {cartIsEmpty && (
        <div>
          {'Your '}
          <Link href="/cart">cart</Link>
          {' is empty.'}
          {typeof productsPage === 'object' && productsPage?.slug && (
            <Fragment>
              {' '}
              <Link href={`/${productsPage.slug}`}>Continue shopping?</Link>
            </Fragment>
          )}
        </div>
      )}
      {!cartIsEmpty && (
        <div className={classes.items}>
          <div className={classes.header}>
            <p>Products</p>
            <div className={classes.headerItemDetails}>
              <p></p>
              <p className={classes.quantity}>Quantity</p>
            </div>
            <p className={classes.subtotal}>Subtotal</p>
          </div>

          <ul>
            {cart?.items?.map((item, index) => {
              if (typeof item.product === 'object') {
                const {
                  quantity,
                  product,
                  product: { price, title, meta },
                  subtotal = Number(price) * quantity,
                } = item

                if (!quantity) return null

                const metaImage = meta?.image

                return (
                  <Fragment key={index}>
                    <CheckoutItem
                      product={product}
                      title={title}
                      metaImage={metaImage}
                      quantity={quantity}
                      index={index}
                      price={price}
                      subtotal={subtotal}
                    />
                  </Fragment>
                )
              }
              return null
            })}
            <div className={classes.orderTotal}>
              <p>Order Total</p>
              <p>{totalAmount}</p>
            </div>
          </ul>
        </div>
      )}

      {!cartIsEmpty && (
        <>
          <form className={classes.sections}>
            <div className={classes.shippingSection}>
              <h3 className={classes.shipping}>Shipping Details</h3>
              <ShippingDetails />
            </div>
            <div className={classes.paymentSection}>
              <h3 className={classes.payment}>Payment Methods</h3>
              <PaymentMethods method={method} setMethod={setMethod} />
            </div>
          </form>
          <CustomCheckoutForm />
          {method}
        </>
      )}
    </Fragment>
  )
}
