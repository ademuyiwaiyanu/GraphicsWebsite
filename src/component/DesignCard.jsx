import React, { useState } from 'react'

const DesignCard = ({ design, onAdd }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-700 flex items-center justify-center overflow-hidden">
        {!imgError ? (
          <img 
            src={design.image} 
            alt={design.title} 
            className="w-full h-full object-cover" 
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-800 to-purple-600 flex items-center justify-center text-white text-center px-4">
            <span className="font-semibold text-sm">{design.title}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg text-blue-500 font-semibold">{design.title}</h3>
        <p className="text-sm text-blue-500 mt-1">{design.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-blue-500 font-bold">₦{design.price.toLocaleString()}</div>
          <button onClick={(e) => { e.stopPropagation(); onAdd(design) }} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default DesignCard
