import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import AddModal from './AddModal';
import axios from '../axios'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details,setDetails]=useState([])

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  useEffect(()=>{
            axios.get('/getDetails').then((res)=>{
                console.log(res.data.details);
                
                setDetails(res.data.details)
                
            })
  },[])



const addBook = (newBook) => {
    setDetails((prevDetails) => [...prevDetails, newBook]);
  };

  const deleteBook=async(id)=>{

    console.log(id);
    
   const res=await axios.delete(`/removeData/${id}`)
   console.log(res.data.removedData);
   

   setDetails((prevDetails) => prevDetails.filter((detail) => detail._id !== id));
  
}



  return (
    <>
      <Navbar openModal={openModal} />
      <AddModal isOpen={isModalOpen} onClose={closeModal} onAddBook={addBook}/>

 
      <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {details.map((detail, index) => (
          <div key={detail._id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <img src={detail.Picture} alt={detail.Name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{detail.Name}</h3>
              <p className="text-gray-500 mt-2">Author: {detail.Author}</p>
              <p className="text-gray-600 mt-2">{detail.Description}</p>
              
              <button className='bg-blue-400 rounded p-1 mt-1'  onClick={()=>deleteBook(detail._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
