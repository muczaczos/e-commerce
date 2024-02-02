'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

import classes from './index.module.scss'

const CartItem = ({ product, title, metaImage, qty, price, addItemToCart }) => {
  const [quantity, setQuantity] = useState(qty)

  const decrementQty = () => {
    const updateQty = quantity > 1 ? quantity - 1 : 1

    setQuantity(updateQty)
    addItemToCart({ product, quantity: Number(updateQty) })
  }

  const incrementQty = () => {
    const updateQty = quantity + 1

    setQuantity(updateQty)
    addItemToCart({ product, quantity: Number(updateQty) })
  }
  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateQty = Number(e.target.value)
    
    setQuantity(updateQty)
    addItemToCart({ product, quantity: Number(updateQty) })
  }
  var subtotal = 0

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
          <h6>{title}</h6>
          {price}
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

          <input
            type="text"
            className={classes.quantityInput}
            value={quantity}
            onChange={enterQty}
          />

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
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
