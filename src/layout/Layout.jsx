import React from 'react'
import { NavBar } from '../components/NavBar'

export const Layout = ({children}) => {
  return (
    <div className='layout'>
        <NavBar/>
        {children}
    </div>
  )
}
