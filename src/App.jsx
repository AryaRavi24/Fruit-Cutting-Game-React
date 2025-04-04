import { useState } from 'react'
// import score from "../src/assets/images/score"
import Home from "../src/pages/Home"
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>}></Route>
    </Routes>
      
    </>
  )
}

export default App
