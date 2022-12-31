import React, { useState, useRef, useEffect } from 'react'
import './index.css'
import Logo from '../../components/Logo'
import UserCard from '../../components/UserCard';
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
import Editor from '../../components/Editor';
import { initSocket } from '../../Backend/socket';
import ACTIONS from '../../Backend/actions';
import { useLocation } from 'react-router-dom';


const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  useEffect(()=> {
    const init = async ()=> {
      socketRef.current = await initSocket();
      // socketRef.current.emit(ACTIONS.JOIN, {
      //   roomId,
      //   username: location.state?.username,
      // });
    }
    init();
  }, [])
  const [user, setUser] = useState([
    { socketId: 1, username: 'Kamlakar T' },
    { socketId: 2, username: 'Suryansh shukla' },
    { socketId: 3, username: 'Ramesh B' },
    { socketId: 4, username: 'Aman K' },
  ]);
  const navigate= useNavigate();
  const handleCopyRoom = () => {
    toast.success('Room ID Copied');
  }
  const handleLeaveRoom = () => {
    toast.success('Left Room');
    navigate('/');
  }
  return (
    <div>
      <div className="editorPage">
        <div className="leftside">
          <div className="upper-dvid">
            <div className="logowrapper">
              <Logo />
            </div>
            <div className="leftside-inner">
              <h3>Connected</h3>
              <div className="userphoto">
                {
                  user.map((u) =>
                    <UserCard key={u.socketId} username={u.username} />
                  )
                }
              </div>
            </div>
          </div>
          <div className="bottom-btns">
            <button className='cprid' onClick={handleCopyRoom}>Copy Room ID</button>
            <button className="leave-roombtn" onClick={handleLeaveRoom}>Leave Room</button>
          </div>
        </div>
        <div className="rightside">
                <Editor />
        </div>
      </div>
    </div>
  )
}

export default EditorPage