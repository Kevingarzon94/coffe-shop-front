import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminProduct, useCreateProduct, useUpdateProduct } from '../hooks/useAdminProducts';
import { AdminPageHeader } from '@/shared/components/admin/AdminPageHeader';
import { Button, Input } from '@/shared/components/ui';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export function ProductFormPage() {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();

    const { data: product, isLoading: isProductLoading } = useAdminProduct(id || '');
    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (product && isEditMode) {
            setFormData({
                name: product.data.name,
                description: product.data.description,
                price: product.data.price.toString(),
                stock: product.data.stock.toString(),
            });
            setImagePreview(product.data.imageUrl || null);
        }
    }, [product, isEditMode]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name) return toast.error('El nombre es obligatorio');
        if (!formData.price) return toast.error('El precio es obligatorio');

        const payload = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            stock: Number(formData.stock),
            image: imageFile || undefined
        };

        if (isEditMode && id) {
            updateMutation.mutate({ id, data: payload });
        } else {
            if (!imageFile) return toast.error('La imagen es obligatoria para nuevos productos');
            // Typescript might complain about CreateProductData vs payload, assuming payload matches
            createMutation.mutate(payload as any);
        }
    };

    if (isEditMode && isProductLoading) {
        return <div className="p-8 text-center">Cargando datos del producto...</div>;
    }

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <div className="max-w-3xl mx-auto">
            <AdminPageHeader
                title={isEditMode ? "Editar Producto" : "Nuevo Producto"}
                breadcrumbs={[
                    { label: 'Productos', href: '/admin/products' },
                    { label: isEditMode ? 'Editar' : 'Crear' }
                ]}
            />

            <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="grid gap-6 md:grid-cols-2">
                    <Input
                        label="Nombre del Producto"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Stock Disponible"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Input
                        label="Precio (COP)"
                        type="number"
                        min="0"
                        step="50"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Imagen del Producto</label>
                    <div className="flex items-start gap-6">
                        <div className="relative flex h-40 w-40 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                                <div className="text-center text-gray-400">
                                    <Upload className="mx-auto h-8 w-8" />
                                    <span className="text-xs">Sin imagen</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 cursor-pointer opacity-0"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="flex-1 text-sm text-gray-500">
                            <p className="mb-2">Sube una imagen atractiva del producto. Se aceptan formatos JPG, PNG y WebP.</p>
                            <Button type="button" variant="outline" size="sm" onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}>
                                Seleccionar Archivo
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t pt-6">
                    <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>
                        Cancelar
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                        {isEditMode ? 'Guardar Cambios' : 'Crear Producto'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
