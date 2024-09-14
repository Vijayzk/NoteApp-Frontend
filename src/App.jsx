import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <>
     <Routes>
       <Route path='/dashboard' element={<Home/>}/>
       <Route path='/' element={<Login/>}/>
       <Route path='/signup' element={<SignUp/>}/>
     </Routes>
    </>
  )
}

export default App
