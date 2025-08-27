'use client';

import { useState } from 'react';

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
}

export default function Messages() {
  const [messages] = useState<Message[]>([
    { id: '1', sender: 'John Doe', content: 'Hey team, how is the project going?', time: '10:30 AM', isMe: false },
    { id: '2', sender: 'You', content: 'Going well! Just finished the UI design.', time: '10:32 AM', isMe: true },
    { id: '3', sender: 'Jane Smith', content: 'Great work! Can you share the mockups?', time: '10:35 AM', isMe: false },
    { id: '4', sender: 'Alice Brown', content: 'The client feedback looks positive so far.', time: '11:15 AM', isMe: false },
    { id: '5', sender: 'You', content: 'I\'ll upload the files to the shared drive.', time: '11:20 AM', isMe: true },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage('');
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      
      <div className="flex-1 bg-white rounded border p-4 mb-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isMe 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}>
                {!message.isMe && (
                  <p className="text-xs font-semibold mb-1">{message.sender}</p>
                )}
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}