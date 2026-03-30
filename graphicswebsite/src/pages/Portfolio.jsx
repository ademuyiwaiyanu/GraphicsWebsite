import React, { useState } from 'react'
import localImageUrls from '../assets/imagePaths'

const Portfolio = () => {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)

    const projects = [
    { id: 'p1', title: 'Clean Flier Set', type: 'branding', desc: 'flier design.', image: localImageUrls[12] },
    { id: 'p2', title: 'Festival Poster', type: 'Poster', desc: 'Bold poster for a music festival.', image: localImageUrls[0] },
    { id: 'p3', title: 'Startup Branding', type: 'Branding', desc: 'Full brand package for a makeup startup.', image: localImageUrls[1] },
    { id: 'p4', title: 'jotter kits', type: 'jotter', desc: 'beautiful jotter designs.', image: localImageUrls[2] },
    { id: 'p5', title: 'Illustration Pack', type: 'Branding', desc: 'Custom illustrations for product pages.', image: localImageUrls[3] },
    { id: 'p6', title: 'Event Poster Series', type: 'Poster', desc: 'Series of posters with cohesive theme.', image: localImageUrls[4] },
    { id: 'p7', title: 'Corporate Identity', type: 'Branding', desc: 'Stationery and brand guideline deliverables.', image: localImageUrls[5] },
    { id: 'p8', title: 'church programs', type: 'Programs', desc: 'Printed programs for church events.', image: localImageUrls[6] }
  ]

  const types = ['All','Logo','Poster','Branding','jotter','poster','Programs']
  const filtered = filter === 'All' ? projects : projects.filter(p => p.type === filter)

  function openProject(p) { setActive(p) }
  function closeProject() { setActive(null) }

  return (
    <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src="/assets/img/tajudeen.jpeg"
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold text-white">Tajudeen Seun</h1>
          <p className="text-gray-300 mt-2">Graphic Designer — Branding, Illustration, Print</p>
          <p className="mt-4 text-gray-200">I’m a passionate graphic designer who loves turning ideas into visually engaging designs. From logos to digital graphics, I enjoy creating work that tells a story, connects with people, and brings brands to life.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="mailto:oluwashexy@gmail.com" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Email</a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">Download CV</a>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="https://linkedin.com/in/tajudeenseun" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm">LinkedIn</a>
            <a href="https://twitter.com/tajudeenseun" target="_blank" rel="noopener noreferrer" className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm">Twitter</a>
            <a href="https://instagram.com/tajudeenseun" target="_blank" rel="noopener noreferrer" className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm">Instagram</a>
            <a href="https://github.com/tajudeenseun" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm">GitHub</a>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">About</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-start gap-2">
            <div className="text-3xl">👋</div>
            <div>
              <div className="font-semibold text-pink-300">Who I am</div>
              <div className="text-gray-300 text-sm">I’m a passionate graphic designer who loves turning ideas into visually engaging designs. From logos to digital graphics, I enjoy creating work that tells a story, connects with people, and brings brands to life.</div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="text-3xl">🎯</div>
            <div>
              <div className="font-semibold text-pink-300">What I specialize in</div>
              <div className="text-gray-300 text-sm">Brand identity, social kits, print, and illustrations that sell ideas.</div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="text-3xl">🛠️</div>
            <div>
              <div className="font-semibold text-pink-300">Tools</div>
              <div className="text-gray-300 text-sm">Adobe Illustrator · Photoshop · Figma · Procreate</div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-gray-300">Design philosophy: keep it clear, useful and a little unexpected — focus on meaning first, decoration second.</p>
      </div>

      {/* Projects / Work */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">Portfolio / Work</h2>

        <div className="flex flex-wrap gap-3 mb-6">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-full text-sm ${filter===t ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
            >{t}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} onClick={() => openProject(p)} className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg">
              <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-700 flex items-center justify-center overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="text-sm text-blue-300 font-semibold">{p.type}</div>
                <h3 className="text-lg font-semibold mt-1">{p.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing Services & Skills moved below */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3 text-blue-400">Services</h2>
          <ul className="list-disc list-inside text-gray-200">
            <li>Logo & Brand Identity</li>
            <li>Social Media Kits</li>
            <li>Print & Poster Design</li>
            <li>Custom Illustrations</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-blue-400">Skills & Tools</h2>
          <div className="flex flex-wrap gap-2">
            {['Adobe Illustrator','Photoshop','Figma','Procreate','Brand Strategy'].map(s => (
              <span key={s} className="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3 text-blue-400">Contact</h2>
        <p className="text-gray-200">Available for freelance and contract work. Typical project budgets range from ₦80,000–₦2,000,000 depending on scope.</p>
      </div>
      
      {/* Project details modal */}
      {active && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-3xl w-full overflow-hidden">
            <div className="w-full h-64 bg-gray-700">
              <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="text-sm text-blue-300">{active.type}</div>
              <h3 className="text-2xl font-bold mt-1">{active.title}</h3>
              <p className="text-gray-300 mt-3">{active.desc}</p>
              <div className="mt-4 flex justify-end">
                <button onClick={closeProject} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Portfolio
