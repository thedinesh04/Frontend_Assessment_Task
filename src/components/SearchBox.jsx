import { useState } from 'react'

export default function SearchBox({ onSearch }) {
    const [inputValue, setInputValue] = useState('')

    const handleSearch = () => {
        onSearch(inputValue)
    }

    const handleClear = () => {
        setInputValue('')
        onSearch('')
    }

    return (
        <div className="flex gap-2 w-full">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search by name or email..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Search
            </button>
            <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
            >
                Clear
            </button>
        </div>
    )
}
