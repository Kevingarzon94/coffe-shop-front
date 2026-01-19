
import { X } from 'lucide-react';
import { Input, Button } from '@/shared/components/ui';

interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onChange: (start: string, end: string) => void;
}

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {

    const handleQuickFilter = (days: number) => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);
        onChange(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
    };

    const clearFilter = () => onChange('', '');

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <Input
                type="date"
                label="Desde"
                value={startDate}
                onChange={(e) => onChange(e.target.value, endDate)}
                className="w-full sm:w-40"
            />
            <Input
                type="date"
                label="Hasta"
                value={endDate}
                onChange={(e) => onChange(startDate, e.target.value)}
                className="w-full sm:w-40"
            />
            <div className="flex items-center gap-2 pb-[2px]">
                <Button variant="outline" size="sm" onClick={() => handleQuickFilter(7)}>Semana</Button>
                <Button variant="outline" size="sm" onClick={() => handleQuickFilter(30)}>Mes</Button>
                {(startDate || endDate) && (
                    <Button variant="ghost" size="sm" onClick={clearFilter} className="text-red-600">
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
