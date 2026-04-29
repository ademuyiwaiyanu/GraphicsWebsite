import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = ({ onAuth }) => {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  function getAccounts() {
    return JSON.parse(localStorage.getItem('accounts') || '{}')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail) {
      alert('Please enter your email.')
      return
    }

    const accounts = getAccounts()

    if (mode === 'signin') {
      if (!accounts[normalizedEmail]) {
        alert('No account found. Please register first.')
        return
      }
      onAuth({ email: normalizedEmail, name: accounts[normalizedEmail].name })
      navigate('/designs')
      return
    }

    const displayName = name.trim()
    if (!displayName) {
      alert('Please enter your name to register.')
      return
    }

    if (accounts[normalizedEmail]) {
      alert('This email is already registered. Please sign in.')
      setMode('signin')
      return
    }

    accounts[normalizedEmail] = { name: displayName }
    localStorage.setItem('accounts', JSON.stringify(accounts))
    onAuth({ email: normalizedEmail, name: displayName })
    navigate('/designs')
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{mode === 'signin' ? 'Sign In' : 'Register'}</h2>
      <p className="text-gray-300 mb-6">
        {mode === 'signin'
          ? 'Sign in to keep your cart private and save your orders.'
          : 'Create an account to store your cart and order history.'}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
        />
        {mode === 'register' && (
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full name"
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
          />
        )}
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded">
          {mode === 'signin' ? 'Sign In' : 'Register'}
        </button>
      </form>
      <div className="mt-4 text-sm text-gray-400">
        {mode === 'signin' ? (
          <p>
            New here?{' '}
            <button type="button" onClick={() => setMode('register')} className="text-blue-300 underline">
              Create an account
            </button>
          </p>
        ) : (
          <p>
            Already registered?{' '}
            <button type="button" onClick={() => setMode('signin')} className="text-blue-300 underline">
              Sign in instead
            </button>
          </p>
        )}
      </div>
    </div>
  )
}

export default SignIn
