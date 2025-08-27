'use client';

import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import CreateBoardModal from './CreateBoardModal';

export default function Header() {
  const { searchQuery, setSearchQuery } = useTaskStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and App Name */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center">
            <img src="/images/logo.png" alt="" className="w-5 h-5" />
          </div>
          <h1 className="text-xs font-semibold text-gray-900">Board <span className='text-primary'>App</span></h1>
        </div>

        {/* Right side - Create Board Button, Search, Settings, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Create New Board Button */}
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-primary hover:shadow-md text-white px-4 py-2 h-[48px] rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
          >
            <span>Create New Board</span>
            <img src="/images/other-icons/Plus-2.svg" alt="Add" className="w-4 h-4" />
          </button>

          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <img src="/images/other-icons/Search.svg" alt="Add" className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[394px] pl-10 pr-3 font-normal py-2 border text-xs h-[48px] border-gray-300 rounded-lg leading-5 text-neutral-5 bg-neutral-7 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Settings, Notification, Profile with reduced spacing */}
          <div className="flex items-center space-x-1">
            {/* Settings Icon */}
            <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
              <img src="/images/other-icons/Settings.png" alt="Settings" className="h-6 w-6" />
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
              <img src="/images/other-icons/Notification-Bell.png" alt="Notifications" className="h-6 w-6" />
              {/* Notification dot */}
            </button>

            {/* Profile Image */}
            <div className="relative pl-2">
              <button className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
                <img
                  className="h-[30px] w-[30px] rounded-full object-cover"
                  src="/images/profile.png"
                  alt="Profile"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <CreateBoardModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </header>
  );
}