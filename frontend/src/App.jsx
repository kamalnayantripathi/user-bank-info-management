import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import Header from "./components/Header"
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        < Header />
        <Routes>
          <Route path='/' element={< Home />}></Route>
          <Route path='/my-profile' element={< Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
