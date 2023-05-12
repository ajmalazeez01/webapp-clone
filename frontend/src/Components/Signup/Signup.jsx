import React, { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import Swal from "sweetalert2";
import axios from "axios";
import "./Signup.css";

function Signup() {
	const [errors, setErrors] = useState({})
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const validation = ()=>{
	if(fname===""){
		setErrors({fname:"Please enter valid name!!"})
	} else if(!/^[A-Za-z\s]*$/.test(fname)){
		setErrors({fname:'Username should only contain alphabets and space'})
	} else if(lname === ""){
		setErrors({lname:"Please enter valid name!!"})
	} else if(!/^[A-Za-z\s]*$/.test(lname)){
		setErrors({lname:'Username should only contain alphabets and space'})
	} else if(email === ""){
		setErrors({email: "Email required....!"})
	}else if(
		!String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
	)
	{
        setErrors({email: "invalid Email...!"})
	}else if (password==="") {
		setErrors({password:'Password required..!'})
	  }else if (password.length < 4) {
		setErrors({password:'Password should have atleast 4 characters..!'})
	  } else{
		setErrors(false)
	  }
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
	validation()
    console.log("kguig");
    try {
      if(!errors){
     await axios.post(
          "http://localhost:2000/signup",
          {
            fname,
            lname,
            email,
            password,
          },
          {
            withCredentials: true,
          }
        ).then((res)=>{
        if(res.data.status === false){
            Swal.fire({
              title: "Oops!",
              text: "This email is already registered.",
              icon: "error",
              confirmButtonText: "Ok"
            });
        }else{
          Swal.fire({
            title: "Success!",
            text: "Your email has been registered.",
            icon: "success",
            confirmButtonText: "Ok"
          }).then(()=>{
            navigate('/login')
          })
          
        }
        })
  
       
      }
    
      
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="white_btn">
              Sing in
            </button>
          </Link>
        </div>
        <div className="righ">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
			  onKeyUp={validation}
              onChange={(e) => {
                setFname(e.target.value);
              }}
              value={fname}
              required
              className="input"
            />
			<br/>
			<p className='error_msg'>{errors.fname}</p>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={(e) => {
                setLname(e.target.value);
              }}
			  onKeyUp={validation}
              value={lname}
              required
              className="input"
            />
			<br/>
			<p className='error_msg'>{errors.lname}</p>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
			  onKeyUp={validation}
              value={email}
              required
              className="input"
            />
			<br/>
			<p className='error_msg'>{errors.email}</p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
			  onKeyUp={validation}
              value={password}
              required
              className="input"
            />
			<br/>
			<p className='error_msg'>{errors.password}</p>
            
            <button type="submit" className="green_btn">
              Sing Up
            </button>
          </form>
      <ToastContainer/>  
        </div>
      </div>
    </div>
  );
}

export default Signup;
