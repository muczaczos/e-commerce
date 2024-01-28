'use client'

import React, { useState, useEffect } from 'react';
import classes from './index.module.scss';

export const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(calculateRemainingTime());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  function calculateRemainingTime() {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Dodaj 7 dni w milisekundach

    const timeDifference = nextWeek.getTime() - now.getTime();
    const daysRemaining = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const hoursRemaining = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutesRemaining = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const secondsRemaining = Math.floor((timeDifference % (60 * 1000)) / 1000);

    return {
      days: daysRemaining,
      hours: hoursRemaining,
      minutes: minutesRemaining,
      seconds: secondsRemaining,
    };
  }

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals of the Month! Every purchase comes with exclusive perks and offers, making this month a celebration of savvy choices and amazing deals. Don't miss out! 🎁 🧺
        </p>

        <ul className={classes.stats}>
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
);

export default Promotion;
