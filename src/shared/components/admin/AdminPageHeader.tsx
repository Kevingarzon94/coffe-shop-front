import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';


interface Breadcrumb {
    label: string;
    href?: string;
}

interface AdminPageHeaderProps {
    title: string;
    description?: string;
    breadcrumbs?: Breadcrumb[];
    actions?: ReactNode;
}

export function AdminPageHeader({ title, description, breadcrumbs, actions }: AdminPageHeaderProps) {
    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                {breadcrumbs && (
                    <nav className="mb-2 flex items-center text-sm text-gray-500">
                        {breadcrumbs.map((crumb, index) => (
                            <div key={index} className="flex items-center">
                                {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
                                {crumb.href ? (
                                    <Link to={crumb.href} className="hover:text-coffee-600 transition-colors">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="font-medium text-gray-900">{crumb.label}</span>
                                )}
                            </div>
                        ))}
                    </nav>
                )}
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {description && <p className="mt-1 text-gray-600">{description}</p>}
            </div>

            {actions && (
                <div className="flex items-center gap-3">
                    {actions}
                </div>
            )}
        </div>
    );
}
