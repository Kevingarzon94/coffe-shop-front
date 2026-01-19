import { useParams, Link } from 'react-router-dom';
import { useCustomer } from '../hooks/useCustomers';
import { AdminPageHeader } from '@/shared/components/admin/AdminPageHeader';
import { formatCurrency, formatNumber, formatDateTime } from '@/shared/utils/format';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/shared/components/ui/Table';
import { Button, EmptyState } from '@/shared/components/ui';
import { ShoppingBag, Mail } from 'lucide-react';

export function CustomerDetailPage() {
    const { id } = useParams();
    const { data: customer, isLoading } = useCustomer(id || '');

    if (isLoading) return <div className="p-8 text-center">Cargando perfil del cliente...</div>;
    if (!customer) return <div className="p-8 text-center">Cliente no encontrado</div>;

    const { data } = customer;

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={data.name}
                breadcrumbs={[
                    { label: 'Clientes', href: '/admin/customers' },
                    { label: 'Perfil' }
                ]}
            />

            <div className="grid gap-6 md:grid-cols-3">
                {/* Profile Card */}
                <div className="md:col-span-1 space-y-6">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-center">
                            <div className="h-20 w-20 rounded-full bg-coffee-100 flex items-center justify-center text-2xl font-bold text-coffee-700">
                                {data.name.charAt(0)}
                            </div>
                        </div>
                        <h2 className="text-center text-xl font-bold text-gray-900">{data.name}</h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center text-sm text-gray-500">
                                <Mail className="mr-3 h-4 w-4" />
                                {data.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <ShoppingBag className="mr-3 h-4 w-4" />
                                {formatNumber(data.totalPurchases)} compras realizadas
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Estadísticas</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Total Gastado</p>
                                <p className="text-2xl font-bold text-coffee-600">{formatCurrency(data.totalSpent)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History */}
                <div className="md:col-span-2">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Historial de Compras</h3>
                        </div>
                        {data.purchases && data.purchases.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Orden</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Monto</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.purchases.map((sale) => (
                                        <TableRow key={sale.id}>
                                            <TableCell className="font-mono">{sale.id.slice(0, 8)}...</TableCell>
                                            <TableCell>{formatDateTime(sale.date)}</TableCell>
                                            <TableCell>{formatCurrency(sale.total)}</TableCell>
                                            <TableCell>
                                                <Link to={`/admin/sales/${sale.id}`}>
                                                    <Button variant="ghost" size="sm">Ver</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="p-8">
                                <EmptyState
                                    title="Sin historial"
                                    description="Este cliente aún no ha realizado compras."
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
