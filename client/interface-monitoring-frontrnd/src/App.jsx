import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import Dashboard from "@/components/Dashboard";
import Dashboard_2 from '@/app/dashboard/page';
import './App.css'
import LiveInterfaceLogsTable from './components/LiveInterfaceLogsTable';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <p className="text-red-400">
        Click on the Vite and React logos to learn more
      </p>
      
      <Button>Click me </Button> */}
      <div className='light'>
        {/* <Dashboard /> */}
        <Dashboard_2 />
        {/* <LiveInterfaceLogsTable/> */}
      </div>
    </>
  )
}

export default App
