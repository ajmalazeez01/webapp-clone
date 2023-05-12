import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './edit.css'
function EditUser() {
  const navigate = useNavigate()
   const {id} = useParams('')
   console.log(id);
   const [details,setDetails] = useState([])
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    
    const handleSubmit = async (e) => {
      e.preventDefault();
     await axios.patch("http://localhost:2000/admin/editUser",{
      userId : id,
      fname,
      lname
     }
     
     
     ).then((res)=>{
      if(res.data.check){
        Swal.fire({
          title: "Oops!",
          text: "Please Update return Not Valid ",
          icon: "error",
          confirmButtonText: "Ok"
        })
      }
      if(res.data.status || res.data.action){
        Swal.fire({
          title: "Success!",
          text: "updation Sussess.",
          icon: "success",
          confirmButtonText: "Ok"
        }).then(()=>{
          navigate('/adminHome')
        })
      }
     })

    }
   const getUser = async ()=>{
      await axios.get(`http://localhost:2000/admin/details/${id}`).then((res)=>{
      
         setDetails(res.data.userDetails);
         setFname(res.data.userDetails.fname)
         setLname(res.data.userDetails.lname)
      })
   }
   useEffect(()=>{
    getUser()
   },[])
  return (
    <div>
      <div className="signup_containerr">
      <div className="signup_form_containerr">
        <div className="leftt">
          <h1>Update Noww !!!</h1>
        </div>
        <div className="rightt">
          <form className="form_containerr" onSubmit={handleSubmit} >
            {/* <h1>Please Update Now!!</h1> */}
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
			
              onChange={(e) => {
                setFname(e.target.value);
              }}
              value={fname}
              required
              className="inputt"
            />
			<br/>
	
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={(e) => {
                setLname(e.target.value);
              }}
	
              value={lname}
              required
              className="inputt"
            />
			<br/>

            <input
              type="email"
              placeholder="Email"
              name="email"
             
              value={details.email}
              required
              className="inputt"
              disabled
            />
			<br/>
	
            <input
              type="password"
              placeholder="Password"
              name="password"
             

              value= "11111"
              required
              className="inputt"
              disabled
            />
			<br/>
		
            
            <button type="submit" className="green_btnn">
             Update
            </button>
          </form>
 
        </div>
      </div>
    </div>
    </div>
  )
}

export default EditUser
