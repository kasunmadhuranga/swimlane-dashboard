export interface Task {
  id: string;
  category: 'Research' | 'Design' | 'Feedback' | 'Presentation' | 'UX Research' | 'Interface' | 'Other';
  title: string;
  status: 'todo' | 'in-progress' | 'approved' | 'reject';
  priority: 'Low' | 'Medium' | 'High';
  assignees: string[];
  image?: string;
  attachments?: number;
  comments?: number;
  dueDate?: string;
  notification?: 'Group call' | 'Stream';
  reports?: number;
  createdAt: string;
}

export interface Board {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: string;
}