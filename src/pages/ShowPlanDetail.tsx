import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, Calendar, Radio, Users } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useShowPlanStore } from '../store/useShowPlanStore';
import StatusBadge from '../components/showPlans/StatusBadge';
import DetailedSegmentList from '../components/showPlans/segments/DetailedSegmentList';
import ShowPlanSidebar from '../components/showPlans/detail/ShowPlanSidebar';
import ShowPlanTimer from '../components/showPlans/detail/ShowPlanTimer';
import PresenterBadge from '../components/showPlans/presenters/PresenterBadge';

const ShowPlanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const showPlan = useShowPlanStore(
    (state) => state.showPlans.find((sp) => sp.id === id)
  );
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);

  if (!showPlan) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Conducteur non trouvé</p>
      </div>
    );
  }

  const totalDuration = showPlan.segments.reduce((acc, segment) => acc + segment.duration, 0);
  const date = new Date(showPlan.date);
  const endTime = new Date(date.getTime() + totalDuration * 60000);
  const isLive = showPlan.status.id === 'en-cours';

  const mainPresenter = showPlan.presenters.find(p => p.isMainPresenter);
  const otherPresenters = showPlan.presenters.filter(p => !p.isMainPresenter);

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/show-plans')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Retour aux conducteurs</span>
            </button>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {showPlan.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(date, "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{totalDuration} minutes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Radio className="h-4 w-4" />
                    <span>{showPlan.segments.length} segments</span>
                  </div>
                  {showPlan.guests.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {showPlan.guests.length} invité
                        {showPlan.guests.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <StatusBadge status={showPlan.status} />
            </div>

            {showPlan.description && (
              <p className="mt-4 text-gray-600">{showPlan.description}</p>
            )}

            {/* Presenters */}
            {showPlan.presenters.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {mainPresenter && (
                  <PresenterBadge presenter={mainPresenter} isMain />
                )}
                {otherPresenters.map(presenter => (
                  <PresenterBadge key={presenter.id} presenter={presenter} />
                ))}
              </div>
            )}
          </div>

          {/* Timer for live show */}
          {isLive && (
            <div className="mb-6">
              <ShowPlanTimer
                startTime={date}
                endTime={endTime}
                segments={showPlan.segments}
                activeSegmentId={activeSegmentId}
              />
            </div>
          )}

          {/* Segments */}
          <div className="space-y-6">
            <DetailedSegmentList
              segments={showPlan.segments}
              activeSegmentId={activeSegmentId}
              onSegmentClick={setActiveSegmentId}
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <ShowPlanSidebar showPlan={showPlan} />
    </div>
  );
};

export default ShowPlanDetail;