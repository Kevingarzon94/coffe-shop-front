import { Link } from 'react-router-dom';
import { Coffee, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '../ui';
import { CartIcon } from '@/features/cart/components/CartIcon';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Coffee className="h-8 w-8 text-coffee-700" />
          <span className="text-xl font-bold text-coffee-900">Coffee Shop</span>
        </Link>

        <div className="flex items-center space-x-4">
          <CartIcon />

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">Admin</Button>
              </Link>
              <div className="hidden items-center space-x-2 md:flex">
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                <ThemeLogOutButton logout={logout} />
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" leftIcon={<UserIcon className="h-4 w-4" />}>
                Ingresar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function ThemeLogOutButton({ logout }: { logout: () => void }) {
  return (
    <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:bg-red-50 hover:text-red-700">
      <LogOut className="h-4 w-4" />
    </Button>
  )
}
