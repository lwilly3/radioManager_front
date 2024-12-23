
import React from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import { Menu } from '@headlessui/react';
import { useAuthStore } from '../../store/useAuthStore';
import { useLogout } from '../../hooks/auth/useLogout';

const UserMenu: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  if (!user) return null;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <User className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-gray-700">{user.username}</p>
        </div>
      </Menu.Button>

      <Menu.Items className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-50' : ''
              } w-full px-4 py-2 text-left text-sm text-gray-700 flex items-center gap-2`}
              onClick={() => {}} // Add settings route handler
            >
              <Settings className="h-4 w-4" />
              Paramètres
            </button>
          )}
        </Menu.Item>
        
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={logout}
              className={`${
                active ? 'bg-gray-50' : ''
              } w-full px-4 py-2 text-left text-sm text-red-600 flex items-center gap-2`}
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default UserMenu;
