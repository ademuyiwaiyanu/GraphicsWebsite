import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BarChart = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  const max = Math.max(...data.map(d => d.value), 1)

  return (
    <div className="w-full bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Cart Value Breakdown</h3>
      <div className="space-y-3">
        {data.map(d => {
          const width = Math.round((d.value / max) * 100)
          return (
            <div key={d.id} className="flex items-center gap-3">
              <div className="w-28 text-sm">{d.label}</div>
              <div className="flex-1 bg-gray-700 rounded overflow-hidden h-6">
                <div className="bg-blue-500 h-6" style={{ width: `${width}%` }} />
              </div>
              <div className="w-20 text-right text-sm">₦{d.value.toLocaleString()}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Cart = ({ cart = [], setCart, user, userName }) => {
  const [paymentRef, setPaymentRef] = useState('')
  const [notes, setNotes] = useState('')
  const [success, setSuccess] = useState('')

  function inc(item) {
    setCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
  }
  function dec(item) {
    setCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
  }
  function remove(item) {
    setCart(prev => prev.filter(i => i.id !== item.id))
  }

  const chartData = cart.map(i => ({ id: i.id, label: i.title, value: (i.price || 0) * (i.qty || 1) }))
  const total = chartData.reduce((s, d) => s + d.value, 0)

  function handleCheckout(e) {
    e.preventDefault()
    if (!paymentRef.trim()) {
      alert('Enter your payment reference before submitting.')
      return
    }

    const order = {
      id: `order_${Date.now()}`,
      user,
      userName: userName || user,
      items: cart,
      total,
      paymentRef: paymentRef.trim(),
      notes: notes.trim(),
      date: new Date().toISOString()
    }

    try {
      const userKey = `userOrders_${user}`
      const existing = JSON.parse(localStorage.getItem(userKey) || '[]')
      localStorage.setItem(userKey, JSON.stringify([order, ...existing]))

      const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]')
      localStorage.setItem('allOrders', JSON.stringify([order, ...allOrders]))
    } catch (e) {
      console.error('Unable to save order history', e)
    }

    setCart([])
    setSuccess('Order placed. Please send proof of payment to WhatsApp 09071059559.')
    setPaymentRef('')
    setNotes('')
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
        <div className="bg-gray-800 p-6 rounded space-y-4">
          <p className="text-gray-300">Please sign in to access your personal cart and keep it private from other users.</p>
          <Link to="/signin" className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(i => (
              <div key={i.id} className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-800 rounded-lg overflow-hidden">
                <img src={i.image} alt={i.title} className="w-full sm:w-32 h-40 sm:h-24 object-cover" />
                <div className="p-4 flex-1">
                  <div className="text-sm text-blue-300">{i.title}</div>
                  <div className="font-semibold">₦{(i.price || 0).toLocaleString()}</div>
                  <div className="text-gray-300 text-sm mt-2">Qty: {i.qty}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => dec(i)} className="px-3 py-1 bg-gray-700 rounded">-</button>
                    <button onClick={() => inc(i)} className="px-3 py-1 bg-gray-700 rounded">+</button>
                    <button onClick={() => remove(i)} className="px-3 py-1 bg-red-600 rounded">Remove</button>
                  </div>
                </div>
                <div className="p-4 text-right w-full sm:w-36">₦{((i.price||0)*(i.qty||1)).toLocaleString()}</div>
              </div>
            ))}
            <div className="text-right font-bold">Total: ₦{total.toLocaleString()}</div>
          </div>

          <div className="space-y-4">
            <BarChart data={chartData} />
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="font-semibold mb-4">Checkout</h4>
              {success && <div className="bg-green-600 text-white rounded p-3 mb-4">{success}</div>}
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Opay transaction reference</label>
                  <input
                    value={paymentRef}
                    onChange={e => setPaymentRef(e.target.value)}
                    placeholder="Payment reference"
                    className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Payment details or order note"
                    className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
                    rows="3"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded">
                  Complete order for ₦{total.toLocaleString()}
                </button>
              </form>
            </div>

            <div className="bg-gray-800 p-4 rounded space-y-3">
              <h4 className="font-semibold">Payment details</h4>
              <p className="text-gray-300">Send your payment to the account below, then share proof to WhatsApp.</p>
              <div className="text-white font-semibold">09071059559</div>
              <div className="text-gray-300">Account name: Tajudeen Oluwatobiloba</div>
              <div className="text-gray-300">Account number: 9071059559</div>
              <div className="text-gray-300">Wallet: Opay</div>
              <a
                href={`https://wa.me/2349071059559?text=${encodeURIComponent(
                  `Hello, I have paid ₦${total.toLocaleString()} for my design order. My reference is ${paymentRef.trim() || 'N/A'}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Send proof on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
