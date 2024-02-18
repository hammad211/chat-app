import React, { useEffect, useState } from 'react';
import {Button} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Single from './Single';
import './Single.css'
import Clock from 'react-live-clock';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import {useNavigate} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import {toast} from 'react-toastify'
import Tooltip from '@mui/material/Tooltip';
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

const Chat = ({props}) => {
const mystyle = {
fontFamily: "Arial",
border: "1px solid black",
width: "300px",
display: "flex",
width: "100%",
height: "0.5vh",
};

const myComponent = {
    width: '100px',
    height: '100px',
    overflow: 'scroll'
};

const [user, setUser] = React.useState([])
const [message, setMessage] = React.useState([]);
const [name, setName] = React.useState([]);
const [email, setEmail] = React.useState([]);

const navigate = useNavigate();

const getUserData = () => {
axios.get('http://localhost:5000/index/addGet')
.then((res) => {
setUser(res.data);
console.log(res.data);
})
.catch((err) => {
console.log(err);
});    
};

const getMessageData = () => {
axios.get('http://localhost:5000/index/messageGet/')
.then((res) => {
setMessage(res.data);
console.log("message get is"+res.data);
})
.catch((err) => {
console.log(err);
});    
};

useEffect(() => {
getMessageData();
getUserData();
}, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isHovered, setIsHovered] = useState(false);


return (
<div style={{width:"208vh", }}>

<div class="body"  >
<div class="row clearfix" >
<div class="col-lg-14">
<div class="card chat-app" >

<div id="plist" className="people-list">
    <div class="input-group" >
    <div class="input-group-prepend">   
    <input type="text" class="form-control" placeholder="Search..."></input>
    </div>
    </div>
  <div className='scroll-user' style={{width:"300px"}}> 

{user.length === 0 ? (
<p>No user</p>
) : (
<ul className="list-unstyled chat-list mt-2 mb-0">
{user.map((item, index) => (
<li class="clearfix" key={item.id} style={{display:"inline-flex"}}> 

<div class="container">
<div class="overlay">
  <div class="text"><button  color="error"
            onClick={() => {
              axios.delete('http://localhost:5000/index/add/'+item._id) // Use item._id
                .then((res) => {
                  console.log(item._id); // Log the deleted item's ID
                  getUserData();
                })
                .catch((err) => {
                  console.log('Error deleting record:', err);
                })}
            }><i class="fa fa-trash" aria-hidden="true"></i></button></div>
  </div>
<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"></img>

<div class="about" style={{}}>
<div class="name"> {item.name}</div>
<div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>  

</div>                                     
</div>
<hr></hr>                    

</li>   
))}
</ul>
)}        
</div>  




<Tooltip title="Add New User">
<AddCircleOutlinedIcon
        style={{ fontSize: '40px' }}
        onClick={handleShow}
        title="Add User"
      />
      </Tooltip>
</div>

<div class="chat" style={{height:"80vh",}}>
    <div class="chat-header clearfix"  >
        <div class="row" >
            <div class="col-lg-6">
                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                </a>
                <div class="chat-about">
                    <h6 class="m-b-0">Aiden Chavez</h6>
                    <small>Last seen: 2 hours ago</small>
                </div>
            </div>
        <div class="col-lg-6 hidden-sm text-right">
            <a href="javascript:void(0);" class="btn btn-outline-secondary"><i class="fa fa-camera"></i></a>
            <a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-image"></i></a>
            <a href="javascript:void(0);" class="btn btn-outline-info"><i class="fa fa-cogs"></i></a>
            <a href="javascript:void(0);" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
        </div>
        </div>
    </div>

<div class="chat-history scroll " >
{message.length === 0 ? (
    <p>No user</p> 
):(   
<ul className="m-b-0">
  {message.map((item) => (
    <li className="clearfix" key={item._id}> {/* Use item._id instead of item.id */}
      <div className="message-data text-right">
       
      </div>
      <div style={{float:"right", }}> 
      <Button
            color="error"
            onClick={() => {
              axios.delete('http://localhost:5000/index/'+item._id) // Use item._id
                .then((res) => {
                  console.log(item._id); // Log the deleted item's ID
                  getMessageData();
                })
                .catch((err) => {
                  console.log('Error deleting record:', err);
                })}
            }><span><i class="fa fa-trash" aria-hidden="true"></i></span>       
           </Button>
           </div>
      <div className="message other-message float-right" style={{maxWidth:"800px"}}>
        {item.message}
      
           <small className="message-data-time" style={{marginTop:"12px", float:"right"}}>
            <Clock format={'HH:mm'} ticking={true} timezone={'US/Pacific'} /></small>
           
            </div>
            </li>
  ))}
</ul>
     
)}
</div>  

</div>
</div>
</div>
</div>
<Single onPost={getMessageData} />

</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
        type="text"
        className="form-control"
        placeholder="Enter name..."
        rows={2}
        onChange={(e) => setName(e.target.value)}/>
        <hr></hr>
         <input
        type="text"
        className="form-control"
        placeholder="Enter email..."
        rows={2}
        onChange={(e) => setEmail(e.target.value)}/>   

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>{
                        axios.post('http://localhost:5000/index/add',{name,email},{headers:{Authorization:JSON.parse(localStorage.getItem("token"))}}).then((res)=>{
                          toast.success(res.data,{
                            position:toast.POSITION.TOP_LEFT
                          });
                          handleClose();
                          getUserData();
                        }).catch((err)=>{
                            console.log(err);
                            toast.error(err.response.data,{
                              position:toast.POSITION.TOP_LEFT
                            });
                        })
                    }
                  }
                >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
</div>



);
}

export default Chat;