import React, { useContext, useEffect, useState } from 'react'
import LeftChat from './LeftChat'
import RightChat from './RightChat'
import { chatContext } from '../../context/chatContex'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { isLastmessages, isSameSender } from '../Config/ChatConfig'
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:1000';
let socket , selectedChatCompare;

function Chat({selectedUsers}) {
  const {  messages, fetchMessages } = useContext(chatContext)

  // const [messages, setMessages] = useState([]);
  const {user:loggedUser} = useContext(AuthContext)
  const [socketConnected , setSocketConnected] = useState(false)
  // const [roomID, setRoomID] = useState(null);
  const logUser = loggedUser.id
  console.log("logged user id",logUser)
  const selID =selectedUsers._id 
  console.log("selected id" ,selID)
  const [socket, setSocket] = useState(null); 
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false); // Initialize socket state

  // useEffect(() => {


  //   const socket = io(ENDPOINT);
  //   socket.on('connect', () => {
  //     console.log('Socket connected');
  //   });
  //   socket.on('new message', (data) => {
  //     console.log('New message received:', data);
  //     if (data.chatId === selectedUsers) {
  //       setMessages((prevMessages) => [...prevMessages, data]);
 
  //         // Force re-render
  //     }
  //   },)
  //   return () => {
  //     socket.disconnect();
  //   };
    
  // },[] );

  // useEffect(() => {
  //   if (socketConnected &&!initialDataLoaded) {
  //     fetchMessages();
  //     setInitialDataLoaded(true); // Mark initial data as loaded
  //   }
  // }, [socketConnected, initialDataLoaded]);

  // const fetchMessages = async () => {
  //   try {
  //     const {data: response} = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/message/${selectedUsers._id}`);
  //     setMessages(response);
  //     console.log("chat", response)
  //     // setMessages((prevMessages) => [...prevMessages, response]);
    
     
  //   } catch (error) {
  //     console.error('Failed to fetch messages:', error);
  //   }
  // };



 




  return (
  <>
   {/* <div class=" my-4   ">
 <div class="flex  items-baseline  flex-col mb-2 ">
          <LeftChat  messages={messages}  loggeduser={logUser} />
        </div>
        <div class="flex items-end flex-col mb-4">
       <RightChat  messages={messages}  loggeduser={logUser}    />
        </div>
      

    </div> */}


    {
      messages.map((m, i) =>(
        <div key={m._id} className={`flex items-baseline ${m.sender?._id === logUser ? 'justify-end' : 'justify-start'} mb-2`}>
        <p className={`p-2 rounded ${m.sender?._id === logUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{m.content}</p>
      </div>
      ))
    }
    {/* {messages.map((m, i) =>(

          
<div key={m._id} class="flex  items-baseline  flex-col mb-2 ">
    {
      (isSameSender(messages , m ,i , logUser)) ||
      (isLastmessages(messages ,i , logUser))
      && (
        <p>{m.sender.name}</p>
      )
    }
</div>
)  )
} */}
  </>
  )
}

export default Chat