import { ReactNode } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../ui/Table';
import { EmptyState } from '../ui';
import { ArrowUpDown } from 'lucide-react';

export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => ReactNode;
    className?: string;
    sortable?: boolean;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    emptyMessage?: string;
    onSort?: (key: keyof T) => void;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export function DataTable<T extends { id: string | number }>({
    columns,
    data,
    isLoading,
    emptyMessage = "No hay datos disponibles",
    onSort,
    sortBy
}: DataTableProps<T>) {

    return (
        <div className="rounded-md border border-gray-200 overflow-hidden bg-white shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHead
                                key={index}
                                className={column.className}
                                onClick={() => column.sortable && column.accessorKey && onSort && onSort(column.accessorKey)}
                                role={column.sortable ? "button" : undefined}
                            >
                                <div className="flex items-center gap-2">
                                    {column.header}
                                    {column.sortable && (
                                        <ArrowUpDown className={`h-3 w-3 ${sortBy === column.accessorKey ? 'text-coffee-600' : 'text-gray-400'}`} />
                                    )}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        // Skeleton Rows
                        [...Array(5)].map((_, i) => (
                            <TableRow key={i}>
                                {columns.map((_, j) => (
                                    <TableCell key={j}>
                                        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-32 text-center">
                                <EmptyState
                                    title={emptyMessage}
                                    description=""
                                    className="p-4"
                                />
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column, index) => (
                                    <TableCell key={index} className={column.className}>
                                        {column.cell
                                            ? column.cell(item)
                                            : (column.accessorKey ? String(item[column.accessorKey]) : null)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
