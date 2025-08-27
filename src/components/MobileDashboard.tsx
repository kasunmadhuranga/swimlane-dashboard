'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types/task';
import Swimlane from './Swimlane';
import AddTaskModal from './AddTaskModal';
import StatusBadge from './StatusBadge';

interface MobileDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function MobileDashboard({ currentView, setCurrentView }: MobileDashboardProps) {
  const { filteredTasks, updateTaskStatus, loadBoards, getCurrentBoard } = useTaskStore();
  const [lastUpdated, setLastUpdated] = useState('04 April, 2022');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Task['status']>('todo');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <img src="/images/logo.png" alt="" className="w-5 h-5" />
            <h1 className="text-xs font-semibold text-gray-900">Board <span className='text-primary'>App</span></h1>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center space-x-1"
          >
            <span>Add</span>
            <img src="/images/other-icons/Plus-2.svg" alt="Add" className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)}>
          <div className="w-[280px] h-full bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setShowMobileMenu(false)} className="p-2 hover:bg-gray-100 rounded">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="p-4 space-y-2">
              <button 
                onClick={() => { setCurrentView('dashboard'); setShowMobileMenu(false); }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-50 text-sidebar-text text-base font-medium"
              >
                <img src="/images/side-bar-icons/dashboard.png" alt="Dashboard" className="w-6 h-6" />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => { setCurrentView('messages'); setShowMobileMenu(false); }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-50 text-sidebar-text text-base font-medium"
              >
                <img src="/images/side-bar-icons/messages.png" alt="Messages" className="w-6 h-6" />
                <span>Messages</span>
              </button>
              <button 
                onClick={() => { setCurrentView('calendar'); setShowMobileMenu(false); }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-50 text-sidebar-text text-base font-medium"
              >
                <img src="/images/side-bar-icons/calendar.png" alt="Calendar" className="w-6 h-6" />
                <span>Calendar</span>
              </button>
              <button 
                onClick={() => { setCurrentView('team'); setShowMobileMenu(false); }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-50 text-sidebar-text text-base font-medium"
              >
                <img src="/images/side-bar-icons/team-members.png" alt="Team Members" className="w-6 h-6" />
                <span>Team Members</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Content */}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-neutral-1 mb-1">{currentBoard?.name || 'Board'}</h2>
          <p className="text-sm text-neutral-5">Last updated: {lastUpdated}</p>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <StatusBadge status="todo">To Do</StatusBadge>
                <button onClick={() => handleAddTask('todo')} className="p-2">
                  <img src="/images/other-icons/Union.svg" alt="Add" className="w-4 h-4" />
                </button>
              </div>
              <Swimlane title="To Do" status="todo" tasks={todoTasks} onAddTask={() => handleAddTask('todo')} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <StatusBadge status="in-progress">In Progress</StatusBadge>
                <button onClick={() => handleAddTask('in-progress')} className="p-2">
                  <img src="/images/other-icons/Union.svg" alt="Add" className="w-4 h-4" />
                </button>
              </div>
              <Swimlane title="In Progress" status="in-progress" tasks={inProgressTasks} onAddTask={() => handleAddTask('in-progress')} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <StatusBadge status="approved">Approved</StatusBadge>
                <button onClick={() => handleAddTask('approved')} className="p-2">
                  <img src="/images/other-icons/Union.svg" alt="Add" className="w-4 h-4" />
                </button>
              </div>
              <Swimlane title="Approved" status="approved" tasks={approvedTasks} onAddTask={() => handleAddTask('approved')} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <StatusBadge status="reject">Reject</StatusBadge>
                <button onClick={() => handleAddTask('reject')} className="p-2">
                  <img src="/images/other-icons/Union.svg" alt="Add" className="w-4 h-4" />
                </button>
              </div>
              <Swimlane title="Reject" status="reject" tasks={rejectTasks} onAddTask={() => handleAddTask('reject')} />
            </div>
          </div>
        </DragDropContext>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={selectedStatus}
      />
    </div>
  );
}