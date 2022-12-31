import React from 'react'
import Avatar from 'react-avatar'
import './index.css'

const UserCard = ({username}) => {
  return (
    <div className='usercard'>
        <Avatar name={username} size={50} round="14px" />
        <span className='username'>{username}</span>
    </div>
  )
}

export default UserCard