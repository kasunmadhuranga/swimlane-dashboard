'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { useTaskStore } from '@/store/taskStore';
import { useTeamStore } from '@/store/teamStore';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: Task['status'];
  task?: Task;
}

export default function AddTaskModal({ isOpen, onClose, status, task }: AddTaskModalProps) {
  const { addTask, updateTask } = useTaskStore();
  const { members, loadMembers } = useTeamStore();
  const [formData, setFormData] = useState<{
    category: Task['category'];
    title: string;
    priority: Task['priority'];
    assignees: string[];
    dueDate: string;
  }>({
    category: (task?.category || 'Design') as Task['category'],
    title: task?.title || '',
    priority: (task?.priority || 'Low') as Task['priority'],
    assignees: task?.assignees || [],
    dueDate: task?.dueDate || '',
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState<string[]>([]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  useEffect(() => {
    if (isOpen) {
      setCurrentInput('');
      setShowSuggestions(false);
      setFormData({
        category: (task?.category || 'Design') as Task['category'],
        title: task?.title || '',
        priority: (task?.priority || 'Low') as Task['priority'],
        assignees: task?.assignees || [],
        dueDate: task?.dueDate || '',
      });
    }
  }, [isOpen, task]);

  const [currentInput, setCurrentInput] = useState('');

  const handleAssigneeChange = (value: string) => {
    setCurrentInput(value);
    if (value) {
      const filtered = members
        .map(member => member.name)
        .filter(name => 
          name.toLowerCase().includes(value.toLowerCase()) &&
          !formData.assignees.includes(name)
        );
      setFilteredMembers(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectMember = (member: string) => {
    setFormData({...formData, assignees: [...formData.assignees, member]});
    setCurrentInput('');
    setShowSuggestions(false);
  };

  const removeMember = (memberToRemove: string) => {
    setFormData({
      ...formData, 
      assignees: formData.assignees.filter(member => member !== memberToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    if (formData.assignees.length === 0) {
      alert('Please assign at least one team member');
      return;
    }
    
    if (task) {
      // Update existing task
      const updatedTask: Task = {
        ...task,
        category: formData.category,
        title: formData.title,
        priority: formData.priority,
        assignees: formData.assignees.filter(a => a.trim()),
        ...(formData.dueDate && { dueDate: formData.dueDate }),
      };
      updateTask(updatedTask);
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        category: formData.category,
        title: formData.title,
        status,
        priority: formData.priority,
        assignees: formData.assignees.filter(a => a.trim()),
        ...(formData.dueDate && { dueDate: formData.dueDate }),
        createdAt: new Date().toISOString().split('T')[0],
      };
      addTask(newTask);
    }
    setFormData({ category: 'Design', title: '', priority: 'Low', assignees: [], dueDate: '' });
    setCurrentInput('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">{task ? 'Update Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as Task['category']})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Research">Research</option>
              <option value="Design">Design</option>
              <option value="Feedback">Feedback</option>
              <option value="Presentation">Presentation</option>
              <option value="UX Research">UX Research</option>
              <option value="Interface">Interface</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value as Task['priority']})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2">Assignees</label>
            
            {/* Selected Assignees */}
            {formData.assignees.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.assignees.map((assignee, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center">
                    {assignee}
                    <button
                      type="button"
                      onClick={() => removeMember(assignee)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            <input
              type="text"
              value={currentInput}
              onChange={(e) => handleAssigneeChange(e.target.value)}
              onFocus={() => handleAssigneeChange(currentInput)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Add assignee..."
            />
            {showSuggestions && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-b max-h-32 overflow-y-auto">
                {filteredMembers.map((member, index) => (
                  <div
                    key={index}
                    onClick={() => selectMember(member)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {member}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Target Completion Date (Optional)</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 border border-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {task ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}