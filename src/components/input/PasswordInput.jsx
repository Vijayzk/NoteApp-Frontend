import React, { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa6'

const PasswordInput = ({ value, onChange, placeholder }) => {

  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };


  return (
    <>
      <div className='flex items-centre bg-transparent border-[1.5px] px-5 rounded mb-3'>
        <input
          value={value}
          onChange={onChange}
          type={isShowPassword ? 'text' : 'password'}
          placeholder={placeholder || "Password"}
          className='w-full text-sm py-3 mr-3 rounded outline-none bg-transparent'
        />

        {isShowPassword ? <FaRegEye
          size={22}
          className='text-blue-500 cursor-pointer mt-2'
          onClick={() => { toggleShowPassword() }}
        /> : <FaRegEyeSlash
          size={22}
          className='text-slate-400 cursor-pointer mt-2'
          onClick={() => { toggleShowPassword() }}
        />
        }
      </div>
    </>
  )
}

export default PasswordInput
