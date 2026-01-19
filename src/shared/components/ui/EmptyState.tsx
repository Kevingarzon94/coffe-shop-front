import { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      {Icon && (
        <div className="mb-4 rounded-full bg-coffee-50 p-3">
          <Icon className="h-6 w-6 text-coffee-600" />
        </div>
      )}
      <h3 className="mb-1 text-lg font-medium text-gray-900">{title}</h3>
      {description && <p className="mb-4 max-w-sm text-sm text-gray-500">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
