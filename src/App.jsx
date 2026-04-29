// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Home from './pages/Home'
import Designs from './pages/Designs'
import Portfolio from './pages/Portfolio'
import Cart from './pages/Cart'
import SignIn from './pages/SignIn'
import OrderHistory from './pages/OrderHistory'
import AdminOrders from './pages/AdminOrders'

function App() {
  const [user, setUser] = useState(() => localStorage.getItem('currentUser'))
  const [userName, setUserName] = useState(() => {
    const email = localStorage.getItem('currentUser')
    if (!email) return null
    const accounts = JSON.parse(localStorage.getItem('accounts') || '{}')
    return accounts[email]?.name || email
  })
  const isAdmin = user === 'admin' || user === 'admin@admin.com'
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (!user) {
      setCart([])
      setUserName(null)
      return
    }

    try {
      const stored = localStorage.getItem(`userCart_${user}`)
      setCart(stored ? JSON.parse(stored) : [])
    } catch (e) {
      setCart([])
    }

    const accounts = JSON.parse(localStorage.getItem('accounts') || '{}')
    setUserName(accounts[user]?.name || user)
  }, [user])

  function setCartAndSave(updater) {
    setCart(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (user) {
        localStorage.setItem(`userCart_${user}`, JSON.stringify(next))
      }
      return next
    })
  }

  function addToCart(item) {
    if (!user) {
      alert('Please sign in before adding items to your personal cart.')
      return
    }

    setCartAndSave(prev => {
      const found = prev.find(i => i.id === item.id)
      if (found) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  function handleAuth({ email, name }) {
    localStorage.setItem('currentUser', email)
    setUser(email)
    setUserName(name || email)
  }

  function handleSignOut() {
    localStorage.removeItem('currentUser')
    setUser(null)
    setUserName(null)
    setCart([])
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar cart={cart} userName={userName} userEmail={user} isAdmin={isAdmin} onSignOut={handleSignOut} />
        <main className="flex-1 container mx-auto px-4 py-8 pt-24 bg-slate-950 text-slate-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/designs" element={<Designs addToCart={addToCart} />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route
              path="/cart"
              element={user ? <Cart cart={cart} setCart={setCartAndSave} user={user} userName={userName} /> : <Navigate to="/signin" />}
            />
            <Route
              path="/orders"
              element={user ? <OrderHistory user={user} userName={userName} /> : <Navigate to="/signin" />}
            />
            <Route
              path="/admin"
              element={isAdmin ? <AdminOrders /> : <Navigate to="/signin" />}
            />
            <Route path="/signin" element={<SignIn onAuth={handleAuth} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
