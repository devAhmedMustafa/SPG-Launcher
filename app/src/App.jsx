import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@Components/Layouts/Layout'
import Main from '@Pages/Main'
import Game from '@Pages/GameLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path='/:game' element={<Game/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
