import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Task } from '@/types/task';
import TaskCard from './TaskCard';
import StatusBadge from './StatusBadge';

interface SwimlaneProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  onAddTask: () => void;
  isTableLayout?: boolean;
}

const statusColors = {
  'todo': 'bg-gray-50 border-gray-200',
  'in-progress': 'bg-blue-50 border-blue-200',
  'approved': 'bg-green-50 border-green-200',
  'reject': 'bg-red-50 border-red-200',
};

export default function Swimlane({ title, status, tasks, onAddTask, isTableLayout = false }: SwimlaneProps) {
  if (isTableLayout) {
    return (
      <div className={`p-4 ${status !== 'reject' ? 'border-r border-neutral-6' : ''}`}>
        <Droppable droppableId={status}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-h-96 space-y-3 ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}`}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? 'rotate-2 scale-105' : ''} transition-transform`}
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }

  return (
    <div className={`flex-1 min-w-64 p-4 rounded-lg border-2 ${statusColors[status]}`}>
      <div className="flex justify-between items-center mb-4">
        <StatusBadge status={status}>{title}</StatusBadge>
        <button
          onClick={onAddTask}
          className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-96 ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${snapshot.isDragging ? 'rotate-2 scale-105' : ''} transition-transform`}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}