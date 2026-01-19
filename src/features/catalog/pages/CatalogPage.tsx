import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/ProductGrid';
import { ProductFilters } from '../components/ProductFilters';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Product } from '@/shared/types';
import { Pagination } from '@/shared/components/ui';

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

  // Parse sort param (e.g. "price_asc" -> { sortBy: 'price', sortOrder: 'asc' })
  const sortParams = useMemo(() => {
    if (!sort) return {};
    const [sortBy, sortOrder] = sort.split('_');
    return { sortBy, sortOrder: sortOrder as 'asc' | 'desc' };
  }, [sort]);

  const { data, isLoading } = useProducts({
    page,
    limit: 12,
    search,
    ...sortParams
  });

  const handleSearchChange = (value: string) => {
    setSearchParams(prev => {
      if (value) prev.set('search', value);
      else prev.delete('search');
      prev.set('page', '1'); // Reset to page 1
      return prev;
    });
  };

  const handleSortChange = (value: string) => {
    setSearchParams(prev => {
      if (value) prev.set('sort', value);
      else prev.delete('sort');
      return prev;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-coffee-900">Nuestro Menú</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra selección de cafés de especialidad, postres artesanales y bebidas refrescantes.
        </p>
      </div>

      {/* Filters */}
      <ProductFilters
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />

      {/* Grid */}
      <ProductGrid
        products={data?.data || []}
        isLoading={isLoading}
        onProductClick={setSelectedProduct}
      />

      {/* Pagination */}
      {data && data.meta.lastPage > 1 && (
        <Pagination
          currentPage={data.meta.page}
          totalPages={data.meta.lastPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
