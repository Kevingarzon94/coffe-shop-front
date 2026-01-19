import { LoginForm } from '../components/LoginForm';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/components/ui';
import { Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-coffee-100 p-3">
              <Coffee className="h-10 w-10 text-coffee-600" />
            </div>
          </div>
          <CardTitle className="mt-4 text-2xl font-bold tracking-tight">
            Iniciar Sesión
          </CardTitle>
          <p className="text-sm text-gray-500">
            Ingresa tus credenciales para acceder al panel administrativo
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/" className="text-sm text-coffee-600 hover:text-coffee-500 hover:underline">
            Volver al Catálogo
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
