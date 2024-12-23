import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Users } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { segmentSchema } from '../../../schemas/showPlanSchema';
import FormField from '../../common/FormField';
import SegmentGuestManager from './SegmentGuestManager';
import type { SegmentFormData, ShowSegment, Guest } from '../../../types';

interface NewSegmentFormProps {
  onAdd: (segment: ShowSegment) => void;
}

const NewSegmentForm: React.FC<NewSegmentFormProps> = ({ onAdd }) => {
  const [showGuestManager, setShowGuestManager] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SegmentFormData>({
    resolver: zodResolver(segmentSchema),
    defaultValues: {
      duration: 5,
      type: 'other',
    },
  });

  const onSubmit = (data: SegmentFormData) => {
    const newSegment: ShowSegment = {
      id: uuidv4(),
      ...data,
      startTime: '',
      guests: guests.map(g => g.id),
    };
    onAdd(newSegment);
    reset();
    setGuests([]);
    setShowGuestManager(false);
  };

  const handleAddGuest = (guest: Guest) => {
    if (!guests.find(g => g.id === guest.id)) {
      setGuests([...guests, guest]);
    }
  };

  const handleRemoveGuest = (guestId: string) => {
    setGuests(guests.filter(g => g.id !== guestId));
  };

  const handleUpdateGuest = (updatedGuest: Guest) => {
    setGuests(guests.map(g => g.id === updatedGuest.id ? updatedGuest : g));
  };

  return (
    <div className="space-y-4 bg-gray-50 padding-responsive rounded-lg">
      <div className="form-group-mobile">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Titre" error={errors.title?.message}>
            <input
              type="text"
              {...register('title')}
              className="form-input"
              placeholder="Ex: Introduction"
            />
          </FormField>

          <FormField label="Type" error={errors.type?.message}>
            <select {...register('type')} className="form-input">
              <option value="intro">Introduction</option>
              <option value="interview">Interview</option>
              <option value="music">Musique</option>
              <option value="ad">Publicité</option>
              <option value="outro">Conclusion</option>
              <option value="other">Autre</option>
            </select>
          </FormField>
        </div>

        <FormField label="Durée (minutes)" error={errors.duration?.message}>
          <input
            type="number"
            {...register('duration', { valueAsNumber: true })}
            className="form-input"
            min="1"
          />
        </FormField>

        <FormField label="Description" error={errors.description?.message}>
          <textarea
            {...register('description')}
            className="form-textarea"
            rows={2}
            placeholder="Description du segment..."
          />
        </FormField>

        <FormField label="Notes techniques" error={errors.technicalNotes?.message}>
          <textarea
            {...register('technicalNotes')}
            className="form-textarea"
            rows={2}
            placeholder="Notes pour l'équipe technique..."
          />
        </FormField>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={() => setShowGuestManager(!showGuestManager)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-full sm:w-auto px-3 py-2 rounded-lg hover:bg-gray-100 touch-target"
        >
          <Users className="h-5 w-5" />
          <span>Gérer les invités ({guests.length})</span>
        </button>

        {showGuestManager && (
          <div className="mt-4">
            <SegmentGuestManager
              guests={guests}
              onAddGuest={handleAddGuest}
              onRemoveGuest={handleRemoveGuest}
              onUpdateGuest={handleUpdateGuest}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="w-full sm:w-auto btn btn-primary flex items-center justify-center gap-2 touch-target"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Ajouter le segment</span>
          <span className="sm:hidden">Ajouter</span>
        </button>
      </div>
    </div>
  );
};

export default NewSegmentForm;