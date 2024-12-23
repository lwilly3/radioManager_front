import React from 'react';
import { useShowPlanStore } from '../../store/useShowPlanStore';
import ShowPlanCard from './ShowPlanCard';
import { Status } from '../../types';

const ShowPlanList: React.FC = () => {
  const showPlans = useShowPlanStore((state) => state.showPlans);
  const setShowPlans = useShowPlanStore((state) => state.setShowPlans);

  const handleStatusChange = (showPlanId: string, newStatus: Status) => {
    setShowPlans(
      showPlans.map((showPlan) =>
        showPlan.id === showPlanId
          ? { ...showPlan, status: newStatus }
          : showPlan
      )
    );
  };

  if (showPlans.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">Aucun conducteur trouvé pour le moment</p>
      </div>
    );
  }

  // Trier les conducteurs par priorité de statut et par date
  const sortedShowPlans = [...showPlans].sort((a, b) => {
    if (a.status.priority !== b.status.priority) {
      return a.status.priority - b.status.priority;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sortedShowPlans.map((showPlan) => (
        <ShowPlanCard
          key={showPlan.id}
          showPlan={showPlan}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default ShowPlanList;