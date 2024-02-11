'use client'

import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'
import { useAuth } from '../../../_providers/Auth'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  const { user } = useAuth()
  
  return (
    <div>
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>
            {`Your payment was successful but there was an error processing your order. Please contact us to resolve this issue.`}
          </p>
          <div className={classes.actions}>
            <Button href="/account" label="View account" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="View all orders"
              appearance="secondary"
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Thank you for your order!</h1>
          <p>
            {`Your order has been confirmed. You will receive an email confirmation shortly. Your order ID is ${orderID}.`}
          </p>
          <div className={classes.actions}>
          {user && (
            <>
              <Button href={`/orders/${orderID}`} label="View order" appearance="primary" />
              <Button
                    href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
                    label="View all orders"
                    appearance="secondary" 
              />
            </>
          )}
          {!user && (
            <>
              <Button
                    href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products`}
                    label="Back To Shop"
                    appearance="secondary" 
              />
            </>
          )}
          </div>
        </Fragment>
      )}
    </div>
  )
}
