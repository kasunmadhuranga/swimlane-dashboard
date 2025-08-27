interface StatusBadgeProps {
  status: 'todo' | 'in-progress' | 'approved' | 'reject';
  children: React.ReactNode;
}

const statusColors = {
  'todo': 'bg-[#e6e8eb]',
  'in-progress': 'bg-yellow-color',
  'approved': 'bg-green-color',
  'reject': 'bg-red-color text-white',
};

export default function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span className={`px-6 h-[30px] rounded-full text-sm font-medium flex items-center ${statusColors[status]}`}>
      {children}
    </span>
  );
}