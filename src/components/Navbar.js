import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
  return (
    <div 
        className='bg-dark w-100 text-white text-center p-3 fs-3 fw-bold'
        onClick={()=>{navigate('/')}}
    >
        Invoice Generator
    </div>
  )
}
