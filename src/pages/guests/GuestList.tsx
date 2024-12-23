import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Search, Radio, User } from 'lucide-react';
// import axios from 'axios'; // Importation d'axios pour faire des requêtes HTTP
import { useGuestStore } from '../../store/useGuestStore';
import GuestDetailDialog from '../../components/guests/GuestDetailDialog';
import Notification from '../../components/common/Notification';
import type { Guest } from '../../types';
import api from '../../api/api';
import { useAuthStore } from '../../store/useAuthStore'

const GuestList: React.FC = () => {
  const token = useAuthStore((state) => state.token);

  const navigate = useNavigate();
  const location = useLocation();
  const guests = useGuestStore((state) => state.guests);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Nouvelle fonction pour récupérer les invités depuis l'API
  const fetchGuests = async () => {
    try {
      const response = await api.get('guests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Mettez à jour les invités dans votre store ou état
      useGuestStore.getState().setGuests(response.data); // Mettre à jour le store avec les données récupérées
    } catch (error) {
      console.error('Erreur lors de la récupération des invités', error);
      setNotification({
        type: 'error',
        message: 'Erreur lors de la récupération des invités',
      });
    }
  };

  useEffect(() => {
    // Appeler la fonction fetchGuests lors du chargement du composant
    fetchGuests();

    // Gérer la notification
    if (location.state?.notification) {
      setNotification(location.state.notification);
      window.history.replaceState({}, document.title);
      setTimeout(() => setNotification(null), 3000);
    }
  }, [location.state]);

  // Filtrage des invités
  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // const matchesRole = roleFilter ? guest.role === roleFilter : true;
    const matchesRole = true;
    return matchesSearch && matchesRole;
  });

  const guestRoleLabels: Record<string, string> = {
    journalist: 'Journaliste',
    expert: 'Expert',
    artist: 'Artiste',
    politician: 'Politique',
    athlete: 'Athlète',
    writer: 'Écrivain',
    scientist: 'Scientifique',
    other: 'Autre',
  };

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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Invités
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Gérez vos invités et leurs participations
          </p>
        </div>
        <button
          onClick={() => navigate('/guests/create')}
          className="w-full sm:w-auto btn btn-primary flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Nouvel invité</span>
          <span className="sm:hidden">Nouveau</span>
        </button>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un invité..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Tous les rôles</option>
          {Object.entries(guestRoleLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGuests.length > 0 ? (
          filteredGuests.map((guest) => (
            <div
              key={guest.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  {guest.avatar ? (
                    <img
                      src={guest.avatar}
                      alt={guest.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {guest.name}
                    </h3>
                    {/* <p className="text-sm text-gray-600">{guestRoleLabels[guest.role]}</p> */}
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Radio className="h-4 w-4" />
                    <span>12 participations</span>
                  </div>
                  {guest.contact?.email && (
                    <p className="text-sm text-gray-600 truncate">
                      {guest.contact.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-lg">
                <button
                  onClick={() => setSelectedGuest(guest)}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Voir les détails
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">Aucun invité trouvé</p>
            <button
              onClick={() => navigate('/guests/create')}
              className="btn btn-primary"
            >
              Créer un invité
            </button>
          </div>
        )}
      </div>

      {selectedGuest && (
        <GuestDetailDialog
          guest={selectedGuest}
          isOpen={Boolean(selectedGuest)}
          onClose={() => setSelectedGuest(null)}
        />
      )}
    </div>
  );
};

export default GuestList;
