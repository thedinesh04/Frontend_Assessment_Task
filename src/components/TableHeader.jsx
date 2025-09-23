export default function TableHeader({ sortKey, sortOrder, onSort }) {
    const handleSort = (key) => {
        const newOrder = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc'
        onSort(key, newOrder)
    }

    const renderIndicator = (key) => {
        if (sortKey !== key) return '↕'
        return sortOrder === 'asc' ? '↑' : '↓'
    }

    return (
        <tr>
            <th className="px-4 py-2 text-left cursor-pointer hover:underline">
                ID
            </th>
            <th
                className="px-4 py-2 text-left cursor-pointer hover:underline"
                onClick={() => handleSort('name')}
            >
                Name {renderIndicator('name')}
            </th>
            <th
                className="px-4 py-2 text-left cursor-pointer hover:underline"
                onClick={() => handleSort('email')}
            >
                Email {renderIndicator('email')}
            </th>
            <th className="px-4 py-2 text-left">Status</th>
        </tr>
    )
}
