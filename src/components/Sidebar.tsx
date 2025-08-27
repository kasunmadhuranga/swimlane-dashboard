'use client';

import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isBoardsOpen, setIsBoardsOpen] = useState(false);
  const { boards, currentBoardId, switchBoard } = useTaskStore();

  return (
    <div className="w-[288px] bg-white border-r border-gray-200 h-screen relative">
      {/* Workspace Dropdown */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
          className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
        >
          <div className='flex'>
            <div>
              <img src="/images/profile.png" alt="" className="w-11 h-11" />   
            </div>
            <div className='pl-3'>
              <span className="font-normal text-sm text-neutral-5">Workspace</span>
              <span className="font-medium text-base text-dark-bg block">Root folder</span>
            </div>
          </div>
          <svg className={`w-[10px] h-auto transition-transform ${isWorkspaceOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className={`p-4 space-y-2 transition-all duration-300 overflow-hidden ${isWorkspaceOpen ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'}`}>
        <button 
          onClick={() => setCurrentView('dashboard')}
          className="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-gray-50 text-sidebar-text text-base font-medium"
        >
          <img src="/images/side-bar-icons/dashboard.png" alt="Dashboard" className="w-6 h-6" />
          <span>Dashboard</span>
        </button>

        <div>
          <button
            onClick={() => setIsBoardsOpen(!isBoardsOpen)}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 text-sidebar-text text-base font-medium"
          >
            <div className="flex items-center space-x-3">
              <img src="/images/side-bar-icons/dropdown.png" alt="Boards" className="w-6 h-6" />
              <span>Boards</span>
            </div>
            <svg className={`w-[10px] h-auto transition-transform ${isBoardsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Board List */}
          {isBoardsOpen && (
            <div className="ml-8 mt-1 space-y-1">
              {boards.map((board) => (
                <button
                  key={board.id}
                  onClick={() => { switchBoard(board.id); setIsBoardsOpen(false); setCurrentView('dashboard'); }}
                  className={`w-full text-left p-2 font-medium rounded text-sm truncate ${
                    currentBoardId === board.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-50 text-sidebar-text'
                  }`}
                  title={board.name}
                >
                  {board.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={() => setCurrentView('messages')}
          className="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-gray-50 text-sidebar-text text-base font-medium"
        >
          <img src="/images/side-bar-icons/messages.png" alt="Messages" className="w-6 h-6" />
          <span>Messages</span>
        </button>

        <button 
          onClick={() => setCurrentView('calendar')}
          className="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-gray-50 text-sidebar-text text-base font-medium"
        >
          <img src="/images/side-bar-icons/calendar.png" alt="Calendar" className="w-6 h-6" />
          <span>Calendar</span>
        </button>

        <button 
          onClick={() => setCurrentView('team')}
          className="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-gray-50 text-sidebar-text text-base font-medium"
        >
          <img src="/images/side-bar-icons/team-members.png" alt="Team Members" className="w-6 h-6" />
          <span>Team Members</span>
        </button>
      </nav>
      
      {/* Bottom Buttons */}
      <div className="fixed bottom-4 left-4 w-[256px] space-y-2">
        <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 text-sidebar-text text-base font-medium">
          <img src="/images/other-icons/Info-Circle.svg" alt="info" className="h-6 w-6" />
          <span>Support</span>
        </button>
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="w-full flex items-center space-x-3 p-2 rounded-lg bg-dark-bg text-white hover:opacity-90 text-base font-medium"
        >
          <img src="/images/other-icons/Sign-Out.svg" alt="signout" className="h-6 w-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}