import React from 'react'
import Navbar from './Components/Navbar'
import Admin from './Pages/Admin'

const App = () => {
  return (
    <main className='bg-primary text-tertiary'>
      <Navbar />
      <Admin />
    </main>
  )
}

export default App
