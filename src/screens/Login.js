import React, {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {

  const[credentials, setcredentials] = useState({email:"", password:""}) 
  let navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();                     // it is a synthetic event...important.
        console.log(JSON.stringify({email:credentials.email, password:credentials.password}))
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const jsl = await response.json()
        console.log(jsl);

        if(!jsl.success){
            alert("Enter valid credentials");
        }

        if(jsl.success){
          localStorage.setItem("userEmail", credentials.email);
          localStorage.setItem("authToken",jsl.authToken);
          console.log(localStorage.getItem("authToken"));
          navigate("/");
      }
    }
    const onChange = (event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

  return (
    <>
    <div><Navbar/> </div>
    <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form style={{marginTop:"3rem"}} onSubmit={handleSubmit}>
        <h3 style={{color:"rgb(225, 21, 59)", fontWeight:"bold"}}>Login Here</h3>

        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" name='email' placeholder="Enter your Email" value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>

        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" placeholder="Password" name="password" value={credentials.password} id="exampleInputPassword1" onChange={onChange} />

        <button type='submit' className = " btn2 bg-danger" style={{marginTop:"5rem", borderRadius:"20px"}}>Log In</button>
    </form>
  
    </>
 )
}
