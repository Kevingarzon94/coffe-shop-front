import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search } from 'lucide-react';
import { useCustomers } from '../hooks/useCustomers';
import { AdminPageHeader } from '@/shared/components/admin/AdminPageHeader';
import { DataTable, Column } from '@/shared/components/admin/DataTable';
import { Button, Input, Pagination } from '@/shared/components/ui';
import { Customer } from '@/shared/types';
import { formatCurrency, formatNumber } from '@/shared/utils/format';
import { useDebounce } from '@/shared/hooks/useDebounce';

export function CustomersPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading } = useCustomers({
        page,
        limit: 10,
        search: debouncedSearch
    });

    const columns: Column<Customer>[] = [
        {
            header: 'Nombre',
            accessorKey: 'name',
            cell: (customer) => <span className="font-medium text-gray-900">{customer.name}</span>
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Compras',
            accessorKey: 'totalPurchases',
            cell: (c) => formatNumber(c.totalPurchases),
            sortable: true
        },
        {
            header: 'Total Gastado',
            accessorKey: 'totalSpent',
            cell: (c) => formatCurrency(c.totalSpent),
            sortable: true
        },
        {
            header: 'Acciones',
            cell: (customer) => (
                <Link to={`/admin/customers/${customer.id}`}>
                    <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 text-gray-500" />
                        <span className="ml-2">Ver Perfil</span>
                    </Button>
                </Link>
            )
        }
    ];

    return (
        <div>
            <AdminPageHeader
                title="Clientes"
                description="Base de datos de clientes registrados."
            />

            <div className="mb-6 flex gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Buscar por nombre o email..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={data?.data || []}
                isLoading={isLoading}
                emptyMessage="No se encontraron clientes"
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
