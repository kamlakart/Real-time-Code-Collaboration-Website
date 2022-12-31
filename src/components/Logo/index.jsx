import React from 'react'
import logoimg from './logo.png';
import './index.css'
const Logo = () => {
  return (
    <div className='Logo-component'>
        <img src={logoimg} className="logo-img" alt="logo-icon" />
        <h2>COLLAB</h2>
    </div>
  )
}

export default Logo