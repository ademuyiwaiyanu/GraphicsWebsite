import { Link } from 'react-router-dom'
import Carousel from '../component/Carousel'
import localImageUrls from '../assets/imagePaths'
import { useEffect, useState } from 'react'

const defaultSlides = [
  {
    title: 'social media kit',
    description: 'Clean minimal social media variations for brand identity.',
    price: 50000,
    image: localImageUrls[0]
  },
  {
    title: 'Social Media Kit',
    description: 'Templates and banners for social platforms.',
    price: 10000,
    image: localImageUrls[1]
  },
  { 
    title: 'jotter',
    description: 'A simple jotter for quick notes and ideas.',
    price: 100000,
    image: localImageUrls[2]
  },
  {
    title: 'Birthday Card Kit',
    description: 'Custom birthday cards for special occasions.',
    price: 75000,
    image: localImageUrls[3]
  }
]

const Home = () => {
  const [slides, setSlides] = useState(defaultSlides)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('carouselSlides')
      if (raw) setSlides(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-500 py-12">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Tajudeen Seun Oluwatobiloba</h1>
          <p className="text-gray-300 mb-6">Graphic Designer — Creating Beautiful Designs for Your Brand</p>
          <Link to="/designs" className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded">
            Browse Designs
          </Link>
        </div>

        <div className="w-full max-w-4xl px-4">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">Featured Designs</h2>
          <Carousel slides={slides} />
        </div>
      </div>
    </div>
  )
}

export default Home