'use client'

import React, { Fragment, useEffect } from 'react'
import axios from 'axios'
import { sha1 } from 'js-sha1'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Order, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { priceFromJSON } from '../../../_components/Price'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import { useTheme } from '../../../_providers/Theme'
import { CheckoutItem } from '../CheckoutItem'
import PaymentMethods from './PaymentMethods'
import ShippingDetails from './ShippingDetails'
import ShippingMethods from './ShippingMethods'

import classes from './index.module.scss'

export const CheckoutPage: React.FC<{
  settings: Settings
}> = props => {
  const {
    settings: { productsPage },
  } = props

  const { user } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [clientSecret, setClientSecret] = React.useState()
  const hasMadePaymentIntent = React.useRef(false)
  const { theme } = useTheme()

  const [fullName, setFullName] = React.useState()
  const [address, setAddress] = React.useState()
  const [city, setCity] = React.useState()
  const [postalCode, setPostalCode] = React.useState()
  const [phone, setPhone] = React.useState()
  const [country, setCountry] = React.useState()
  const [email, setEmail] = React.useState()
  const [method, setMethod] = React.useState()
  const { cart, cartIsEmpty, cartTotal, totalAmount } = useCart()

  const handleSubmit = async () => {
    //console.log('dupa')
    if (method === 'gateway') {
      //console.log('1')
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
          //console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          //console.log('dupa')
        })
    } else if (method === 'transfer') {
      //console.log('1')
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
            fullname: fullName,
            streetAddress: address,
            city: city,
            postalCode: postalCode,
            country: country,
            phoneNumber: phone,
            email: email,
            price:
              typeof product === 'object' ? priceFromJSON(product.priceJSON, 1, true) : undefined,
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
      //console.log('end transfer')
    } else if (method === 'eth') {
      //console.log('dupa eth')
    }
  }

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

  return (
    <Fragment>
      {!cartIsEmpty && (
        <>
          <div className={classes.sections}>
            <ShippingDetails
              setFullName={setFullName}
              setAddress={setAddress}
              setCity={setCity}
              setPostalCode={setPostalCode}
              setCountry={setCountry}
              setPhone={setPhone}
              setEmail={setEmail}
            />
            <PaymentMethods method={method} setMethod={setMethod} />
          </div>
          <ShippingMethods />
        </>
      )}
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
      <div className={classes.buttons}>
        <Button label="Back to cart" href="/cart" appearance="secondary" />
        <Button onClick={handleSubmit} label="Place the Order" appearance="primary" />
      </div>
    </Fragment>
  )
}
