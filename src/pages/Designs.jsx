import React, { useState } from 'react'
import DesignCard from '../component/DesignCard'
import localImageUrls from '../assets/imagePaths'

const Designs = ({ addToCart }) => {
  const designs = [
    {
      id: 'd1',
      title: 'Birthday pack',
      description: 'Custom birthday card designs for special occasions.',
      price: 50000,
      type: 'poster',
      image: localImageUrls[4]
    },
    {
      id: 'd2',
      title: 'Social Media Kit',
      description: 'Templates and banners for social platforms.',
      price: 10000,
      type: 'Poster',
      image: localImageUrls[5]
    },
    {
      id: 'd3',
      title: 'Jotter',
      description: 'Printed jotter layout with editorial-style design.',
      price: 100000,
      type: 'Branding',
      image: localImageUrls[8]
    },
    {
      id: 'd4',
      title: 'graduation pack',
      description: 'Complete graduation card designs for special occasions.',
      price: 95000,
      type: 'Poster',
      image: localImageUrls[7]
    },
    {
      id: 'd5',
      title: 'Jotter 1',
      description: 'Event programs and editorial layouts.',
      price: 75000,
      type: 'Programs',
      image: localImageUrls[9]
    },
    {
      id: 'd6',
      title: 'Jotter 2',
      description: 'Professional jotter-style stationery design.',
      price: 35000,
      type: 'Branding',
      image: localImageUrls[10]
    },
    {
      id: 'd7',
      title: 'fliers',
      description: 'Eye-catching flier designs for promotional campaigns.',
      price: 120000,
      type: 'Branding',
      image: localImageUrls[12]
    },
    {
      id: 'd8',
      title: 'packaging bag',
      description: 'Stylish packaging design for a new product line.',
      price: 15000,
      type: 'Print',
      image: localImageUrls[11]
    }
  ]

  const [filter, setFilter] = useState('All')
  const [selectedDesign, setSelectedDesign] = useState(null)

  const types = ['All', 'Logo', 'Poster', 'Branding', 'mockup', 'Programs', 'Print','fliers' ]
  const filtered = filter === 'All' ? designs : designs.filter(d => d.type === filter)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Available Designs</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1 rounded-full text-sm ${filter === t ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(d => (
          <div key={d.id} onClick={() => setSelectedDesign(d)} className="cursor-pointer">
            <DesignCard design={d} onAdd={addToCart} />
          </div>
        ))}
      </div>

      {selectedDesign && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl">
            <div className="w-full h-64 bg-gray-700 overflow-hidden">
              <img src={selectedDesign.image} alt={selectedDesign.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="text-sm text-blue-300 mb-2">{selectedDesign.type}</div>
              <h3 className="text-2xl font-bold">{selectedDesign.title}</h3>
              <p className="text-gray-300 mt-4">{selectedDesign.description}</p>
              <div className="mt-4 text-xl font-semibold text-white">₦{selectedDesign.price.toLocaleString()}</div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setSelectedDesign(null)} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">Close</button>
                <button onClick={() => { addToCart(selectedDesign); setSelectedDesign(null) }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Designs
