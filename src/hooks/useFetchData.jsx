import { useState, useEffect } from 'react'

export default function useFetchData() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/users',
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                let users = await response.json()

                users = users.map((user) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
                }))
                setData(users)
                setError(null)
            } catch (error) {
                setError(error.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { data, setData, loading, error }
}
