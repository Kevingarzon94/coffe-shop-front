import {
    useDashboardSummary,
    useSalesChart,
    useTopProducts,
    useTopCustomers,
    useLowStockProducts
} from '../hooks/useDashboard';
import { StatsCards } from '../components/StatsCards';
import { SalesChart } from '../components/SalesChart';
import { TopProductsTable } from '../components/TopProductsTable';
import { TopCustomersTable } from '../components/TopCustomersTable';
import { LowStockAlerts } from '../components/LowStockAlerts';
import { AdminPageHeader } from '@/shared/components/admin/AdminPageHeader';

export function DashboardPage() {
    const { data: summary, isLoading: isSummaryLoading } = useDashboardSummary();
    const { data: salesChart, isLoading: isChartLoading } = useSalesChart();
    const { data: topProducts, isLoading: isTopProdLoading } = useTopProducts();
    const { data: topCustomers, isLoading: isTopCustLoading } = useTopCustomers();
    const { data: lowStock, isLoading: isLowStockLoading } = useLowStockProducts();

    // Mock summary if data is missing during dev/demo (since backend might not be 100% ready)


    return (
        <div className="space-y-6">
            <AdminPageHeader
                title="Dashboard"
                description="Resumen general de tu tienda de café."
            />

            <StatsCards
                summary={summary?.data || {
                    totalRevenue: 0,
                    totalSales: 0,
                    totalCustomers: 0,
                    lowStockCount: 0,
                    totalOrders: 0,
                    averageOrderValue: 0,
                    topProducts: [],
                    topCustomers: [],
                    salesChart: []
                }}
                isLoading={isSummaryLoading}
            />

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Chart Section */}
                <div className="lg:col-span-2">
                    <SalesChart
                        data={salesChart?.data || []}
                        isLoading={isChartLoading}
                    />
                </div>

                {/* Alerts Section */}
                <div className="lg:col-span-1">
                    <LowStockAlerts
                        products={lowStock?.data || []}
                        isLoading={isLowStockLoading}
                    />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <TopProductsTable
                    products={topProducts?.data || []}
                    isLoading={isTopProdLoading}
                />
                <TopCustomersTable
                    customers={topCustomers?.data || []}
                    isLoading={isTopCustLoading}
                />
            </div>
        </div>
    );
}
