import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate } from "react-router-dom"
import {useCookies} from "react-cookie";
import axios from "axios"

function NavScrollExample() {
  const navigate = useNavigate();
  const [cookies,removeCookies] = useCookies([])
  useEffect(()=>{
    const verifyUser = async ()=>{
      if(!cookies.jwt){
        navigate('/admin')
      }else{
    const {data} = await axios.post(
          "http://localhost:2000/admin/adminVeri",{},{ withCredentials: true,});
          console.log(data);
          if(!data.status){
            removeCookies("jwt");
            navigate('/admin')
          }
      }
   }
   verifyUser();

  },[cookies,navigate,removeCookies])
  const handleLogout = ()=>{
    removeCookies("jwt");
    navigate('/admin')
  }
  return (
    <Navbar bg="secondary" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Admin_Panal</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            
           
          </Nav>

          <p onClick={handleLogout}><i style={{fontSize :"20px",cursor:"pointer" }} class="fa fa-arrow-right-from-bracket"></i></p>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;