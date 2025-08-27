'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types/task';
import Header from './Header';
import Sidebar from './Sidebar';
import ProjectHeader from './ProjectHeader';
import Swimlane from './Swimlane';
import AddTaskModal from './AddTaskModal';
import TeamMembers from './TeamMembers';
import Messages from './Messages';
import Calendar from './Calendar';
import StatusBadge from './StatusBadge';
import MobileDashboard from './MobileDashboard';

export default function Dashboard() {
  const { filteredTasks, updateTaskStatus, loadBoards, getCurrentBoard } = useTaskStore();
  const [lastUpdated, setLastUpdated] = useState('04 April, 2022');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Task['status']>('todo');
  const [currentView, setCurrentView] = useState('dashboard');
  const currentBoard = getCurrentBoard();

  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || result.source.droppableId === result.destination.droppableId) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as Task['status'];

    updateTaskStatus(draggableId, newStatus);
    setLastUpdated(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }));
  };

  const handleAddTask = (status: Task['status']) => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  };

  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const approvedTasks = filteredTasks.filter(task => task.status === 'approved');
  const rejectTasks = filteredTasks.filter(task => task.status === 'reject');

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
          <div className="w-[calc(100vw-288px)]">
            {currentView === 'dashboard' && (
            <div>
              <div className="p-6 bg-white">
                <ProjectHeader lastUpdated={lastUpdated} boardName={currentBoard?.name || 'Board'} />

              </div>
              <div>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <div className="bg-white border border-neutral-6 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 bg-white">
                      <div className="p-4 border-r border-neutral-6 flex justify-between items-center">
                        <StatusBadge status="todo">To Do</StatusBadge>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAddTask('todo')}
                            className="w-6 h-6 flex items-center justify-center"
                          >
                            <img src="/images/other-icons/Union.svg" alt="Add" className="w-4 h-4" />
                          </button>
                          <img src="/images/other-icons/Vector.svg" alt="More" className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-4 border-r border-neutral-6 flex justify-between items-center">
                        <StatusBadge status="in-progress">In Progress</StatusBadge>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAddTask('in-progress')}
                            className="w-6 h-6 flex items-center justify-center"
                          >
                            <img src="/images/other-icons/Union.svg" alt="Add" className="w-4 h-4" />
                          </button>
                          <img src="/images/other-icons/Vector.svg" alt="More" className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-4 border-r border-neutral-6 flex justify-between items-center">
                        <StatusBadge status="approved">Approved</StatusBadge>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAddTask('approved')}
                            className="w-6 h-6 flex items-center justify-center"
                          >
                            <img src="/images/other-icons/Union.svg" alt="Add" className="w-4 h-4" />
                          </button>
                          <img src="/images/other-icons/Vector.svg" alt="More" className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <StatusBadge status="reject">Reject</StatusBadge>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAddTask('reject')}
                            className="w-6 h-6 flex items-center justify-center"
                          >
                            <img src="/images/other-icons/Union.svg" alt="Add" className="w-4 h-4" />
                          </button>
                          <img src="/images/other-icons/Vector.svg" alt="More" className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Table Body */}
                    <div className="grid grid-cols-4 bg-[#f4f5f6] border-t border-neutral-6 min-h-96">
                      <Swimlane title="To Do" status="todo" tasks={todoTasks} onAddTask={() => handleAddTask('todo')} isTableLayout={true} />
                      <Swimlane title="In Progress" status="in-progress" tasks={inProgressTasks} onAddTask={() => handleAddTask('in-progress')} isTableLayout={true} />
                      <Swimlane title="Approved" status="approved" tasks={approvedTasks} onAddTask={() => handleAddTask('approved')} isTableLayout={true} />
                      <Swimlane title="Reject" status="reject" tasks={rejectTasks} onAddTask={() => handleAddTask('reject')} isTableLayout={true} />
                    </div>
                  </div>
                </DragDropContext>
              </div>
            </div>
          )}
            {currentView === 'team' && <TeamMembers />}
            {currentView === 'messages' && <Messages />}
            {currentView === 'calendar' && <Calendar />}
          </div>
        </div>
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          status={selectedStatus}
        />
      </div>
      
      {/* Mobile Version */}
      <div className="md:hidden">
        {currentView === 'dashboard' && <MobileDashboard currentView={currentView} setCurrentView={setCurrentView} />}
        {currentView === 'team' && <TeamMembers />}
        {currentView === 'messages' && <Messages />}
        {currentView === 'calendar' && <Calendar />}
      </div>
    </>
  );
}