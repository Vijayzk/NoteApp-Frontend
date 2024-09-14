import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import Toast from '../components/Toast'
import EmptyCard from '../components/EmptyCard'
import AddNotesImg from '/AddLogo.png'
import NoData from '/NoData.png'

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch , setIsSearch] = useState(false)

  const navigate = useNavigate();

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message: message,
      type: type
    })
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    })
  }



  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear()
        navigate('/login')
      }
    }
  };

  //Get All Notes 
  const getAllNotes = async () => {
    try {

      const response = await axiosInstance.get('/get-all-note')

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes)
      }

    } catch (error) {
      console.log("An unexpected error occur. Try again.")
    }
  }

  //Handle edit 
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  }

  //Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id
    try {
      const response = await axiosInstance.delete('/delete-note/' + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully.", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("An unexpected error occur. Try Again.")
      }
    }
  }
  
  //Search for Note
  const onSearchNote = async (query) =>{
    try {
      const response = await axiosInstance.get('/search-notes',{
        params:{query},
      });

      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  //Pin Note
  const updateIsPinned = async(noteData) => {
    const noteId = noteData._id
    try {
        const response = await axiosInstance.put('/update-note-pinned/' + noteId , {
            "isPinned":!noteData.isPinned,
        });

        if (response.data && response.data.note) {
            showToastMessage("Note Pin Chnaged Successfully.");
            getAllNotes()
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, [])

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
      <div className='container px-10 md:px-20'>
        {allNotes.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onDelete={() => deleteNote(item)}
                onEdit={() => handleEdit(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ): (<EmptyCard imgSrc={isSearch? NoData :AddNotesImg} message={isSearch? `Oops! No notes found matching to your search.` :`Start creating your first note! Click the 'Add' button to right down your thoughts,ideas and reminders . Lets get started!!`}/>)}
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-700 absolute right-10 bottom-10' onClick={() => { setOpenAddEditModal({ isShown: true, type: "add", data: null }) }}>
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
        }}
        contentLabel=''
        ariaHideApp={false}
        className='w-80 md:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-28 md:mt-14 p-5'
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home
