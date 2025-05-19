"use client"

import React from 'react'
import Providers from './providers'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>{children}</Providers>
  )
}

export default HomeLayout
