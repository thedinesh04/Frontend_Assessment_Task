import { useState, useEffect, useMemo } from 'react'
import useFetchData from '../hooks/useFetchData'
import { tableFeaturesUtils } from '../utils/tableFeaturesUtils'
import SearchBox from '../components/SearchBox'
import FilterDropdown from '../components/FilterDropdown'
import TableHeader from '../components/TableHeader'
import Pagination from '../components/Pagination'
import ActionsMenu from '../components/ActionsMenu'

export default function DataTable() {
    const { data, loading, error } = useFetchData()

    const [users, setUsers] = useState([])
    const [searchText, setSearchText] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [sortKey, setSortKey] = useState('id')
    const [sortOrder, setSortOrder] = useState('asc')

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const [selectedRows, setSelectedRows] = useState([])

    useEffect(() => {
        if (Array.isArray(data)) setUsers(data)
    }, [data])

    if (loading) return <p className="text-center mt-10">Loading...</p>
    if (error)
        return <p className="text-center mt-10 text-red-600">Error: {error}</p>

    let visibleUsers = tableFeaturesUtils.searchData(users, searchText)
    visibleUsers = tableFeaturesUtils.filterData(visibleUsers, statusFilter)
    visibleUsers = tableFeaturesUtils.sortData(visibleUsers, sortKey, sortOrder)

    // sorting handler
    const handleSort = (key) => {
        if (sortKey === key) setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
        else {
            setSortKey(key)
            setSortOrder('asc')
        }
    }

    // pagination
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedUsers = visibleUsers.slice(
        startIndex,
        startIndex + itemsPerPage,
    )
    const totalPages = Math.max(
        1,
        Math.ceil(visibleUsers.length / itemsPerPage),
    )

    // selection handlers
    const toggleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
        )
    }

    const toggleSelectAll = () => {
        const idsOnPage = paginatedUsers.map((u) => u.id)
        const allSelected =
            idsOnPage.length > 0 &&
            idsOnPage.every((id) => selectedRows.includes(id))
        if (allSelected)
            setSelectedRows((prev) =>
                prev.filter((id) => !idsOnPage.includes(id)),
            )
        else setSelectedRows((prev) => [...new Set([...prev, ...idsOnPage])])
    }

    const isRowSelected = (id) => selectedRows.includes(id)
    const isAllSelected =
        paginatedUsers.length > 0 &&
        paginatedUsers.every((u) => selectedRows.includes(u.id))

    // ACTIONS
    const handleEdit = (row) => {
        console.log('Edit row:', row)
        alert(
            `Row data for "${row.name}" has been logged in the console. Please check console for details.`,
        )
    }

    const handleDelete = (id) => {
        setUsers((prev) => prev.filter((u) => u.id !== id))
        setSelectedRows((prev) => prev.filter((r) => r !== id))
    }

    const handleToggleStatus = (id) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === id
                    ? {
                          ...u,
                          status: u.status === 'Active' ? 'Inactive' : 'Active',
                      }
                    : u,
            ),
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold mb-4">User List</h1>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-full sm:w-96">
                        <SearchBox onSearch={setSearchText} />
                    </div>
                </div>

                <div className="ml-auto w-full sm:w-48">
                    <FilterDropdown
                        selectedStatus={statusFilter}
                        onStatusChange={setStatusFilter}
                    />
                </div>
            </div>

            <div className="overflow-x-auto border rounded-lg shadow-sm">
                <table className="w-full table-fixed bg-white">
                    <thead className="bg-green-200 text-gray-700">
                        <TableHeader
                            isAllSelected={isAllSelected}
                            onSelectAll={toggleSelectAll}
                            sortKey={sortKey}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                        />
                    </thead>

                    <tbody>
                        {paginatedUsers.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-6 text-gray-500 italic"
                                >
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            paginatedUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className={`border-b hover:bg-gray-50 ${
                                        isRowSelected(user.id)
                                            ? 'bg-blue-100'
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <td className="px-4 py-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={isRowSelected(user.id)}
                                            onChange={() =>
                                                toggleSelectRow(user.id)
                                            }
                                        />
                                    </td>

                                    <td className="px-4 py-4 text-sm w-16">
                                        {user.id}
                                    </td>
                                    <td
                                        className="px-4 py-4 text-sm"
                                        style={{ width: '28%' }}
                                    >
                                        {user.name}
                                    </td>
                                    <td
                                        className="px-4 py-4 text-sm"
                                        style={{ width: '36%' }}
                                    >
                                        {user.email}
                                    </td>

                                    <td className="px-4 py-4 text-sm w-32">
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

                                    <td className="px-4 py-4 text-right w-40">
                                        <ActionsMenu
                                            user={user}
                                            onEdit={handleEdit}
                                            onDelete={(id) => {
                                                if (
                                                    window.confirm(
                                                        `Delete user ${user.name}?`,
                                                    )
                                                )
                                                    handleDelete(id)
                                            }}
                                            onToggleStatus={handleToggleStatus}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="px-6 py-4 bg-white border-t flex items-center justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(p) => setCurrentPage(p)}
                    />
                </div>
            </div>
        </div>
    )
}
