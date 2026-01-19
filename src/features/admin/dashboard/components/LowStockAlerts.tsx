import { LowStockProduct } from '@/shared/types';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui';

interface LowStockAlertsProps {
    products: LowStockProduct[];
    isLoading: boolean;
}

export function LowStockAlerts({ products, isLoading }: LowStockAlertsProps) {
    if (isLoading) {
        return <div className="h-40 animate-pulse rounded-lg bg-gray-100" />;
    }

    if (products.length === 0) {
        return (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6 flex flex-col items-center justify-center text-center">
                <CheckCircle className="h-10 w-10 text-green-600 mb-2" />
                <h3 className="text-lg font-semibold text-green-900">Niveles de Inventario Óptimos</h3>
                <p className="text-green-700">No hay productos con stock bajo por el momento.</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-red-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 border-b border-red-100 bg-red-50 px-6 py-4">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-red-900">Alertas de Stock Bajo ({products.length})</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <img
                                src={product.imageUrl || 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=100&q=80'}
                                alt={product.name}
                                className="h-10 w-10 rounded object-cover"
                            />
                            <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-500">Stock Actual: <span className="font-bold text-red-600">{product.stock}</span></p>
                            </div>
                        </div>
                        <Link to={`/admin/products/${product.id}/edit`}>
                            <Button size="sm" variant="outline">Reabastecer</Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
