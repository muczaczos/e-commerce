'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

import classes from './index.module.scss'

const CartItem = ({ product, title, metaImage, qty, price, addItemToCart, sub }) => {
  const decrementQty = () => {
    if (qty > 1) {
      qty = qty - 1
      sub = sub - Number(price)
    } else {
      sub = Number(price)
      qty = 1
    }
    addItemToCart({ product, quantity: Number(qty) })
  }

  const incrementQty = () => {
    qty = qty + 1
    sub = sub + Number(price)

    addItemToCart({ product, quantity: Number(qty) })
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    qty = Number(e.target.value)
    sub = qty * price

    addItemToCart({ product, quantity: Number(qty) })
  }

  return (
    <li key={title} className={classes.item}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>${price}
        </div>

        <div className={classes.quantity}>
          <div className={classes.quantityButton} onClick={decrementQty}>
            <Image
              src="/assets/icons/minus.svg"
              alt="minus"
              width={24}
              height={24}
              className={classes.quantityBtn}
            />
          </div>

          <input type="text" className={classes.quantityInput} value={qty} onChange={enterQty} />

          <div className={classes.quantityButton} onClick={incrementQty}>
            <Image
              src="/assets/icons/plus.svg"
              alt="plus"
              width={24}
              height={24}
              className={classes.quantityBtn}
            />
          </div>
        </div>
      </div>

      <div className={classes.subtotalWrapper}>
        ${sub}
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
