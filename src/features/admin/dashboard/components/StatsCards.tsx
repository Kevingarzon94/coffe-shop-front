import { DollarSign, ShoppingBag, Users, AlertTriangle } from 'lucide-react';
import { DashboardSummary } from '@/shared/types';
import { formatCurrency, formatNumber } from '@/shared/utils/format';

interface StatsCardsProps {
    summary: DashboardSummary;
    isLoading: boolean;
}

export function StatsCards({ summary, isLoading }: StatsCardsProps) {
    if (isLoading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 animate-pulse rounded-lg bg-gray-100" />
                ))}
            </div>
        );
    }

    const cards = [
        {
            title: 'Total Ingresos',
            value: formatCurrency(summary.totalRevenue),
            icon: DollarSign,
            color: 'bg-green-100 text-green-600',
        },
        {
            title: 'Ventas Totales',
            value: formatNumber(summary.totalSales),
            icon: ShoppingBag,
            color: 'bg-blue-100 text-blue-600',
        },
        {
            title: 'Clientes Activos',
            value: formatNumber(summary.totalCustomers),
            icon: Users,
            color: 'bg-indigo-100 text-indigo-600',
        },
        {
            title: 'Stock Bajo',
            value: formatNumber(summary.lowStockCount),
            icon: AlertTriangle,
            color: summary.lowStockCount > 0 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600',
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
                <div key={index} className="flex items-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className={`mr-4 rounded-full p-3 ${card.color}`}>
                        <card.icon className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">{card.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
