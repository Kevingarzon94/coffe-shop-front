import { ConfirmModal } from '@/shared/components/admin/ConfirmModal';

interface DeleteProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName: string;
    isLoading: boolean;
}

export function DeleteProductModal({ isOpen, onClose, onConfirm, productName, isLoading }: DeleteProductModalProps) {
    return (
        <ConfirmModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Eliminar Producto"
            message={`¿Estás seguro que deseas eliminar el producto "${productName}"? Esta acción no se puede deshacer.`}
            confirmText="Eliminar"
            variant="danger"
            isLoading={isLoading}
        />
    );
}
