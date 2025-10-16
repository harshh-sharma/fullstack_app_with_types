// import React from 'react'

import { Route, Routes } from "react-router-dom"
import Home from "../components/Home"
import Login from "../components/Login"
import Register from "../components/Register"
import Categories from "../components/Categories"
import AddCategory from "../components/AddCategory"
import Services from "../components/Services"

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/category/add" element={<AddCategory/>} />
        <Route path="/category/:categoryId/services" element={<Services/>} />
    </Routes>
  )
}

export default AppRouter