import React from 'react'
import Navbar from '../components_lite/Navbar'
import ritul from '../creator/ritul.jpeg'; 

const Creator = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-full">
          {/* Image Section */}
          <div className="flex justify-center">
            <img src={ritul} alt="Ritul" className="h-80 object-cover rounded-lg shadow-md" />
          </div>
          {/* Text Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ritul</h2>
            <p className="text-gray-600 mb-2">Ritul is a 2nd year Computer Science student from Vellore Institute of Technology,Chennai.</p>
            <p className="text-gray-600 mb-2">Her specialization is AI & Robotics.</p>
            <p className="text-gray-600 mb-2">Her hobbies are painting and sketching.</p>
          </div>
        </div>
      </div>
      
      <hr className="w-full border-gray-300 my-6" />
    </div>
  )
}

export default Creator