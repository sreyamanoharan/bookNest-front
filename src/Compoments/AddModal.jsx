import React, { useCallback, useState } from 'react';
import axios from '../axios'

const AddModal = ({ isOpen, onClose ,onAddBook}) => {

    const handleClose = useCallback(() => {
        onClose()
        clearForm();
        setErr(null);
    }, [onClose])

    const [bookDetails, setBookDetails] = useState({
        Name: '',
        Author: '',
        Description: '',
        Picture: ''
    })

    const [err,setErr]=useState(null)

    const clearForm=()=>{
       setBookDetails({  Name: '',
        Author: '',
        Description: '',
        Picture: ''
    })}

    const handleChange = (e) => {

        e.preventDefault()
        setBookDetails({ ...bookDetails, [e.target.name]: e.target.value })
    }

    const handleImage = async (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        const data = new FormData()
        data.append("file", file)
        data.append('upload_preset', "BookNest")
        data.append('cloud_name', "ds0dvm4ol")

        const res = await fetch("https://api.cloudinary.com/v1_1/ds0dvm4ol/image/upload", {
            method: 'POST',
            body: data
        })

        const ImgUrl = await res.json()
        console.log(ImgUrl.url);


        setBookDetails({ ...bookDetails, Picture: ImgUrl.url })



    }


 const validation=(e)=>{
    e.preventDefault()
    if (!bookDetails.Name.trim() || !bookDetails.Author.trim() || !bookDetails.Description.trim() || !bookDetails.Picture.trim()) {
        setErr('Please fill in all the fields.');
    }else{
        setErr(null);
        handleSubmit()
       
    }
   
 }


    const handleSubmit = async () => {

        console.log('hellooo poooeepppllleee');


        try {
            const response = await axios.post('/AddBook', bookDetails);
            console.log(response.data.newBook);
            onAddBook(response.data.newBook); 
            clearForm()
            handleClose()
        } catch (error) {
            console.error(error);
        }


    };



    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white w-full max-w-lg p-6 mx-4 rounded-lg shadow-lg relative z-10">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Book</h2>
                <form className="space-y-4" onSubmit={validation}>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Book Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter book name" name='Name' value={bookDetails.Name} onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Author</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter author name" name='Author' value={bookDetails.Author} onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
                        <textarea
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter book description" name='Description' value={bookDetails.Description} onChange={handleChange}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Book Cover</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" name='Picture'
                        />
                    </div>

                    {err && (
                        <div className="text-red-500 text-sm mt-2">{err}</div>
                    )}
                    <div className="flex justify-end">
                    
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Add Book
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddModal;
