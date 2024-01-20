'use client' //you must use this directive when you wanna use 'pathname'

import React from 'react'
import Image from 'next/image'
import  Link  from 'next/link'
import { usePathname } from 'next/navigation'

import { Header } from '../../../../payload/payload-types'
import { noHeaderFooterUrls } from '../../../constants'
import { Gutter } from '../../Gutter'
import { HeaderNav } from '../Nav'

import classes from './index.module.scss'

const HeaderComponent = ({ header }: { header: Header}) => {
  const pathname = usePathname()

  return (
    <nav //add class 'hide' when noHeaderFooterUrls includes proper pathname
        className={[classes.header, noHeaderFooterUrls.includes(pathname) && classes.hide] 
        .filter(Boolean) //change array string to string and join space to it
        .join(' ')}> 
       <Gutter className={classes.wrap}>
            <Link href="/">
                <Image src="/logo-black.svg" alt="logo" width={170} height={50} />
            </Link>
            <HeaderNav header={header} />
        </Gutter> 
    </nav>
  )
}

export default HeaderComponent