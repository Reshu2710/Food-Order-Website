import React from 'react';
import {Link,useNavigate} from "react-router-dom";      // mx means margin left and me means margin right
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useState } from 'react';
import { useCart } from './ContextReducer';

export default function Navbar() {

  const [cartView, setCartView] = useState(false);
  let data = useCart();
const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container-fluid">.
  <img src={require("./hamburger.png")} style={{height:"50px", marginRight:"20px"}}/>
    <Link className="navbar-brand fs-1 fst-italic" to="#">Foodito</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken")) ?
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
        </li>
        :""}
      </ul>

      {(!localStorage.getItem("authToken")) ?
      <div className='d-flex'>
          <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>       
          <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
      </div>
      :

      <div>
      <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>My Cart{" "}
      <Badge pill bg="danger">{data.length}</Badge>
      </div>
      {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
      <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout
      </div>
      </div>
      }
    </div>
  </div>
</nav>
    </div>
  )
}
