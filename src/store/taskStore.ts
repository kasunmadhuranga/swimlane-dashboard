import { create } from 'zustand';
import { Task, Board } from '@/types/task';

interface TaskStore {
  boards: Board[];
  currentBoardId: string;
  searchQuery: string;
  filteredTasks: Task[];
  getCurrentBoard: () => Board | undefined;
  createBoard: (name: string) => void;
  switchBoard: (boardId: string) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (task: Task) => void;
  setSearchQuery: (query: string) => void;
  loadBoards: () => Promise<void>;
}

const STORAGE_KEY = 'dashboard-boards';

export const useTaskStore = create<TaskStore>((set, get) => ({
  boards: [],
  currentBoardId: '',
  searchQuery: '',
  filteredTasks: [],

  getCurrentBoard: () => {
    const { boards, currentBoardId } = get();
    return boards.find(board => board.id === currentBoardId);
  },

  createBoard: (name) => {
    const newBoard: Board = {
      id: Date.now().toString(),
      name,
      tasks: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    const { boards } = get();
    const updatedBoards = [...boards, newBoard];
    set({ boards: updatedBoards, currentBoardId: newBoard.id });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBoards));
    get().setSearchQuery('');
  },

  switchBoard: (boardId) => {
    set({ currentBoardId: boardId });
    get().setSearchQuery('');
  },

  updateTaskStatus: (taskId, status) => {
    const { boards, currentBoardId, searchQuery } = get();
    const updatedBoards = boards.map(board => {
      if (board.id === currentBoardId) {
        return {
          ...board,
          tasks: board.tasks.map(task =>
            task.id === taskId ? { ...task, status } : task
          )
        };
      }
      return board;
    });
    const currentBoard = updatedBoards.find(b => b.id === currentBoardId);
    const filteredTasks = filterTasks(currentBoard?.tasks || [], searchQuery);
    set({ boards: updatedBoards, filteredTasks });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBoards));
  },

  addTask: (task) => {
    const { boards, currentBoardId, searchQuery } = get();
    const updatedBoards = boards.map(board => {
      if (board.id === currentBoardId) {
        return { ...board, tasks: [...board.tasks, task] };
      }
      return board;
    });
    const currentBoard = updatedBoards.find(b => b.id === currentBoardId);
    const filteredTasks = filterTasks(currentBoard?.tasks || [], searchQuery);
    set({ boards: updatedBoards, filteredTasks });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBoards));
  },

  deleteTask: (taskId) => {
    const { boards, currentBoardId, searchQuery } = get();
    const updatedBoards = boards.map(board => {
      if (board.id === currentBoardId) {
        return { ...board, tasks: board.tasks.filter(task => task.id !== taskId) };
      }
      return board;
    });
    const currentBoard = updatedBoards.find(b => b.id === currentBoardId);
    const filteredTasks = filterTasks(currentBoard?.tasks || [], searchQuery);
    set({ boards: updatedBoards, filteredTasks });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBoards));
  },

  updateTask: (updatedTask) => {
    const { boards, currentBoardId, searchQuery } = get();
    const updatedBoards = boards.map(board => {
      if (board.id === currentBoardId) {
        return {
          ...board,
          tasks: board.tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
          )
        };
      }
      return board;
    });
    const currentBoard = updatedBoards.find(b => b.id === currentBoardId);
    const filteredTasks = filterTasks(currentBoard?.tasks || [], searchQuery);
    set({ boards: updatedBoards, filteredTasks });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBoards));
  },

  setSearchQuery: (query) => {
    const currentBoard = get().getCurrentBoard();
    const tasks = currentBoard?.tasks || [];
    const filteredTasks = filterTasks(tasks, query);
    set({ searchQuery: query, filteredTasks });
  },

  loadBoards: async () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const boards = JSON.parse(stored);
        set({ boards, currentBoardId: boards[0]?.id || '' });
        get().setSearchQuery('');
        return;
      }

      const response = await fetch('/data/tasks.json');
      const tasks = await response.json();
      const defaultBoard: Board = {
        id: '1',
        name: 'Sport Xi Project',
        tasks,
        createdAt: new Date().toISOString().split('T')[0],
      };
      set({ boards: [defaultBoard], currentBoardId: '1' });
      localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultBoard]));
      get().setSearchQuery('');
    } catch (error) {
      console.error('Failed to load boards:', error);
    }
  },
}));

const filterTasks = (tasks: Task[], query: string): Task[] => {
  if (!query) return tasks;
  const lowercaseQuery = query.toLowerCase();
  return tasks.filter(task =>
    task.title.toLowerCase().includes(lowercaseQuery) ||
    task.category.toLowerCase().includes(lowercaseQuery) ||
    task.assignees.some(assignee => assignee.toLowerCase().includes(lowercaseQuery))
  );
};