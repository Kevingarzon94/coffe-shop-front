import { useParams } from 'react-router-dom';
import { useSale } from '../hooks/useSales';
import { AdminPageHeader } from '@/shared/components/admin/AdminPageHeader';
import { formatCurrency, formatDateTime } from '@/shared/utils/format';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/shared/components/ui/Table';

export function SaleDetailPage() {
    const { id } = useParams();
    const { data: sale, isLoading } = useSale(id || '');

    if (isLoading) return <div className="p-8 text-center">Cargando detalle de la orden...</div>;
    if (!sale) return <div className="p-8 text-center">Orden no encontrada</div>;

    const { data } = sale;

    return (
        <div className="max-w-4xl">
            <AdminPageHeader
                title={`Orden #${data.id.slice(0, 8)}`}
                breadcrumbs={[
                    { label: 'Ventas', href: '/admin/sales' },
                    { label: 'Detalle' }
                ]}
            />

            <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Cliente</h3>
                    <div className="space-y-2 text-sm">
                        <p><span className="text-gray-500">Nombre:</span> <span className="font-medium">{data.customer?.name || 'N/A'}</span></p>
                        <p><span className="text-gray-500">Email:</span> <span className="font-medium">{data.customer?.email || 'N/A'}</span></p>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Pago</h3>
                    <div className="space-y-2 text-sm">
                        <p><span className="text-gray-500">Fecha:</span> <span className="font-medium">{formatDateTime(data.date)}</span></p>
                        <p><span className="text-gray-500">Total:</span> <span className="font-bold text-lg text-coffee-600">{formatCurrency(data.total)}</span></p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Items de la Orden</h3>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead className="text-right">Precio Unit.</TableHead>
                            <TableHead className="text-right">Cantidad</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium text-gray-900">{item.productName}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.totalPrice)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow className="bg-gray-50 font-bold">
                            <TableCell colSpan={3} className="text-right">Total Final</TableCell>
                            <TableCell className="text-right">{formatCurrency(data.total)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
