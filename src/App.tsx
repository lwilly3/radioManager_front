
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ShowPlans from './pages/ShowPlans';
import CreateShowPlan from './pages/CreateShowPlan';
import EditShowPlan from './pages/EditShowPlan';
import ShowPlanDetail from './pages/ShowPlanDetail';
import ShowList from './pages/shows/ShowList';
import CreateShow from './pages/shows/CreateShow';
import EditShow from './pages/shows/EditShow';
import GuestList from './pages/guests/GuestList';
import CreateGuest from './pages/guests/CreateGuest';
import EditGuest from './pages/guests/EditGuest';
import TeamList from './pages/team/TeamList';
import CreateTeamMember from './pages/team/CreateTeamMember';
import EditTeamMember from './pages/team/EditTeamMember';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => Boolean(state.token));

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } 
        />

        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          
          {/* Show Plans */}
          <Route path="show-plans">
            <Route index element={<ShowPlans />} />
            <Route path="create" element={<CreateShowPlan />} />
            <Route path=":id" element={<ShowPlanDetail />} />
            <Route path=":id/edit" element={<EditShowPlan />} />
          </Route>

          {/* Shows */}
          <Route path="shows">
            <Route index element={<ShowList />} />
            <Route path="create" element={<CreateShow />} />
            <Route path=":id/edit" element={<EditShow />} />
          </Route>

          {/* Guests */}
          <Route path="guests">
            <Route index element={<GuestList />} />
            <Route path="create" element={<CreateGuest />} />
            <Route path=":id/edit" element={<EditGuest />} />
          </Route>

          {/* Team */}
          <Route path="team">
            <Route index element={<TeamList />} />
            <Route path="create" element={<CreateTeamMember />} />
            <Route path=":id/edit" element={<EditTeamMember />} />
          </Route>

          {/* Chat */}
          <Route path="chat" element={<Chat />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
