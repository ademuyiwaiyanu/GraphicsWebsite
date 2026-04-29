import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Navbar = ({ cart = [], userName = null, userEmail = null, isAdmin = false, onSignOut }) => {
  const [open, setOpen] = useState(false)
  const accountName = userName || userEmail
  const loggedIn = Boolean(accountName)
  const itemCount = cart.reduce((s, i) => s + (i.qty || 0), 0)
  const total = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pink-800 text-white p-7 shadow-lg rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Lanshy Design</div>

        {/* desktop menu */}
        <ul className="hidden md:flex space-x-4 items-center">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-yellow-300' : 'hover:text-blue-200'}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/designs" className={({ isActive }) => isActive ? 'text-yellow-300' : 'hover:text-blue-200'}>Designs</NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'text-yellow-300' : 'hover:text-blue-200'}>Portfolio</NavLink>
          </li>
          {loggedIn && (
            <li>
              <NavLink to="/orders" className={({ isActive }) => isActive ? 'text-yellow-300' : 'hover:text-blue-200'}>Orders</NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink to="/admin" className={({ isActive }) => isActive ? 'text-yellow-300' : 'hover:text-blue-200'}>Admin</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/cart" className={({ isActive }) => isActive ? 'text-yellow-300' : 'hover:text-blue-200'}>Cart</NavLink>
          </li>
          {loggedIn ? (
            <li className="ml-6 flex items-center gap-3 text-sm">
              <span className="text-slate-100">Hi, {accountName}</span>
              <button onClick={onSignOut} className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded">Sign Out</button>
            </li>
          ) : (
            <li>
              <NavLink to="/signin" className={({ isActive }) => isActive ? 'text-yellow-300' : 'hover:text-blue-200'}>Sign In</NavLink>
            </li>
          )}
          <li className="ml-4 text-sm">
            <div className="text-right">
              <div className="font-medium">{itemCount} items</div>
              <div className="text-blue-300">₦{total.toLocaleString()}</div>
            </div>
          </li>
        </ul>

        {/* mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </div>

      {/* mobile overlay menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-60">
          <div className="bg-blue-800 text-white p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-bold">Tajudeen Seun Oluwatobiloba</div>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-yellow-300 text-lg' : 'text-lg hover:text-blue-200'}>Home</NavLink>
              <NavLink to="/designs" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-yellow-300 text-lg' : 'text-lg hover:text-blue-200'}>Designs</NavLink>
              <NavLink to="/portfolio" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-yellow-300 text-lg' : 'text-lg hover:text-blue-200'}>Portfolio</NavLink>
              <NavLink to="/cart" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-yellow-300 text-lg' : 'text-lg hover:text-blue-200'}>Cart</NavLink>
              {loggedIn && (
                <NavLink to="/orders" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-yellow-300 text-lg' : 'text-lg hover:text-blue-200'}>Orders</NavLink>
              )}
              {isAdmin && (
                <NavLink to="/admin" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-yellow-300 text-lg' : 'text-lg hover:text-blue-200'}>Admin</NavLink>
              )}
              {loggedIn ? (
                <button onClick={() => { setOpen(false); onSignOut() }} className="text-left text-lg text-white hover:text-blue-200">Sign Out</button>
              ) : (
                <NavLink to="/signin" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-yellow-300 text-lg' : 'text-lg hover:text-blue-200'}>Sign In</NavLink>
              )}
              <div className="mt-6 text-sm">
                <div className="font-medium">{itemCount} items</div>
                <div className="text-blue-300">₦{total.toLocaleString()}</div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar