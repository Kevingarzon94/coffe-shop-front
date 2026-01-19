import { Route, Routes } from 'react-router-dom';
import { PublicLayout } from '@/shared/components/layout/PublicLayout';
import { AdminLayout } from '@/shared/components/layout/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

// Pages
import { CatalogPage } from '@/features/catalog/pages/CatalogPage';
import { CartPage } from '@/features/cart/pages/CartPage';
import { CheckoutPage } from '@/features/checkout/pages/CheckoutPage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { DashboardPage } from '@/features/admin/dashboard/pages/DashboardPage';
import { ProductsPage } from '@/features/admin/products/pages/ProductsPage';
import { ProductFormPage } from '@/features/admin/products/pages/ProductFormPage';
import { SalesPage } from '@/features/admin/sales/pages/SalesPage';
import { SaleDetailPage } from '@/features/admin/sales/pages/SaleDetailPage';
import { CustomersPage } from '@/features/admin/customers/pages/CustomersPage';
import { CustomerDetailPage } from '@/features/admin/customers/pages/CustomerDetailPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout><CatalogPage /></PublicLayout>} path="/" />
        <Route element={<PublicLayout><CartPage /></PublicLayout>} path="/cart" />
        <Route element={<PublicLayout><CheckoutPage /></PublicLayout>} path="/checkout" />
        <Route element={<LoginPage />} path="/login" />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout><DashboardPage /></AdminLayout>} path="/admin" />

        {/* Products */}
        <Route element={<AdminLayout><ProductsPage /></AdminLayout>} path="/admin/products" />
        <Route element={<AdminLayout><ProductFormPage /></AdminLayout>} path="/admin/products/new" />
        <Route element={<AdminLayout><ProductFormPage /></AdminLayout>} path="/admin/products/:id/edit" />

        {/* Sales */}
        <Route element={<AdminLayout><SalesPage /></AdminLayout>} path="/admin/sales" />
        <Route element={<AdminLayout><SaleDetailPage /></AdminLayout>} path="/admin/sales/:id" />

        {/* Customers */}
        <Route element={<AdminLayout><CustomersPage /></AdminLayout>} path="/admin/customers" />
        <Route element={<AdminLayout><CustomerDetailPage /></AdminLayout>} path="/admin/customers/:id" />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={
        <PublicLayout>
          <div className="flex justify-center p-10 font-bold">404 - Not Found</div>
        </PublicLayout>
      } />
    </Routes>
  );
}
