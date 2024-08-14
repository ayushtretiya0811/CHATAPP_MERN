
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { io } from 'socket.io-client';
import { chatContext } from '../../context/chatContex';
function ChatInput({ selectedUsers  }) {
  const [message, setMessage] = useState('');
  // const ENDPOINT = 'http://localhost:1000';

const {fetchMessages ,socket } = useContext(chatContext)

  const sendMessage = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/message`, {
        content: message,
        chatId: selectedUsers._id, // Use the selectedUsers._id
      });
      console.log('Message sent:', response.data);
      // setMessage([...message, response.data])
      setMessage('');
      socket.emit('new message', {
        content: response.data.content,
        chatId: selectedUsers._id,
        users: selectedUsers.users,
      });
      await fetchMessages();
      // socket.emit('update-messages', selectedUsers._id);
      // socket.emit("new message", {
      //   content: message,
      //   chatId: selectedUsers._id, // Ensure this matches the property name in your server
      //   users: selectedUsers.users, // Ensure this matches the property name in your server
      // });
       // Clear the input field
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
  return (
<>

<div className="r-input  flex flex-row flex-grow-0 justify-between bg-slate-300 p-3 sm:ps-4 rounded-2xl " >

  <input type="text" placeholder="Type your message"  value={message}
        onChange={(e) => setMessage(e.target.value)}  className='outline-none w-full bg-transparent '/>

  <button onClick={sendMessage}>

  <IoSend className='me-5 w-10 h-6' />
  </button>

</div>

</>
  )
}

export default ChatInput