import React, { useState } from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {

    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    const onLogout = () => {
        localStorage.clear()
        navigate('/');
    };

    const handleSearch = () => {
        if (searchQuery) {
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
                <div className='flex flex-row'>
                    <img src="logo.avif" alt="" className='h-10 w-10' />
                    <h2 className='text-xl font-semibold text-black py-1 md:py-2 mt-1 md:mt-0'>Note<span className='text-green-500'>Me</span></h2>
                </div>
                {
                    userInfo &&
                    <SearchBar
                        value={searchQuery}
                        onChange={({ target }) => {
                            setSearchQuery(target.value)
                        }}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                    />
                }
                {
                    userInfo &&
                    <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                }
            </div>
        </>
    )
}

export default Navbar
