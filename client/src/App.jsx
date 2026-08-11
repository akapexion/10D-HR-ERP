import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import AddEmployee from './dashboard/pages/AddEmployee'
import Employees from './dashboard/pages/Employees'
import AppLayout from './AppLayout'
import DashboardLayout from './dashboard/DashboardLayout'
import Register from './dashboard/Register'
import Login from './dashboard/Login'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<AppLayout />}>

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

          </Route>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="addemployee" element={<AddEmployee />} />
            <Route path="employees" element={<Employees />} />
          </Route>


          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
