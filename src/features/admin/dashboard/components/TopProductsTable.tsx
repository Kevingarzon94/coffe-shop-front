import { TopProduct } from '@/shared/types';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/shared/components/ui/Table';
import { formatCurrency, formatNumber } from '@/shared/utils/format';
import { Link } from 'react-router-dom';
import { Edit2 } from 'lucide-react';
import { Button } from '@/shared/components/ui';

interface TopProductsTableProps {
    products: TopProduct[];
    isLoading: boolean;
}

export function TopProductsTable({ products, isLoading }: TopProductsTableProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">Productos Más Vendidos</h3>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead className="text-right">Vendidos</TableHead>
                        <TableHead className="text-right">Ingresos</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        [...Array(5)].map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><div className="h-4 w-32 animate-pulse rounded bg-gray-100" /></TableCell>
                                <TableCell><div className="h-4 w-16 animate-pulse rounded bg-gray-100" /></TableCell>
                                <TableCell><div className="h-4 w-20 animate-pulse rounded bg-gray-100" /></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))
                    ) : (
                        products.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                                <TableCell className="text-right">{formatNumber(item.totalQuantity)}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.totalRevenue)}</TableCell>
                                <TableCell>
                                    <Link to={`/admin/products/${item.id}/edit`}>
                                        <Button variant="ghost" size="sm">
                                            <Edit2 className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
