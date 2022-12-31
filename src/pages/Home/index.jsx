import React, {useState} from 'react'
import './index.css'
import Logo from '../../components/Logo';
import {v4 as uuidV4} from 'uuid';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast'
const Home = () => {
  const [roomId, changeRoomId] = useState('');
  const [username, changeUsername] = useState('');
  const navigate = useNavigate();
  const createNewRoom = (e) => {
    e.preventDefault();
    const id=uuidV4();
    changeRoomId(id);
    toast.success('Created a new room');
  }
  const joinRoom = () => {
    if(!roomId || !username)
    {
      toast.error('Username & Room-Id is required');
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  }
  const handleEnterKey = (e) => {
    if(e.code==='Enter')
    {
      joinRoom();
    }
  }
  return (
    <div>
      <div className="loginContainer">
        <div className="loginBox">
          <div className="logo-container">
            <Logo />
          </div>
          <h3 className='join-room-txt'>JOIN ROOM</h3>
          <div className="loginBox-inputs">
            <input 
            type="text" 
            placeholder='NAME'
            value={username} 
            onChange={(e)=> changeUsername(e.target.value)}
            onKeyUp={handleEnterKey}
            />
            <input 
            type="text" 
            placeholder='ROOM ID' 
            value={roomId} 
            onChange={(e)=> changeRoomId(e.target.value)} 
            onKeyUp={handleEnterKey}
            />
          </div>
          <button className="join-btn" onClick={joinRoom} >Join</button>
          <h4 className='create-room-txt'>
            Create <a onClick={createNewRoom} href="/editor/" >New room</a>
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Home