'use client';

interface ProjectHeaderProps {
  lastUpdated: string;
  boardName: string;
}

export default function ProjectHeader({ lastUpdated, boardName }: ProjectHeaderProps) {
  return (
    <div className="">
      {/* Project Title and Status */}
      <div className="flex items-center space-x-3 mb-3">
        <h2 className="text-2xl font-semibold text-neutral-1">{boardName}</h2>
        <span className="bg-yellow-color px-3 py-1 rounded-[5px] text-[10px]  font-medium">
          In Progress
        </span>
      </div>

      {/* Event Production */}
      <p className="text-neutral-5 text-base mb-3">Event Production</p>

      {/* Assigned Users and Manage Input */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center">
          <span className="text-base text-neutral-5 mr-2">Assigned:</span>
          <div className="flex -space-x-[8px]">
            <img className="w-6 h-6 rounded-full object-cover border-2 border-white" src="/images/profile.png" alt="User 1" />
            <img className="w-6 h-6 rounded-full object-cover border-2 border-white" src="/images/profile.png" alt="User 2" />
            <img className="w-6 h-6 rounded-full object-cover border-2 border-white" src="/images/profile.png" alt="User 3" />
            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[9px] font-semibold text-gray-600">
              +2
            </div>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value="Manage"
            readOnly
            className="bg-gray-50 border border-gray-300 rounded-[46px] px-3 py-1 pr-8 text-xs font-medium focus:outline-none text-neutral-5 w-[101px]"
          />
          <img src="/images/other-icons/Pencil.svg" alt="Edit" className="absolute right-2 top-[6px] w-4 h-4" />
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-200 mb-5" />

      {/* Last Updated */}
      <p className="text-sm text-neutral-5">Last updated on: {lastUpdated}</p>
    </div>
  );
}