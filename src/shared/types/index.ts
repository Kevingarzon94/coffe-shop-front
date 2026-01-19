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
  createdAt: string;
}

// Sales
export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Sale {
  id: string;
  customerId?: string;
  customerName?: string;
  items: SaleItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'transfer';
  date: string;
}

export interface CreateSaleData {
  items: { productId: string; quantity: number }[];
  customerId?: string;
  paymentMethod: 'cash' | 'card' | 'transfer';
}

// Dashboard
export interface TopProduct {
  productId: string;
  name: string;
  totalSold: number;
  revenue: number;
}

export interface TopCustomer {
  customerId: string;
  name: string;
  totalSpent: number;
  purchasesCount: number;
}

export interface LowStockProduct {
  id: string;
  name: string;
  stock: number;
}

export interface SalesChartData {
  date: string;
  amount: number;
  orders: number;
}

export interface DashboardSummary {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  topProducts: TopProduct[];
  topCustomers: TopCustomer[];
  lowStockProducts: LowStockProduct[];
  salesChart: SalesChartData[];
}

// Cart
export interface CartItem {
  product: Product;
  quantity: number;
}
