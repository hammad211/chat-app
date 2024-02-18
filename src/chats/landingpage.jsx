import React from 'react';
import './assets/css/style.css'
import { Outlet, Link } from "react-router-dom";
import {toast} from 'react-toastify'
import axios from 'axios'

const Landing = () => {
    const [name, setName] = React.useState([]);
    const [email, setEmail] = React.useState([])
    const [subject, setSubject] = React.useState([])
    const [message, setMessage] = React.useState([])
    return ( 
<>
  <section id="hero" class="d-flex align-items-center">
    <div class="container position-relative" data-aos="fade-up" data-aos-delay="500">
      <h1>Welcome to Chat</h1>
      <Link to='/chats/Chat' class="btn-get-started scrollto">Get Started</Link>
      <Outlet/>
    </div>
  </section>

  <main id="main">
    <section id="contact" class="contact">
      <div class="container">

        <div class="section-title">
          <span>Contact</span>
          <h2>Contact</h2>
        </div>

        <div class="row" data-aos="fade-up">
          <div class="col-lg-6">
            <div class="info-box mb-4">
              <i class="bx bx-map"></i>
              <h3>Our Address</h3>
              <p>Lahore, Pakistan</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="info-box  mb-4">
              <i class="bx bx-envelope"></i>
              <h3>Email Us</h3>
              <p>hammad6991515@gmail.com</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="info-box  mb-4">
              <i class="bx bx-phone-call"></i>
              <h3>Call Us</h3>
              <p>+92 332-699-1515</p>
            </div>
          </div>

        </div>

        <div class="row" data-aos="fade-up">
          <div class="col-lg-6">
            <div  class="php-email-form">
              <div class="row">
                <div class="col-md-6 form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Your Name"  required onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required onChange={(e)=>setEmail(e.target.value)}/>
                </div>
              </div>
              <div class="form-group mt-3">
                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject"  required onChange={(e)=>setSubject(e.target.value)}/>
              </div>
              <div class="form-group mt-3">
                <textarea class="form-control" name="message" rows="5" placeholder="Message"  required onChange={(e)=>setMessage(e.target.value)}></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center"><button type="submit" onClick={(e)=>{
                        axios.post('http://localhost:5000/contact/contact',{name,email,subject,message})
                        .then((res)=>{
                          toast.success(res.data,{
                            position:toast.POSITION.TOP_LEFT
                          });
                          setMessage("");
                          setEmail("");
                          setName("");
                          setSubject("");
                        }).catch((err)=>{
                            console.log(err);
                            toast.error(err.response.data,{
                              position:toast.POSITION.TOP_LEFT
                            });
                        })
                    }}>Send Message</button></div>
            </div>
          </div>

        </div>

      </div>
    </section>

  </main>

      </>
     );
}
 
export default Landing;
