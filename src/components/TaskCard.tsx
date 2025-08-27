import { useState, useEffect, useRef } from 'react';
import { Task } from '@/types/task';
import { useTaskStore } from '@/store/taskStore';
import AddTaskModal from './AddTaskModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface TaskCardProps {
  task: Task;
}

const categoryColors = {
  'Research': 'bg-research',
  'Design': 'bg-design',
  'Feedback': 'bg-feedback',
  'Presentation': 'bg-design',
  'UX Research': 'bg-ux-research',
  'Interface': 'bg-interface',
  'Other': 'bg-other',
};

export default function TaskCard({ task }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { deleteTask } = useTaskStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
    setShowMenu(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-6 mb-3 relative">
      {/* Three dots menu */}
      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 12a2 2 0 110-4 2 2 0 010 4zM12 12a2 2 0 110-4 2 2 0 010 4zM19 12a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
            <button
              onClick={() => { setShowUpdateModal(true); setShowMenu(false); }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Category */}
      <div className="flex items-center mb-2">
        <div className={`w-3 h-3 rounded ${categoryColors[task.category]} mr-2`}></div>
        <span className="text-xs text-neutral-5">{task.category}</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium mb-3">{task.title}</h3>

      {/* Assignees and Priority */}
      <div className="flex  items-center mb-3">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {task.assignees.slice(0, 3).map((_, index) => (
              <img key={index} className="w-6 h-6 rounded-full object-cover border-2 border-white" src="/images/profile.png" alt={`User ${index + 1}`} />
            ))}
            {task.assignees.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[9px] font-semibold text-gray-600">
                +{task.assignees.length - 3}
              </div>
            )}
          </div>
        </div>
        <span className={`ml-2 px-1 py-1 w-[58px] rounded-[5px] text-[8px] text-neutral-5 bg-neutral-7 font-medium flex items-center justify-center space-x-1`}>
          <img src="/images/other-icons/Flash.png" alt="Priority" className="w-3 h-3" />
          <span>{task.priority}</span>
        </span>
      </div>

      {/* Optional Image */}
      {task.image && (
        <div className="mb-3">
          <img src={task.image} alt="Task" className="w-full h-24 object-cover rounded" />
        </div>
      )}

      {/* Horizontal Line */}
      <hr className="border-gray-200 mb-3" />

      {/* Bottom Icons */}
      <div className="flex items-center space-x-4 text-xs font-medium text-sidebar-text leading-none">
        {task.attachments && (
          <div className="flex items-center space-x-1 leading-none">
            <img src="/images/other-icons/Attach.png" alt="Attachment" className="w-4 h-4 flex-shrink-0" />
            <span className="leading-none">{task.attachments}</span>
          </div>
        )}
        {task.comments && (
          <div className="flex items-center space-x-1 leading-none">
            <img src="/images/side-bar-icons/messages.png" alt="Messages" className="w-4 h-4 flex-shrink-0" />
            <span className="leading-none">{task.comments}</span>
          </div>
        )}
        {task.dueDate && (
          <div className="flex items-center space-x-1 leading-none">
            <img src="/images/other-icons/Calendar.png" alt="Calendar" className="w-4 h-4 flex-shrink-0" />
            <span className="leading-none">Due: {task.dueDate}</span>
          </div>
        )}
        {task.notification && (
          <div className="flex items-center space-x-1 text-primary leading-none">
            <img src="/images/other-icons/Bell.png" alt="Report" className="w-4 h-4 flex-shrink-0" />
            <span className="leading-none">{task.notification}</span>
          </div>
        )}
        {task.reports && (
          <div className="flex items-center space-x-1 text-design leading-none">
            <img src="/images/other-icons/Info-Circle.png" alt="Report" className="w-4 h-4 flex-shrink-0" />
            <span className="leading-none">{task.reports} Reports</span>
          </div>
        )}
      </div>
      <AddTaskModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        status={task.status}
        task={task}
      />
    </div>
  );
}