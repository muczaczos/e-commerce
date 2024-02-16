'use client'

import React from 'react'

import { AuthProvider } from '../_providers/Auth'
import { CartProvider } from '../_providers/Cart'
import { FilterProider } from './Filter'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FilterProider>
          <CartProvider>{children}</CartProvider>
        </FilterProider>
      </AuthProvider>
    </ThemeProvider>
  )
}
