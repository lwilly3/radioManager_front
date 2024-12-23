import React from 'react';
import { usePresenterStore } from '../../../store/usePresenterStore';
import PresenterBadge from './PresenterBadge';
import type { Presenter } from '../../../types';

interface PresenterManagerProps {
  selectedPresenters: Presenter[];
  onAddPresenter: (presenter: Presenter) => void;
  onRemovePresenter: (presenterId: string) => void;
  onSetMainPresenter: (presenterId: string) => void;
}

const presenters: Presenter[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    contact: {
      email: 'jean.dupont@radio.fr',
      phone: '+33612345678',
    },
  },
  {
    id: '2',
    name: 'Marie Martin',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    contact: {
      email: 'marie.martin@radio.fr',
      phone: '+33623456789',
    },
  },
  {
    id: '3',
    name: 'Pierre Dubois',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    contact: {
      email: 'pierre.dubois@radio.fr',
      phone: '+33634567890',
    },
  },
  {
    id: '4',
    name: 'Sophie Bernard',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    contact: {
      email: 'sophie.bernard@radio.fr',
      phone: '+33645678901',
    },
  },
];

const PresenterManager: React.FC<PresenterManagerProps> = ({
  selectedPresenters,
  onAddPresenter,
  onRemovePresenter,
  onSetMainPresenter,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Available Presenters */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 flex items-center justify-between">
            <span>Liste des présentateurs</span>
            <span className="text-gray-500 text-xs">
              {presenters.length - selectedPresenters.length} disponible(s)
            </span>
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 -mr-2">
            {presenters
              .filter(p => !selectedPresenters.find(sp => sp.id === p.id))
              .map((presenter) => (
                <button
                  key={presenter.id}
                  onClick={() => onAddPresenter(presenter)}
                  className="w-full"
                >
                  <PresenterBadge
                    presenter={presenter}
                    className="w-full justify-between hover:bg-gray-100 transition-colors"
                  />
                </button>
              ))}
          </div>
          {presenters.filter(p => !selectedPresenters.find(sp => sp.id === p.id)).length === 0 && (
            <p className="text-sm text-gray-500 text-center py-2">
              Tous les présentateurs sont sélectionnés
            </p>
          )}
        </div>

        {/* Selected Presenters */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 flex items-center justify-between">
            <span>Présentateurs sélectionnés</span>
            <span className="text-gray-500 text-xs">
              {selectedPresenters.length} sélectionné(s)
            </span>
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 -mr-2">
            {selectedPresenters.length > 0 ? (
              selectedPresenters.map((presenter) => (
                <PresenterBadge
                  key={presenter.id}
                  presenter={presenter}
                  isMain={presenter.isMainPresenter}
                  onClick={() => onSetMainPresenter(presenter.id)}
                  onDelete={() => onRemovePresenter(presenter.id)}
                  className="w-full justify-between transition-colors"
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-2">
                Aucun présentateur sélectionné
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-2 text-xs text-gray-500">
        <p>Cliquez sur un présentateur sélectionné pour le définir comme principal</p>
      </div>
    </div>
  );
};

export default PresenterManager;