import React from 'react';
import axios from 'axios'
import './Add.css';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");


const Add = () => {
    const [email, setEmail] = React.useState([]);
    const [name, setName] = React.useState([]);
    const [password, setPassword] = React.useState([]);
    const navigate = useNavigate();

    return ( 
        <>
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">Register!</h4>
            </div>
            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={e=>setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='name' onChange={e=>setName(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={e=>setPassword(e.target.value)}/>

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2"  onClick = {(e)=>{
                axios.post('http://localhost:5000/users/signup',{email,name,password}).then((res)=>{
              const { token } = res.data; 
              localStorage.setItem("token", JSON.stringify(token));  
                toast.success(res.data,{
                    position:toast.POSITION.TOP_LEFT
                  });
                    navigate("/chats/login");
                }).catch((err)=>{
                    console.log(err);
                    toast.error({
                      position:toast.POSITION.TOP_LEFT
                    });
                })
            }
                    
                }> Register </MDBBtn>
            </div>
          </div>
        </MDBCol>
        <MDBCol col='6' className="mb-5">
        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">We are more than just a company</h4>
              <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>



        </>


        
     );
}
 
export default Add;