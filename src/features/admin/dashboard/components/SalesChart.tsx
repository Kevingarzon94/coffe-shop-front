import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { SalesChartData } from '@/shared/types';
import { formatCurrency, formatDateTime } from '@/shared/utils/format';

interface SalesChartProps {
    data: SalesChartData[];
    isLoading: boolean;
}

export function SalesChart({ data, isLoading }: SalesChartProps) {
    if (isLoading) {
        return <div className="h-80 w-full animate-pulse rounded-lg bg-gray-100" />;
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Ingresos (Últimos 30 días)</h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            tickFormatter={(date) => {
                                const d = new Date(date);
                                return `${d.getDate()}/${d.getMonth() + 1}`;
                            }}
                            stroke="#9CA3AF"
                            fontSize={12}
                        />
                        <YAxis
                            tickFormatter={(value) => `$${value}`} // Simplified currency for axis
                            stroke="#9CA3AF"
                            fontSize={12}
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <Tooltip
                            formatter={(value: number) => [formatCurrency(value), 'Ingresos']}
                            labelFormatter={(label) => formatDateTime(label).split(',')[0]}
                        />
                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#4F46E5"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
