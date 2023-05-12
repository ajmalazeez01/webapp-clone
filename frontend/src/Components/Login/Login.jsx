import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import {useCookies} from "react-cookie";
import {useSelector,useDispatch} from "react-redux"
import "./Login.css";
import Swal from "sweetalert2";
import axios from "axios";
// import { addAuth } from "../../Redux/store"; 
import { setLocalStorageData } from '../../Redux/store';

function Login() {
  const localStorageData = useSelector(state => state.localStorage.data);
  console.log(localStorageData);

  const dispatch = useDispatch();
  
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [cookies] = useCookies([]) 
  const navigate = useNavigate();
  // useEffect(()=>{
	// const verifyUser = async ()=>{
	// 	if(!cookies.jwt){
	// 		navigate('/login')
	// 	}else{
	// 		navigate('/')
	// 	}
	// }
	//  verifyUser();
  // },[cookies,navigate])
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    validation();
    try {
      if (!errors) {
        await axios
          .post(
            "http://localhost:2000/login",
            {
              email,
              password,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data.userLogin);
            dispatch(setLocalStorageData (res.data.userLogin))
            if (res.data.status === false) {
              
              Swal.fire({
                title: "Oops!",
                text: "password not matching",
                icon: "error",
                confirmButtonText: "Ok",
              });
            }else if(res.data.action === false){
				Swal.fire({
					title: "Oops!",
					text: "Invalid Credentials",
					icon: "error",
					confirmButtonText: "Ok",
				  });
			}else {
              Swal.fire({
                title: "Success!",
                text: " login Success! ",
                icon: "success",
                confirmButtonText: "Ok",
              }).then(() => {
                navigate("/");
              });
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="lleft">
          <form className="fform_container" onSubmit={handleSubmit}>
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
        <div className="rright">
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className="wwhite_btn">
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
