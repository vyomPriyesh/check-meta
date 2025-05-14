import './App.css'
import { useEffect, useState } from 'react'
import Ctg from './Ctg'
import { Route, Routes } from 'react-router-dom'

function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Ctg /> */}
      <Routes>
        <Route path='/:id' element={<Ctg />} />
      </Routes>
    </>
  )
}

export default App
