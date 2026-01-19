import { TopCustomer } from '@/shared/types';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/shared/components/ui/Table';
import { formatCurrency, formatNumber } from '@/shared/utils/format';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Button } from '@/shared/components/ui';

interface TopCustomersTableProps {
    customers: TopCustomer[];
    isLoading: boolean;
}

export function TopCustomersTable({ customers, isLoading }: TopCustomersTableProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">Mejores Clientes</h3>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead className="text-right">Compras</TableHead>
                        <TableHead className="text-right">Gastado</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        [...Array(5)].map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><div className="h-4 w-32 animate-pulse rounded bg-gray-100" /></TableCell>
                                <TableCell><div className="h-4 w-12 animate-pulse rounded bg-gray-100" /></TableCell>
                                <TableCell><div className="h-4 w-20 animate-pulse rounded bg-gray-100" /></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))
                    ) : (
                        customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900">{customer.name}</span>
                                        <span className="text-xs text-gray-500">{customer.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">{formatNumber(customer.totalPurchases)}</TableCell>
                                <TableCell className="text-right">{formatCurrency(customer.totalSpent)}</TableCell>
                                <TableCell>
                                    <Link to={`/admin/customers/${customer.id}`}>
                                        <Button variant="ghost" size="sm">
                                            <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
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
