import React from 'react';
import { Radio, Users, Clock } from 'lucide-react';
import { useShowStore } from '../../store/useShowStore';

const LiveShowBanner: React.FC = () => {
  const currentShow = useShowStore((state) => state.currentShow);

  if (!currentShow || currentShow.status !== 'live') {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-100 rounded-lg p-4 animate-pulse">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full" />
            <span className="text-red-600 font-medium">EN DIRECT</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{currentShow.title}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>02:15:30</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>12 auditeurs</span>
          </div>
          <button className="btn btn-primary">
            Voir le conducteur
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveShowBanner;