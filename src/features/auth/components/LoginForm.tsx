import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button, Input } from '@/shared/components/ui';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password });
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Correo Electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="admin@coffee.shop"
      />

      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="******"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Ingresar
      </Button>
    </form>
  );
}
