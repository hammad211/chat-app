import './App.css';
import React from 'react';
import Chat from './chats/Chat';
import NotFound from './chats/Found';
import Landing from './chats/landingpage';
import Menu from './chats/Menu';
import Login from './chats/Login';
import Register from './chats/Signup';
import Sockets from './chats/sockets';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  return (
    <div>
   <ToastContainer />
    <Router>
    <ToastContainer />
    <Menu/> 
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/chats/Chat" element={<Chat />}/>  
      <Route path="/chats/Login" element={<Login />}/>
      <Route path="/chats/Signup" element={<Register/>}/>
      <Route path="/Chats/sockets" element={<Sockets />}/>
      <Route path="/Chats/Found" element={<NotFound />}/>
      <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;

