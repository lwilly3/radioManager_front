import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Radio, Calendar, ChevronRight, Play, Edit } from 'lucide-react';
import { format, formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import StatusTransition from './StatusTransition';
import type { ShowPlan, ShowTitle, Status } from '../../types';

interface ShowPlanCardProps {
  showPlan: ShowPlan;
  onStatusChange: (showPlanId: string, newStatus: Status) => void;
}

const showTitleLabels: Record<ShowTitle, string> = {
  'matinale': 'La Matinale',
  'midi-info': 'Midi Info',
  'journal': 'Le Journal',
  'club-sport': 'Club Sport',
  'culture-mag': 'Culture Mag',
  'debat-soir': 'Le Grand Débat du Soir',
  'musique-live': 'Musique Live',
  'interview': "L'Interview",
  'chronique': 'La Chronique',
  'autre': 'Autre',
};

const ShowPlanCard: React.FC<ShowPlanCardProps> = ({ showPlan, onStatusChange }) => {
  const navigate = useNavigate();
  const totalDuration = showPlan.segments.reduce((acc, segment) => acc + segment.duration, 0);
  const date = new Date(showPlan.date);
  const endTime = new Date(date.getTime() + totalDuration * 60000);

  const isLive = showPlan.status.id === 'en-cours';
  const timeRemaining = isLive ? formatDistance(endTime, new Date(), { locale: fr, addSuffix: true }) : null;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
                {showTitleLabels[showPlan.title]}
              </h3>
            </div>
            <StatusTransition
              currentStatus={showPlan.status}
              onStatusChange={(newStatus) => onStatusChange(showPlan.id, newStatus)}
            />
            {isLive && (
              <span className="text-sm text-gray-600 mt-1 block">
                {timeRemaining}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/show-plans/${showPlan.id}/edit`)}
              className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"
              aria-label="Modifier le conducteur"
            >
              <Edit className="h-4 w-4" />
            </button>
            {showPlan.status.id === 'attente-diffusion' && (
              <button 
                onClick={() => onStatusChange(showPlan.id, { 
                  id: 'en-cours',
                  name: 'En cours',
                  color: '#EF4444',
                  priority: 3,
                })}
                className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              >
                <Play className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">
                {format(date, "d MMMM yyyy 'à' HH:mm", { locale: fr })}
              </span>
              <span className="sm:hidden">
                {format(date, "dd/MM/yy HH:mm", { locale: fr })}
              </span>
            </div>
            <span className="hidden sm:inline">-</span>
            <span>{format(endTime, 'HH:mm', { locale: fr })}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{totalDuration} min</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Radio className="h-4 w-4 mr-2" />
              <span>{showPlan.segments.length}</span>
            </div>
            {showPlan.guests.length > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>{showPlan.guests.length}</span>
              </div>
            )}
          </div>

          {showPlan.description && (
            <p className="text-sm text-gray-600 line-clamp-2 hidden sm:block">
              {showPlan.description}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex -space-x-2">
            {showPlan.guests.slice(0, 3).map((guest) => (
              <div
                key={guest.id}
                className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                title={guest.name}
              >
                {guest.avatar ? (
                  <img
                    src={guest.avatar}
                    alt={guest.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-medium text-gray-600">
                    {guest.name.charAt(0)}
                  </span>
                )}
              </div>
            ))}
            {showPlan.guests.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  +{showPlan.guests.length - 3}
                </span>
              </div>
            )}
          </div>

          <button 
            onClick={() => navigate(`/show-plans/${showPlan.id}`)}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <span className="hidden sm:inline">Voir les détails</span>
            <span className="sm:hidden">Détails</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPlanCard;