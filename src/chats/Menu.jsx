import { Outlet, Link } from "react-router-dom";
import './assets/css/style.css'
const Menu = () => {
    return ( 
        <div>
<header id="header" class="d-flex align-items-center">
    <div className="container d-flex align-items-center justify-content-between">

      <h1 class="logo"><Link to='/'> Chat </Link></h1>
      <nav id="navbar" class="navbar">
        <ul>
        <li>   
       <Link   to="/" className = "link nav-link scrollto active">Home</Link>
       </li> 
       <li>
        <Link to="/chats/Chat" className="link nav-link scrollto active">
          Chat
        </Link>
        </li>
        <li>
        <Link  to="/chats/login" class = "link nav-link scrollto active" > Login</Link>
        </li>
        <li> 
        <Link to="/chats/Signup" className = "link nav-link scrollto active"  > Signup</Link>
        </li>
        </ul>
      </nav>
    </div>
  </header>
<Outlet/>


        </div>
     );
}
 
export default Menu;