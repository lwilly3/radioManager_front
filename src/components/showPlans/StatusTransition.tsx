import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStatusStore } from '../../store/useStatusStore';
import StatusBadge from './StatusBadge';
import type { Status } from '../../types';

interface StatusTransitionProps {
  currentStatus: Status;
  onStatusChange: (status: Status) => void;
}

const StatusTransition: React.FC<StatusTransitionProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  const getNextStatus = useStatusStore((state) => state.getNextStatus);
  const nextStatus = getNextStatus(currentStatus.id);

  if (!nextStatus) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <StatusBadge status={currentStatus} />
      <ArrowRight className="h-4 w-4 text-gray-400" />
      <button
        onClick={() => onStatusChange(nextStatus)}
        className="flex items-center gap-2 hover:opacity-80"
      >
        <StatusBadge status={nextStatus} />
      </button>
    </div>
  );
};

export default StatusTransition;