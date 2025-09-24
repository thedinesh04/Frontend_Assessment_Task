import { Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'

export default function ActionsMenu({
    user,
    onEdit,
    onDelete,
    onToggleStatus,
}) {
    if (!user) return null

    return (
        <div className="flex items-center justify-end gap-3">
            <button
                onClick={() => onEdit && onEdit(user)}
                title="Edit"
                className="p-1"
                aria-label={`Edit ${user.name}`}
            >
                <Edit className="w-5 h-5 text-blue-600 hover:text-blue-800" />
            </button>

            <button
                onClick={() => onDelete && onDelete(user.id)}
                title="Delete"
                className="p-1"
                aria-label={`Delete ${user.name}`}
            >
                <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
            </button>

            <button
                onClick={() => onToggleStatus && onToggleStatus(user.id)}
                title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                className="p-1"
                aria-label={`${
                    user.status === 'Active' ? 'Deactivate' : 'Activate'
                } ${user.name}`}
            >
                {user.status === 'Active' ? (
                    <ToggleRight className="w-5 h-5 text-green-600" />
                ) : (
                    <ToggleLeft className="w-5 h-5 text-gray-400" />
                )}
            </button>
        </div>
    )
}
