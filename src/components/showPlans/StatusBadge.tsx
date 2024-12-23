import React from 'react';
import { Status } from '../../types';

interface StatusBadgeProps {
  status: Status;
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  onClick,
  onDelete,
  className = '',
}) => {
  const style = {
    backgroundColor: `${status.color}15`,
    color: status.color,
    borderColor: `${status.color}30`,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-medium border ${
        onClick ? 'cursor-pointer hover:opacity-80' : ''
      } ${className}`}
      style={style}
      onClick={onClick}
    >
      {status.name}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="ml-1 hover:opacity-80"
        >
          ×
        </button>
      )}
    </span>
  );
};

export default StatusBadge;