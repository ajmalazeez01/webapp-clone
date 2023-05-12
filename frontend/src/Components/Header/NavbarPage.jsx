import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {useNavigate , Link} from "react-router-dom"
import {useCookies} from "react-cookie";
import axios from "axios"

function NavbarPage() {
  const navigate = useNavigate();
  // const [cookies,removeCookies] = useCookies([])
  // useEffect(()=>{
  //  const verifyUser = async ()=>{
  //     if(!cookies.jwt){
  //       navigate('/login')
  //     }else{
  //   const {data} = await axios.post(
  //         "http://localhost:2000",{},{ withCredentials: true});
  //         if(!data.status){
  //           removeCookies("jwt");
  //           navigate('/login')
  //         }
  //     }
  //  }



   
  //  verifyUser();
  // },[cookies,navigate,removeCookies])

  const [cookies, removeCookies] = useCookies([]);
    useEffect(()=>{
        const verifyUser = async () => {
            if(cookies.jwt) {
                navigate("/")
            }else{
                const {data} = await axios.post(
                    "http://localhost:2000/",
                    {},
                    {withCredentials:true}
                    );
                    if(!data.status){
                        removeCookies("jwt")
                        navigate("/login")
                    }
            }
        }
        verifyUser()
    },[cookies, navigate, removeCookies])


  const handleLogout = ()=>{
    removeCookies("jwt");
    navigate('/login')

  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="success" variant="light">
      <Container>
        <Navbar.Brand href="#home">React-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">About</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/profile">
                Profile
                </Link>
                </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                LogOut
                </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
