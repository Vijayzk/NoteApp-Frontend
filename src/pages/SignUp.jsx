import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import PasswordInput from '../components/input/PasswordInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../utils/helper'
import axiosInstance from '../utils/axiosInstance.js'

const SignUp = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter valid email.");
      return;
    }

    if (!password) {
      setError("Enter password.");
      return;
    }

    setError('')

    //Signup Api
    try{
      const response = await axiosInstance.post('/create-account',{
        fullname:name,
        email:email,
        password:password,
      });

      //Handle successfull registration
      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }

      if(response.data && response.data.accessToken){
        localStorage.setItem("token" , response.data.accessToken)
        navigate('/dashboard')
      }

    }
    catch(error){
       //Handle login error
       if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
       }
       else{
        setError("An unexpected error occur. Please try again.")
       }
    }
  };


  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded-md bg-white px-7 py-10 shadow-lg'>
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7 text-center">SignUp</h4>

            <input
              type="text"
              placeholder='Name'
              className='input-box w-full py-3 mr-3 px-5 text-sm mb-4 border-[1.5px] outline-none bg-transparent'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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


            <button type='submit' className='bg-blue-500 hover:bg-blue-600 w-full py-2 text-white text-sm rounded '>Create Account</button>
            <p className='text-sm text-center mt-4'>
              Already registered? {" "}
              <Link to='/login' className='text-blue-500 underline'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
