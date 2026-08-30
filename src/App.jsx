import React from 'react'
import Layout from './components/layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RepoProfile from './pages/RepoProfile'
import Compare from './pages/Compare'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Routes>
         <Route path='/' element={<Layout/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='repo/:owner/:repo' element={<RepoProfile/>} />
          <Route path='/compare' element={<Compare/>} />
          <Route path='*' element={<NotFound/>} />
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App