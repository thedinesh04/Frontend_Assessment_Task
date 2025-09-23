import useFetchData from '../hooks/useFetchData'
import { tableFeaturesUtils } from '../utils/tableFeaturesUtils'

export default function DataTable() {
    const { data, loading, error } = useFetchData()

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>
    }
    if (error) {
        return <p className="text-center mt-10 text-red-600">Error: {error}</p>
    }
    console.log('Data:', data)

    // console.log(
    //     'Sorted by Name ASC:',
    //     tableFeaturesUtils.sortData(data, 'name', 'asc'),
    // )

    console.log('Filter Active:', tableFeaturesUtils.filterData(data, 'Active'))

    // console.log(
    //     "Search for 'chelsey':",
    //     tableFeaturesUtils.searchData(data, 'chelsey'),
    // )

    return <h1>Hello</h1>
}
