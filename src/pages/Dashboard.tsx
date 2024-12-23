import React from 'react';
import { Calendar, Clock, Users, Radio } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ScheduleItem from '../components/dashboard/ScheduleItem';
import LiveShowBanner from '../components/dashboard/LiveShowBanner';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue sur RadioManager</p>
        </div>
        <button className="btn btn-primary">
          Créer une émission
        </button>
      </header>

      {/* Live Show Banner */}
      <LiveShowBanner />

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          icon={<Radio className="h-6 w-6 text-indigo-600" />}
          title="Émissions du jour"
          value="8"
          description="En direct et à venir"
        />
        <StatCard
          icon={<Users className="h-6 w-6 text-green-600" />}
          title="Membres de l'équipe"
          value="12"
          description="Actuellement actifs"
        />
        <StatCard
          icon={<Clock className="h-6 w-6 text-blue-600" />}
          title="Heures en direct"
          value="24"
          description="7 derniers jours"
        />
        <StatCard
          icon={<Calendar className="h-6 w-6 text-purple-600" />}
          title="Émissions planifiées"
          value="15"
          description="7 prochains jours"
        />
      </div>

      {/* Upcoming Shows */}
      <section className="bg-white rounded-lg shadow p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Programme du jour</h2>
          <button className="btn btn-secondary">
            Voir le programme complet
          </button>
        </div>
        <div className="space-y-4">
          <ScheduleItem
            time="08:00 - 10:00"
            title="Matinale"
            host="Sarah Johnson"
            status="live"
          />
          <ScheduleItem
            time="10:00 - 12:00"
            title="Tech Talk"
            host="Mike Peters"
            status="upcoming"
          />
          <ScheduleItem
            time="12:00 - 14:00"
            title="Pause Déjeuner"
            host="DJ Maxwell"
            status="upcoming"
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;