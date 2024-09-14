import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/input/PasswordInput'
import { validateEmail } from '../utils/helper'
import axiosInstance from '../utils/axiosInstance'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Enter a valid email.")
      return;
    }

    if (!password) {
      setError('Please enter the password.')
      return;
    }
    setError('')

    //Login Api call
    try {
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      });

      //Handle successfull login
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }
    }
    catch (error) {
      //Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
      else {
        setError("An unexpected error occur. Please try again.")
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center mt-20'>
        <div className='mb-14'>
          <h1 className='text-xl md:text-3xl font-bold'>Welcome to Note<span className='text-green-500'>Me</span> App</h1>
          <p className='text-sm md:text-xl text-center text-blue-500'>Login to create your daily notes.</p>
        </div>
        <div className='w-80 md:w-96 border rounded-md bg-white px-7 py-10 shadow-lg'>
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-center">LogIn</h4>

            <input
              type="text"
              placeholder='Email'
              className='input-box w-full py-3 mr-3 px-5 text-sm mb-4 border-[1.5px] outline-none bg-transparent'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='bg-blue-500 hover:bg-blue-600 w-full py-2 text-white text-sm rounded '>Login</button>
            <p className='text-sm text-center mt-4'>
              Not registered? {" "}
              <Link to='/signup' className='text-blue-500 underline'>
                Create an account
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login
