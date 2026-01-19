import { useParams } from 'react-router-dom';

export function SaleDetailPage() {
    const { id } = useParams();
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Detalle de Venta #{id}</h1>
            <div className="mt-4 rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
                <p className="text-gray-500">Detalles próximamente...</p>
            </div>
        </div>
    );
}
