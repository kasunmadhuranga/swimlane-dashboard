'use client';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onDrop={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      <div 
        className="bg-white rounded-lg p-6 w-96 cursor-default"
        draggable={false}
        onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); return false; }}
        onDrag={(e) => { e.preventDefault(); e.stopPropagation(); return false; }}
        onDragEnd={(e) => { e.preventDefault(); e.stopPropagation(); return false; }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDrop={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onMouseDown={(e) => e.stopPropagation()}
        style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }}
      >
        <h2 className="text-lg font-semibold mb-2">Delete Task</h2>
        <p className="text-gray-600 mb-4">Are you sure you want to delete "{title}"? This action cannot be undone.</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}