import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Task Dashboard',
  description: 'A drag-and-drop task management dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}