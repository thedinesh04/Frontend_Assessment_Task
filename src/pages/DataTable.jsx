import { useState } from 'react'
import useFetchData from '../hooks/useFetchData'
import { tableFeaturesUtils } from '../utils/tableFeaturesUtils'
import SearchBox from '../components/SearchBox'
import FilterDropdown from '../components/FilterDropdown'
import TableHeader from '../components/TableHeader'

export default function DataTable() {
    const { data, loading, error } = useFetchData()

    const [searchText, setSearchText] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [sortKey, setSortKey] = useState('name')
    const [sortOrder, setSortOrder] = useState('asc')

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>
    }
    if (error) {
        return <p className="text-center mt-10 text-red-600">Error: {error}</p>
    }
    // console.log('Data:', data)

    // console.log(
    //     'Sorted by Name ASC:',
    //     tableFeaturesUtils.sortData(data, 'name', 'asc'),
    // )

    // console.log('Filter Active:', tableFeaturesUtils.filterData(data, 'Active'))

    // console.log(
    //     "Search for 'chelsey':",
    //     tableFeaturesUtils.searchData(data, 'chelsey'),
    // )

    // 1. Search
    let visibleUsers = tableFeaturesUtils.searchData(data, searchText)

    // 2. Filter
    visibleUsers = tableFeaturesUtils.filterData(visibleUsers, statusFilter)

    // 3. Sort
    visibleUsers = tableFeaturesUtils.sortData(visibleUsers, sortKey, sortOrder)

    const handleSort = (key, order) => {
        setSortKey(key)
        setSortOrder(order)
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User List</h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="w-full sm:w-96">
                    <SearchBox onSearch={setSearchText} />
                </div>
                <div className="w-full sm:w-48 ml-auto -mb-4">
                    <FilterDropdown
                        selectedStatus={statusFilter}
                        onStatusChange={setStatusFilter}
                    />
                </div>
            </div>

            <div className="overflow-x-auto border rounded-lg shadow-sm">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-gray-700">
                        <TableHeader
                            sortKey={sortKey}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                        />
                    </thead>
                    <tbody>
                        {visibleUsers.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-6 text-gray-500 italic"
                                >
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            visibleUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2">{user.id}</td>
                                    <td className="px-4 py-2 font-medium">
                                        {user.name}
                                    </td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded ${
                                                user.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
