import React from 'react'
import './adminHome.css'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

function AdminHome() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
      <Container fluid>
      <h5 className='userH1'>User Management</h5>
      <NavLink to={'/addUser'}>
        <Button  variant="success">Add</Button>
      </NavLink>
            
          </Container>
    </Navbar>
    </div>
  )
}

export default AdminHome
