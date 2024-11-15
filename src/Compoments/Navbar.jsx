import React from 'react';

const Navbar = ({ openModal }) => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Book Nest</h1>
        <button
          onClick={openModal}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition"
        >
          Add New Book
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
