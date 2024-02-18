import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Sockets = () => {
  const [myname, setMyname] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(); // Connect to the Socket.io server
    setSocket(socket);

    socket.on('send name', (username) => {
      addNameToChat(username);
    });

    socket.on('send message', (chat) => {
      addMessageToChat(chat);
      
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const addNameToChat = (username) => {
    const nameElement = (
      <p
        key={chatMessages.length} // Use a unique key for React elements
        style={{
          backgroundColor: 'grey',
          width: '100%',
          textAlign: 'center',
          color: 'white',
        }}
      >
        {username}:
      </p>
    );
    setChatMessages([...chatMessages, nameElement]);
  };

  const addMessageToChat = (chat) => {
    const messageElement = (
      <p key={chatMessages.length}>{chat}</p>
    );
    setChatMessages([...chatMessages, messageElement]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      if (myname.trim() !== '') {
        socket.emit('send name', myname);
      }
      socket.emit('send message', message);
      setMessage('');
    }
  };
  console.log(message);
  console.log(chatMessages);


  return (
    <div>
      <h1 className="font-bold text-green-500 text-3xl text-center mt-5">
        GeeksforGeeks
      </h1>
      <div>
        <h2 className="font-semibold text-xl text-center mt-5" id="logo">
          Chat App using Socket.io
        </h2>
      </div>
      <form className="flex flex-col justify-center items-center mt-5" onSubmit={handleSubmit}>
        <input
          className="border border-gray-400 rounded-md mt-5 p-1"
          type="text"
          placeholder="Name"
          value={myname}
          onChange={(e) => setMyname(e.target.value)}
        />
        <input
          className="border border-gray-400 rounded-md mt-5 p-1"
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-500 rounded-md p-2 text-white mt-5" type="submit">
          Send
        </button>
      </form>
      <div className="flex flex-col justify-center items-center mt-5" id="messageArea">
        {chatMessages}
      </div>
    </div>
  );
};

export default Sockets;
