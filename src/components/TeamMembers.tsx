'use client';

import { useState, useEffect } from 'react';
import { useTeamStore } from '@/store/teamStore';

export default function TeamMembers() {
  const { members, addMember, removeMember, loadMembers } = useTeamStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const handleAddMember = () => {
    if (newMember.name && newMember.email && newMember.role) {
      addMember(newMember);
      setNewMember({ name: '', email: '', role: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Member
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded mb-4">
          <h3 className="font-semibold mb-3">Add New Member</h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              className="border rounded px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Role"
              value={newMember.role}
              onChange={(e) => setNewMember({...newMember, role: e.target.value})}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex space-x-2">
            <button onClick={handleAddMember} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
              Add
            </button>
            <button onClick={() => setShowAddForm(false)} className="bg-gray-600 text-white px-3 py-1 rounded text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {members.map((member) => (
          <div key={member.id} className="bg-white p-4 rounded border flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src="/images/profile.png" alt="Profile" className="w-10 h-10 rounded-full" />
              <div>
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.email}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>
            <button
              onClick={() => removeMember(member.id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}