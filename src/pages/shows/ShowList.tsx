import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Users, Clock } from 'lucide-react';
import { useShowStore } from '../../store/useShowStore';
import ShowDetailDialog from '../../components/shows/ShowDetailDialog';
import type { Show } from '../../types';

/**
 * Show list page component that displays all radio shows.
 * Provides filtering, search, and CRUD operations for shows.
 */
const ShowList: React.FC = () => {
  const navigate = useNavigate();
  const shows = useShowStore((state) => state.shows);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Émissions</h1>
          <p className="text-sm sm:text-base text-gray-600">Gérez vos émissions et leurs détails</p>
        </div>
        <button 
          onClick={() => navigate('/shows/create')}
          className="w-full sm:w-auto btn btn-primary flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Nouvelle émission</span>
          <span className="sm:hidden">Nouvelle</span>
        </button>
      </header>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une émission..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <select className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="">Tous les types</option>
          <option value="morning-show">Matinale</option>
          <option value="news">Journal</option>
          <option value="talk-show">Talk-show</option>
          <option value="music">Musique</option>
        </select>
      </div>

      {/* Show List Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shows.length > 0 ? (
          shows.map((show) => (
            <div key={show.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{show.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {show.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{show.duration}min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{show.presenters.length}</span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-lg">
                <button 
                  onClick={() => setSelectedShow(show)}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Voir les détails
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">Aucune émission trouvée</p>
            <button
              onClick={() => navigate('/shows/create')}
              className="mt-4 btn btn-primary"
            >
              Créer une émission
            </button>
          </div>
        )}
      </div>

      {/* Show Detail Dialog */}
      {selectedShow && (
        <ShowDetailDialog
          show={selectedShow}
          isOpen={Boolean(selectedShow)}
          onClose={() => setSelectedShow(null)}
        />
      )}
    </div>
  );
};

export default ShowList;