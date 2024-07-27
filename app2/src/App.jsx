import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../../Frontend/src/pages/NotFound';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
          <Route path="*" element={<NotFound />}  />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
