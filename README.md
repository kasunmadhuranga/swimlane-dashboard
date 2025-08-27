# Board-App

A modern task management dashboard built with Next.js, featuring drag-and-drop functionality, team collaboration, and real-time task tracking.

## Features

- **Kanban Board**: Drag-and-drop task management with multiple status columns
- **Task Management**: Create, edit, and delete tasks with priority levels
- **Team Collaboration**: Assign tasks to team members and track progress
- **Calendar Integration**: View tasks in calendar format
- **Real-time Updates**: Live task status updates using Zustand state management
- **Responsive Design**: Mobile-friendly interface with dedicated mobile dashboard
- **Search & Filter**: Find tasks quickly with built-in search functionality

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Drag & Drop**: @hello-pangea/dnd
- **UI Components**: Custom React components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Assigment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── TaskCard.tsx     # Individual task cards
│   ├── Swimlane.tsx     # Kanban columns
│   └── ...             # Other UI components
├── store/              # Zustand stores
│   ├── taskStore.ts    # Task management state
│   └── teamStore.ts    # Team member state
└── types/              # TypeScript definitions
    └── task.ts         # Task and Board interfaces
```

## Usage

1. **Create Tasks**: Click "Add Task" to create new tasks with title, priority, and assignees
2. **Manage Status**: Drag tasks between columns (Todo, In Progress, Approved, Reject)
3. **Team Management**: Assign tasks to team members from the sidebar
4. **Calendar View**: Switch to calendar view to see tasks by date
5. **Search**: Use the search bar to find specific tasks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and not licensed for public use.