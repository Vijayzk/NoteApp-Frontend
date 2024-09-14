import React, { useState } from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

const Navbar = ({userInfo , onSearchNote ,handleClearSearch}) => {

    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    const onLogout = () => {
        localStorage.clear()
        navigate('/');
    };

    const handleSearch = () => {
       if(searchQuery){
        onSearchNote(searchQuery)
       }
    };

    const onClearSearch = () => {
        setSearchQuery("")
        handleClearSearch()
    };

    return (
        <>
            <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
                <div className='flex space-x-1'>
                    <img src="logo.avif" alt="" className='h-10 w-10' />
                    <h2 className='text-lg md:text-xl font-semibold text-black py-2'>NotesApp</h2>
                </div>
                <SearchBar
                    value={searchQuery}
                    onChange={({ target }) => {
                        setSearchQuery(target.value)
                    }}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
                {
                    userInfo &&
                    <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                }
            </div>
        </>
    )
}

export default Navbar
