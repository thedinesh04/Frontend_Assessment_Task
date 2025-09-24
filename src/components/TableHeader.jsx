export default function TableHeader({
    isAllSelected,
    onSelectAll,
    sortKey,
    sortOrder,
    onSort,
}) {
    const indicator = (col) => {
        if (sortKey !== col)
            return <span className="text-xs opacity-40">⇅</span>
        return (
            <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
        )
    }

    return (
        <tr>
            <th className="px-4 py-3 w-12 text-left">
                <input
                    type="checkbox"
                    checked={!!isAllSelected}
                    onChange={onSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
            </th>

            <th
                className="text-left px-3 py-3  text-md font-medium text-black uppercase tracking-wider cursor-pointer w-16 "
                onClick={() => onSort('id')}
            >
                ID {indicator('id')}
            </th>

            <th
                className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('name')}
                style={{ width: '28%' }}
            >
                Name {indicator('name')}
            </th>

            <th
                className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('email')}
                style={{ width: '36%' }}
            >
                Email {indicator('email')}
            </th>

            <th className="px-6 py-3 text-left text-md font-medium text-black  uppercase tracking-wider w-32">
                Status
            </th>

            <th className="px-6 py-3  text-md font-medium text-black uppercase tracking-wider w-40">
                Actions
            </th>
        </tr>
    )
}
