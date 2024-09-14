import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {



    return (
        <>
            <div className='w-20 md:w-80 flex items-center px-4 bg-slate-100 rounded-md'>
                <input
                    type="text"
                    placeholder='Search Notes'
                    className='w-full text-[10px] md:text-xs bg-transparent py-[11px] outline-none'
                    value={value}
                    onChange={onChange}
                />

                {value && (
                    <IoMdClose 
                    className='text-xl text-slate-500 cursor-pointer hover:text-black mx-2'
                    onClick={onClearSearch}
                   />
                )}
                
                <FaMagnifyingGlass
                    className='text-slate-400 cursor-pointer hover:text-black w-3 h-3'
                    onClick={handleSearch}
                />
            </div>
        </>
    )
}

export default SearchBar
