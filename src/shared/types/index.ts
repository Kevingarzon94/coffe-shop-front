export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Auth
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Products
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateProductData extends Partial<CreateProductData> { }

// Customers
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  totalPurchases: number;
  totalSpent: number;
  createdAt: string;
}

// Sales
export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Sale {
  id: string;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
  customerId?: string; // Legacy/Backend compat
  items: SaleItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'transfer';
  date: string;
}

export interface CreateSaleData {
  items: { productId: string; quantity: number }[];
  customerId?: string;
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  paymentMethod: 'cash' | 'card' | 'transfer';
}

// Dashboard
export interface TopProduct {
  id: string;
  name: string;
  totalQuantity: number;
  totalRevenue: number;
}

export interface TopCustomer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  totalPurchases: number;
}

export interface LowStockProduct {
  id: string;
  name: string;
  stock: number;
  imageUrl?: string;
}

export interface SalesChartData {
  date: string;
  amount: number;
  orders: number;
}

export interface DashboardSummary {
  totalRevenue: number;
  totalSales: number;
  totalCustomers: number;
  lowStockCount: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: TopProduct[];
  topCustomers: TopCustomer[];
  salesChart: SalesChartData[];
}

// Cart
export interface CartItem {
  product: Product;
  quantity: number;
}
