import useFetchData from '../hooks/useFetchData'

export default function DataTable() {
    const { data, loading, error } = useFetchData()

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>
    }
    if (error) {
        return <p className="text-center mt-10 text-red-600">Error: {error}</p>
    }
    console.log('Data:', data)
    return <h1>Hello</h1>
}
