import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
    const[credentials, setcredentials] = useState({name:"", email:"", password:"", geolocation:""}) 

    const handleSubmit = async(e)=>{
        e.preventDefault();                     // it is a synthetic event...important.
        console.log(JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation}))
        const response = await fetch("http://localhost:5000/api/createuser", {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        });
        const jsl = await response.json()
        console.log(jsl);

        if(!jsl.success){
            alert("Enter valid credentials");
        }
    }
    const onChange = (event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

  return(
    <>
    <div><Navbar/> </div>
    <div className='background'>
    <form onSubmit={handleSubmit} style={{marginTop:"3rem"}}>
  <div>
    <label htmlFor="name">Name</label>
    <input className="input1" type="text" name='name' value={credentials.name} onChange={onChange} />
  </div>
  <div>
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input className="input1"type="email" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
  </div>
  <div>
    <label htmlFor="exampleInputPassword1">Password</label>
    <input className="input1"type="password" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange} />
  </div>
  <div>
    <label htmlFor="exampleInputPassword1">Address</label>
    <input className="input1"type="text" name='geolocation' value={credentials.geolocation} id="exampleInputPassword1" onChange={onChange} />
  </div>
  <button type="submit" className="m-3 btn btn-success" style={{width:"120px", height:"35px", textAlign:"center", borderRadius:"20px"}}>SignIn</button>
  <Link to="/login" className="m-3 btn btn-danger" style={{borderRadius:"20px"}}>Already a User</Link>
</form>
</div>
    </>
  )
}
