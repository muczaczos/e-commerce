import React from 'react'

import { RadioButton } from '../../../../_components/Radio'

import classes from './index.module.scss'
import { Media } from '../../../../_components/Media'
import { HR } from '../../../../_components/HR'

const PaymentMethods = () => {
  const [paymentMethod, setPaymentMethod] = React.useState('')

  const handlePaymentMethod = (value: string) => setPaymentMethod(value)

  return (
    <div className={classes.paymentOptions}>
      <RadioButton
        label="Bank Trafser"
        value="transfer"
        isSelected={paymentMethod === 'transfer'}
        onRadioChange={handlePaymentMethod}
        groupName="method"
      />
      <HR></HR>
      <RadioButton
        label="Payment Gateway"
        value="gateway"
        isSelected={paymentMethod === 'gateway'}
        onRadioChange={handlePaymentMethod}
        groupName="method"
      />
      <HR></HR>
       <RadioButton
        label="Cryptocurrency ETH"
        value="eth"
        isSelected={paymentMethod === 'eth'}
        onRadioChange={handlePaymentMethod}
        groupName="method"
      />
    </div>
  )
}

export default PaymentMethods
