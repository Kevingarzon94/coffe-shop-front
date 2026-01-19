import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Receipt, Users, LogOut, Coffee } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { cn } from '@/shared/utils/cn';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Productos', href: '/admin/products', icon: Package },
  { name: 'Ventas', href: '/admin/sales', icon: Receipt },
  { name: 'Clientes', href: '/admin/customers', icon: Users },
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="flex h-full w-64 flex-col bg-coffee-900 text-white">
      <div className="flex h-16 items-center px-6">
        <Link to="/" className="flex items-center space-x-2">
          <Coffee className="h-8 w-8 text-cream-200" />
          <span className="text-xl font-bold">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href ||
            (item.href !== '/admin' && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-coffee-800 text-white'
                  : 'text-coffee-100 hover:bg-coffee-800 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-white' : 'text-coffee-300 group-hover:text-white'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-coffee-800 p-4">
        <button
          onClick={logout}
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-coffee-100 hover:bg-coffee-800 hover:text-white"
        >
          <LogOut className="mr-3 h-5 w-5 text-coffee-300 group-hover:text-white" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
