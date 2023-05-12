import React from 'react'
import Navbar from "../Components/AdminPanal/Navbar"
import Table from "../Components/AdminPanal/Table"
import Home from "../Components/AdminHome/AdminHome"
function AdminHome() {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Table/>
    </div>
  )
}

export default AdminHome
