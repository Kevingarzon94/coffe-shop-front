import { Search } from 'lucide-react';
import { Input } from '@/shared/components/ui';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useEffect, useState } from 'react';

interface ProductFiltersProps {
    onSearchChange: (value: string) => void;
    onSortChange: (value: string) => void;
    initialSearch?: string;
}

export function ProductFilters({ onSearchChange, onSortChange, initialSearch = '' }: ProductFiltersProps) {
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        onSearchChange(debouncedSearch);
    }, [debouncedSearch, onSearchChange]);

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-96">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                    placeholder="Buscar productos..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-2">
                <select
                    className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500"
                    onChange={(e) => onSortChange(e.target.value)}
                    defaultValue=""
                >
                    <option value="">Ordenar por</option>
                    <option value="name_asc">Nombre (A-Z)</option>
                    <option value="name_desc">Nombre (Z-A)</option>
                    <option value="price_asc">Precio: Menor a Mayor</option>
                    <option value="price_desc">Precio: Mayor a Menor</option>
                    <option value="newest">Más recientes</option>
                </select>
            </div>
        </div>
    );
}
