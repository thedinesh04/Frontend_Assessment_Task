import { useState, useEffect } from 'react'
import './App.css'
import DataTable from './pages/DataTable'
import useFetchData from './hooks/useFetchData'

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <DataTable />
        </div>
    )
}

export default App
