import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1 className="bg-red-400 text-black text-3xl py-10 text-center">
                Test
            </h1>
        </>
    )
}

export default App
