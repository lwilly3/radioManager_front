import React, { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ShowPlanList from '../components/showPlans/ShowPlanList';
import ShowPlanFilters from '../components/showPlans/ShowPlanFilters';
import Notification from '../components/common/Notification';

const ShowPlans: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);
      window.history.replaceState({}, document.title);
      setTimeout(() => setNotification(null), 3000);
    }
  }, [location.state]);

  return (
    <div className="space-y-6">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Conducteurs</h1>
          <p className="text-sm sm:text-base text-gray-600">Gérez vos émissions et leurs segments</p>
        </div>
        <button 
          onClick={() => navigate('/show-plans/create')}
          className="w-full sm:w-auto btn btn-primary flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Nouveau conducteur</span>
          <span className="sm:hidden">Nouveau</span>
        </button>
      </header>

      <div className="space-y-4">
        <ShowPlanFilters />
        <div className="overflow-x-auto">
          <ShowPlanList />
        </div>
      </div>
    </div>
  );
};

export default ShowPlans;