import React from 'react'

import { HR } from '../../../../_components/HR'
import { Media } from '../../../../_components/Media'
import { RadioButton } from '../../../../_components/Radio'

import classes from './index.module.scss'

const PaymentMethods = ({
  method,
  setMethod,
}) => {
  const handlePaymentMethod = (value: string) => {
    setMethod(value)
  }

  return (
    <div className={classes.paymentOptions}>
      <RadioButton
        label="Bank Trafser"
        value="transfer"
        isSelected={method === 'transfer'}
        onRadioChange={handlePaymentMethod}
        groupName="method"
      />
      <HR></HR>
      <RadioButton
        label="Payment Gateway"
        value="gateway"
        isSelected={method === 'gateway'}
        onRadioChange={handlePaymentMethod}
        groupName="method"
      />
      <HR></HR>
      <RadioButton
        label="Cryptocurrency ETH"
        value="eth"
        isSelected={method === 'eth'}
        onRadioChange={handlePaymentMethod}
        groupName="method"
      />
    </div>
  )
}

export default PaymentMethods
