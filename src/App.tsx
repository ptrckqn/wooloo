import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className='container mx-auto max-w-screen-lg p-2 md:p-8'>
      <Link to={'/'}>
        <h1 className='cursor-pointer text-5xl font-semibold'>🐑 Wooloo</h1>
      </Link>

      <Outlet />
    </div>
  )
}

export default App
