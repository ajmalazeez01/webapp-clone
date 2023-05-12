import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function SmallExample() {
  const navigate = useNavigate()
  const [details,setDetails] = useState([])
  const getUser = async()=>{
    await axios.get("http://localhost:2000/admin/home").then((res)=>{ 

      setDetails(res.data.userData);
    
    })
  }
 const hanleDelete = async(id) =>{
  console.log(id);
 
  await axios.delete(`http://localhost:2000/admin/userDelete/${id}`).then((res)=>{

   if(res.data.action){
    Swal.fire({
      title: "Success!",
      text: "Deleted Sussess.",
      icon: "success",
      confirmButtonText: "Ok"
    }).then(()=>{
      navigate('/adminHome')
      getUser()
    })
  }
  })
 }
useEffect(()=>{
  getUser()
  
},[])
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
           <th>profile</th>
           <th>Action</th>
        </tr>
      </thead>
    
      <tbody>
        {
          details.map((data,id)=>{
            return (
              <tr>
              <td >{id+1}</td>
              <td>{data.fname}</td>
              <td>{data.lname}</td>
              <td>{data.email}</td>
              <td>
                <img style={{height:'61px', width: '70%'}} src={
                 data.image ?  
                  `http://localhost:2000/images/${data.image}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  
                  } alt="prfile_pic" />
                 </td>
              <td>
          
             <NavLink to={`edit/${data._id}`}>
             <p  style={{fontSize:"20px",cursor:"pointer"}}>
                <i class="fa  fa-user-pen"></i></p> 

             </NavLink>
             
                <p onClick={()=>{hanleDelete(data._id)}}  style={{fontSize:"20px",cursor:"pointer"}}>
                <i class="fa fa-trash"></i></p>
       
               

                
                </td>
            
            </tr> 
            )
          })
          
        }
      
      </tbody>
    </Table>
  );
}

export default SmallExample;