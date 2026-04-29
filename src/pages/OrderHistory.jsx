import { useEffect, useState } from 'react'

const OrderHistory = ({ user, userName }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`userOrders_${user}`)
      setOrders(stored ? JSON.parse(stored) : [])
    } catch (e) {
      setOrders([])
    }
  }, [user])

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Order History</h2>
      <p className="text-gray-300 mb-6">Orders for {userName || user}. Your completed payments and proof requests are listed below.</p>

      {orders.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded">No orders found yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <div>
                  <div className="text-sm text-blue-300">Order ID: {order.id}</div>
                  <div className="text-white font-semibold text-lg mt-1">₦{order.total.toLocaleString()}</div>
                </div>
                <div className="text-gray-300 text-sm">{new Date(order.date).toLocaleString()}</div>
              </div>
              <div className="mt-4 text-gray-200">Payment reference: {order.paymentRef}</div>
              {order.notes && <div className="mt-2 text-gray-300">Notes: {order.notes}</div>}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {order.items.map(item => (
                  <div key={item.id} className="bg-gray-900 p-4 rounded">
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-gray-400 text-sm">Qty: {item.qty}</div>
                    <div className="text-blue-300 text-sm">₦{((item.price||0)*(item.qty||1)).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderHistory
