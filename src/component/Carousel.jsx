import React, { useState, useEffect } from 'react'

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const next = () => setCurrent(prev => (prev + 1) % slides.length)
  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="relative w-full max-w-4xl mx-auto h-64 md:h-80 lg:h-96 bg-gray-800 rounded-3xl overflow-hidden shadow-lg">
      <div className="absolute inset-0 flex transition-opacity duration-1000">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 md:p-8 lg:p-12">
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">{slide.title}</h3>
              <p className="text-sm md:text-lg lg:text-xl text-gray-200 mt-2 md:mt-4">{slide.description}</p>
              <div className="mt-4 md:mt-6 text-xl md:text-2xl lg:text-3xl text-slate-200 font-semibold">₦{slide.price.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white px-4 py-3 rounded text-2xl z-10"
      >
        ❮
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white px-4 py-3 rounded text-2xl z-10"
      >
        ❯
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
