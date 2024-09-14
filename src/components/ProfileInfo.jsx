import React from 'react'
import { getInitials } from '../utils/helper'

const ProfileInfo = ({userInfo , onLogout}) => {
  return (
   <>
    <div className='flex items-center gap-3'>
      <div className='w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-200 md:text-xl text-sm'>{getInitials(userInfo?.fullname)}</div>

      <div className=''>
        <p className='text-sm font-medium hidden md:block'>{userInfo?.fullname}</p>
        <button className='text-sm text-slate-700 underline' onClick={onLogout}>Logout</button>
      </div>
    </div>
   </>
  )
}

export default ProfileInfo