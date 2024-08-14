import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
export const chatContext = createContext();

export const ChatContextProvider = (props) => {
    const [searchResults, setSearchResults] = useState([]);
    const [chats ,setChats] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isFetchingMessages, setIsFetchingMessages] = useState(false);
    // const [selectedUsers, setSelectedUsers] = useState(null);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const ENDPOINT = 'http://localhost:1000';
        if (selectedUsers && selectedUsers._id) {
          
        const socket = io(ENDPOINT);
        setSocket(socket);
    
        socket.on('connect', () => {
          console.log('Socket connected');
        
        });
    
        socket.on('new message', (data) => {
          console.log('New message received:', data);
          // Optionally, update messages state here if you want to append the new message directly
          setMessages((prevMessages) => [...prevMessages, data]);
        });
    
        return () => {
          socket.disconnect();
        };
    }
      },[selectedUsers , socket]);
      const fetchMessages = async () => {
        setIsFetchingMessages(true);
        try {
          const { data: response } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/message/${selectedUsers._id}`);
          setMessages(response);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
        finally {
          setIsFetchingMessages(false);
        }
      };
    
      useEffect(() => {
        if (selectedUsers &&!isFetchingMessages) {
          fetchMessages();
        }
      }, [selectedUsers, socket, isFetchingMessages]);
    return (
        <chatContext.Provider value={{
            searchResults,
            setSearchResults,
            messages, setMessages, fetchMessages,
            selectedUsers, setSelectedUsers,
            chats ,setChats,socket 
        
        }}>
            {props.children}
        </chatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(chatContext);
};