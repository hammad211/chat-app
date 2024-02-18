import React, { useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Single.css';

const Single = (props) => {
    const [message, setMessage] = React.useState([]);
    const { onPost } = props;
    const handleMessage = () =>{
        axios
        .post('http://localhost:5000/index/message', { message })
        .then((res) => {
          console.log('post message request sent');
          onPost();
          setMessage("");

        })
        .catch((err) => {
          console.log(err);
        });
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevents the newline character from being added to the input
          handleMessage();
        }
      };    
    return (
    <div >
    <div style={{width:"1200px",float:"right", marginleft:"-20px",  display:"inline-flex"  }} >
   
    <Button
    className="input-group-text"
    variant="contained"
    onClick={handleMessage}
    disabled={message.length === 0}>

    <i className="fa fa-send"></i>
    </Button>
    <textarea
        type="text"
        className="form-control"
        aria-multiline="true"
        placeholder="Enter text..."
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}/>
    </div>
    </div>
    );
    }
  export default Single;