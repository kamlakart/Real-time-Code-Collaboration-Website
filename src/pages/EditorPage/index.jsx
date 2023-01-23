import React, { useState, useEffect } from 'react'
import './index.css'
import Logo from '../../components/Logo'
import UserCard from '../../components/UserCard';
import {io} from 'socket.io-client';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import Editor from '../../components/Editor';
import ACTIONS from '../../Actions';
const socket = io('ws://localhost:5000');
const EditorPage = () => {
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
      const init = () => {
        socket.on('connect_error', (err) => handleErrors(err));
        socket.on('connect_failed', (err) => handleErrors(err));
        function handleErrors(e) {
          console.log('socket error ', e);
          toast.error('Socket connection failed, try again later.');
          reactNavigator('/');
        }
        socket.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
        })
        socket.on(ACTIONS.JOINED, ({clients, username, socketId}) =>{
          if(username!==location.state?.username)
          {
            toast.success(`${username} joined the Room.`);
          }
          setUser(clients);
        })
        socket.on(ACTIONS.DISCONNECTED, ({socketId, username}) => {
          toast.success(`${username} left the Room.`);
          setUser((prev) => {
            return prev.filter((user) => user.socketId!==socketId);
          });
        })
      };
      init();
      return () => {
        socket.off('connect_error');
        socket.off('connect_failed');
        socket.off(ACTIONS.JOINED);
        socket.off(ACTIONS.DISCONNECTED);
        // socket.disconnect();
      }
  }, [])

  const handleCopyRoom = () => {
    navigator.clipboard.writeText(roomId);
    toast.success('Room ID Copied');
  }
  const handleLeaveRoom = () => {
    socket.disconnect();
    reactNavigator('/');
  }
  if(!location.state)
  {
    return <Navigate to='/' />;
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
                <Editor socket={socket} roomId={roomId} />
        </div>
      </div>
    </div>
  )
}

export default EditorPage