import React from 'react'

import classes from './index.module.scss'
import { usePathname } from 'next/navigation'
import { noHeaderFooterUrls } from '../../../constants'

const FooterComponent = () => {
    const pathname = usePathname();

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? 
    classes.hide : ''}>
       
    </footer>
  )
}

export default FooterComponent