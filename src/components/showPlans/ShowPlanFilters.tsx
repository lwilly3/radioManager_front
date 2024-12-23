import React from 'react';
import { Search } from 'lucide-react';
import { useStatusStore } from '../../store/useStatusStore';
import StatusBadge from './StatusBadge';

const ShowPlanFilters: React.FC = () => {
  const statuses = useStatusStore((state) => state.statuses);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un conducteur..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="flex gap-4">
          <select className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Toutes les dates</option>
            <option value="today">Aujourd'hui</option>
            <option value="tomorrow">Demain</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        {statuses.map((status) => (
          <StatusBadge
            key={status.id}
            status={status}
            onClick={() => {}}
            className="cursor-pointer hover:opacity-80 whitespace-nowrap"
          />
        ))}
      </div>
    </div>
  );
};

export default ShowPlanFilters;