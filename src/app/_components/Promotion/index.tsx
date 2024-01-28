import React from 'react'

import classes from './index.module.scss'

export const Promotion = () => {
  return <section className={classes.promotion}>
    <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the Month</h3>
        <p>
            Get ready for a shopping experience like never before
            with our Deals of the Month! Every purchase comes with
            exlusive perks and offers, makingn this month a
            celebration of savvy choices and amazing deals. Don't miss out! 
        </p>
    </div>
  </section>
}
