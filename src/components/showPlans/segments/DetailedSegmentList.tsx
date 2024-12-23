import React from 'react';
import { Clock, Users, Radio } from 'lucide-react';
import type { ShowSegment } from '../../../types';

interface DetailedSegmentListProps {
  segments: ShowSegment[];
  activeSegmentId: string | null;
  onSegmentClick: (segmentId: string) => void;
}

const DetailedSegmentList: React.FC<DetailedSegmentListProps> = ({
  segments,
  activeSegmentId,
  onSegmentClick,
}) => {
  const getSegmentTypeColor = (type: ShowSegment['type']) => {
    const colors = {
      intro: 'bg-blue-100 text-blue-700 border-blue-200',
      interview: 'bg-purple-100 text-purple-700 border-purple-200',
      music: 'bg-green-100 text-green-700 border-green-200',
      ad: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      outro: 'bg-red-100 text-red-700 border-red-200',
      other: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[type];
  };

  return (
    <div className="space-y-4">
      {segments.map((segment, index) => (
        <div
          key={segment.id}
          className={`p-4 rounded-lg border transition-colors ${
            activeSegmentId === segment.id
              ? 'bg-indigo-50 border-indigo-200'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onSegmentClick(segment.id)}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-gray-900">
                  {index + 1}. {segment.title}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSegmentTypeColor(
                    segment.type
                  )}`}
                >
                  {segment.type}
                </span>
              </div>
              {segment.description && (
                <p className="mt-1 text-sm text-gray-600">
                  {segment.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{segment.duration} min</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            {segment.guests && segment.guests.length > 0 && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{segment.guests.length} invité(s)</span>
              </div>
            )}
            {segment.technicalNotes && (
              <div className="flex items-center gap-1">
                <Radio className="h-4 w-4" />
                <span>{segment.technicalNotes}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailedSegmentList;