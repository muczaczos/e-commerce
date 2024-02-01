'use client'

import React, { useState } from 'react'

import classes from './index.module.scss'

const CartItem = ({ product, title, metaImage, qty, price, addItemToCart }) => {
  const [quantity, setQuantity] = useState(qty)

  const decrementQty = () => {}
  const incrementQty = () => {}
  const enterQty = () => {}

  return (
    <li className={classes.item}>
      <h6>TITLE</h6>
    </li>
  )
}

export default CartItem
