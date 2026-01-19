import { useParams } from 'react-router-dom';

export function CustomerDetailPage() {
    const { id } = useParams();
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Cliente #{id}</h1>
            <div className="mt-4 rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
                <p className="text-gray-500">Detalles del cliente próximamente...</p>
            </div>
        </div>
    );
}
