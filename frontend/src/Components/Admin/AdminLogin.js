import React,{useState} from 'react'
import './admin.css'
import { Link ,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"
function AdminLogin() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
   
    const [password, setPassword] = useState("");
    const validation = () => {
        if (email === "") {
          setErrors({ email: "Email required....!" });
        } else if (
          !String(email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          setErrors({ email: "invalid Email...!" });
        } else if (password === "") {
          setErrors({ password: "Password required..!" });
        } else if (password.length < 4) {
          setErrors({ password: "Password should have atleast 4 characters..!" });
        } else {
          setErrors(false);
        }
      };
      const handleSubmit = async (e)=>{
        e.preventDefault();
        validation();
        try {
          if (!errors) {
              await axios.post("http://localhost:2000/admin/login",{
                email,
                password,
              },
              {
                withCredentials: true,
              }
              ).then((res)=>{
                console.log(res.data);
                if(res.data.created === true){
                  Swal.fire({
                            title: "Success!",
                            text: " login Success! ",
                            icon: "success",
                            confirmButtonText: "Ok",
                          }).then(() => {
                            navigate("/adminHome");
                          });
                }else if(res.data.status === false){
                  Swal.fire({
                            title: "Oops!",
                            text: "Invalid Credentials",
                            icon: "error",
                            confirmButtonText: "Ok",
                          });
                }
              })
          }
          
        } catch (error) {
          console.log(error);
        }
        
      }
  return (
 
       <div className="login_container">
      <div className="login_form_container">
        <div className="lleft">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
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
              className="iinput"
            />
            <p className="error_msg">{errors.email}</p>
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
              className="iinput"
            />
            <br />
            <p className="error_msg">{errors.password}</p>
           
            <button type="submit" className="ggreen_btn">
              Sing In
            </button>
          </form>
        </div>
        <div className="rrright">
          <h1>User Home ?</h1>
          <Link to="/login">
            <button type="button" className="wwhite_btn">
             Home
            </button>
          </Link>
        </div>
      </div>
    </div>
    
  )
}

export default AdminLogin
