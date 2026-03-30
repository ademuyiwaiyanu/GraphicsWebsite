import React, { useState, useEffect } from 'react'

function fileToDataUrl(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = () => res(reader.result)
    reader.onerror = rej
    reader.readAsDataURL(file)
  })
}

const ImageUploader = ({ mode = 'carousel', designs = [], onSaved }) => {
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [selectedProject, setSelectedProject] = useState(designs[0]?.id || '')

  useEffect(() => {
    setSelectedProject(designs[0]?.id || '')
  }, [designs])

  useEffect(() => {
    let mounted = true
    async function build() {
      const imgs = []
      for (const f of files) {
        try {
          const url = await fileToDataUrl(f)
          imgs.push({ name: f.name, url })
        } catch (e) {}
      }
      if (mounted) setPreviews(imgs)
    }
    build()
    return () => (mounted = false)
  }, [files])

  function handleFiles(e) {
    const list = Array.from(e.target.files || [])
    setFiles(list)
  }

  function removePreview(idx) {
    setFiles(files.filter((_, i) => i !== idx))
  }

  async function saveCarousel() {
    if (!previews.length) return
    // Create slide objects with minimal meta
    const slides = previews.map(p => ({ title: 'Custom Image', description: '', price: 0, image: p.url }))
    localStorage.setItem('carouselSlides', JSON.stringify(slides))
    if (onSaved) onSaved()
    alert('Carousel slides saved to localStorage')
  }

  async function saveProjectImage() {
    if (!previews[0]) return
    const raw = localStorage.getItem('projectImages')
    let projectImages = {}
    try { projectImages = raw ? JSON.parse(raw) : {} } catch (e) {}
    projectImages[selectedProject] = previews[0].url
    localStorage.setItem('projectImages', JSON.stringify(projectImages))
    if (onSaved) onSaved()
    alert('Project image saved to localStorage')
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-6">
      {mode === 'carousel' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-white">Upload Carousel Slides</div>
            <div className="text-sm text-gray-300">Files will be stored in localStorage</div>
          </div>
          <input type="file" accept="image/*" multiple onChange={handleFiles} className="mb-3" />
          <div className="grid grid-cols-3 gap-3">
            {previews.map((p, i) => (
              <div key={i} className="relative">
                <img src={p.url} alt={p.name} className="w-full h-24 object-cover rounded" />
                <button onClick={() => removePreview(i)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs">x</button>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <button onClick={saveCarousel} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">Save Carousel</button>
          </div>
        </div>
      )}

      {mode === 'projects' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-white">Upload Project Thumbnail</div>
            <div className="text-sm text-gray-300">Assign image to a design</div>
          </div>
          <div className="flex gap-3 items-center">
            <select className="bg-gray-700 text-white px-3 py-2 rounded" value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
              {designs.map(d => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
            <input type="file" accept="image/*" onChange={handleFiles} />
            <button onClick={saveProjectImage} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">Save</button>
          </div>

          <div className="mt-3">
            {previews[0] && <img src={previews[0].url} alt={previews[0].name} className="w-48 h-32 object-cover rounded" />}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
