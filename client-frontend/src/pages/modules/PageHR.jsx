import React from 'react'
import { useLocation } from 'react-router-dom'

const PageHR = () => {
    const location = useLocation()
  return (
    <div>
      {location.pathname === '/hr' ? (<div>Dashboard here</div>) : '' }
    </div>
  )
}

export default PageHR
