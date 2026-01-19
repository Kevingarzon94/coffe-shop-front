import { AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { Modal, Button } from '@/shared/components/ui';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    variant = 'danger',
    isLoading = false
}: ConfirmModalProps) {

    const getIcon = () => {
        switch (variant) {
            case 'danger': return <AlertCircle className="h-6 w-6 text-red-600" />;
            case 'warning': return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
            case 'info': return <Info className="h-6 w-6 text-blue-600" />;
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <div className="flex flex-col items-center text-center">
                <div className={`mb-4 rounded-full p-3 ${variant === 'danger' ? 'bg-red-100' :
                        variant === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                    {getIcon()}
                </div>

                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-500">{message}</p>

                <div className="mt-6 flex w-full gap-3">
                    <Button variant="outline" className="flex-1" onClick={onClose} disabled={isLoading}>
                        {cancelText}
                    </Button>
                    <Button
                        className={`flex-1 ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
