import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dashboard_2 from '@/app/dashboard/page';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='light'>
        <Dashboard_2 />
      </div>
    </>
  )
}

export default App
