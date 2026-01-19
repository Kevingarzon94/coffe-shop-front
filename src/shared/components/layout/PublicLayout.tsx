import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartSidebar } from '@/features/cart/components/CartSidebar';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
}
