import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1 className='text-3xl font-bold'>Good morning!</h1> */}
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
