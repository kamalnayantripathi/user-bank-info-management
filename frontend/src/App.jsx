import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import Header from "./components/Header"
import Home from './pages/Home'
import Profile from './pages/Profile'
import AdminProfile from './pages/AdminProfile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        < Header />
        <Routes>
          <Route path='/' element={< Home />}></Route>
          <Route path='/my-profile' element={< Profile />}></Route>
          <Route path='/admin-profile' element={< AdminProfile />}></Route>
        </Routes>
        <ToastContainer
          position="top-center"  
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </>
  )
}

export default App
