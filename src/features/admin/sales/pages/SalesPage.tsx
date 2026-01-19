import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { useSales } from '../hooks/useSales';
import { AdminPageHeader } from '@/shared/components/admin/AdminPageHeader';
import { DataTable, Column } from '@/shared/components/admin/DataTable';
import { DateRangePicker } from '@/shared/components/admin/DateRangePicker';
import { Button, Pagination } from '@/shared/components/ui';
import { Sale } from '@/shared/types';
import { formatCurrency, formatDateTime } from '@/shared/utils/format';

export function SalesPage() {
    const [page, setPage] = useState(1);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const { data, isLoading } = useSales({
        page,
        limit: 10,
        startDate: dateRange.start,
        endDate: dateRange.end
    });

    const columns: Column<Sale>[] = [
        {
            header: '# Orden',
            cell: (sale) => <span className="font-mono text-xs">{sale.id.slice(0, 8)}...</span>
        },
        {
            header: 'Cliente',
            cell: (sale) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{sale.customer?.name || 'Cliente Casual'}</span>
                    <span className="text-xs text-gray-500">{sale.customer?.email}</span>
                </div>
            )
        },
        {
            header: 'Fecha',
            accessorKey: 'date',
            cell: (sale) => formatDateTime(sale.date),
        },
        {
            header: 'Total',
            accessorKey: 'total',
            cell: (sale) => formatCurrency(sale.total),
        },
        {
            header: 'Acciones',
            cell: (sale) => (
                <Link to={`/admin/sales/${sale.id}`}>
                    <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 text-gray-500" />
                        <span className="ml-2">Ver Detalle</span>
                    </Button>
                </Link>
            )
        }
    ];

    return (
        <div>
            <AdminPageHeader
                title="Ventas"
                description="Historial de órdenes y transacciones."
            />

            <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <DateRangePicker
                    startDate={dateRange.start}
                    endDate={dateRange.end}
                    onChange={(start, end) => setDateRange({ start, end })}
                />
            </div>

            <DataTable
                columns={columns}
                data={data?.data || []}
                isLoading={isLoading}
                emptyMessage="No se encontraron ventas en el periodo seleccionado"
            />

            {data && data.meta.lastPage > 1 && (
                <div className="mt-6">
                    <Pagination
                        currentPage={data.meta.page}
                        totalPages={data.meta.lastPage}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    );
}
