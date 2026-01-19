import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { cn } from '@/shared/utils/cn';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-coffee-900 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between bg-white px-6 shadow-sm lg:px-8">
          <button
            className="text-gray-500 hover:text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="ml-auto flex items-center">
            <span className="text-sm font-medium text-gray-700">Hola, {user?.name}</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
