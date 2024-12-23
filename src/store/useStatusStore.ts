import { create } from 'zustand';
import { Status } from '../types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface defining the status store state and actions
 */
interface StatusState {
  statuses: Status[];                          // List of all status options
  setStatuses: (statuses: Status[]) => void;   // Replace all statuses
  addStatus: (status: Status) => void;         // Add a new status
  updateStatus: (status: Status) => void;      // Update existing status
  deleteStatus: (statusId: string) => void;    // Remove a status
  getNextStatus: (currentStatusId: string) => Status | null;  // Get next valid status
}

/**
 * Defines allowed status transitions
 * Key: current status, Value: array of allowed next statuses
 */
const statusTransitions: Record<string, string[]> = {
  'preparation': ['attente-diffusion'],
  'attente-diffusion': ['en-cours'],
  'en-cours': ['termine'],
  'termine': ['archive'],
};

/**
 * Default status configurations with priorities
 */
const defaultStatuses: Status[] = [
  {
    id: 'preparation',
    name: 'En préparation',
    color: '#FCD34D',
    priority: 1,
  },
  {
    id: 'attente-diffusion',
    name: 'En attente de diffusion',
    color: '#F97316',
    priority: 2,
  },
  {
    id: 'en-cours',
    name: 'En cours',
    color: '#EF4444',
    priority: 3,
  },
  {
    id: 'termine',
    name: 'Terminé',
    color: '#34D399',
    priority: 4,
  },
  {
    id: 'archive',
    name: 'Archivé',
    color: '#9CA3AF',
    priority: 5,
  },
];

/**
 * Store for managing show status states and transitions.
 * Handles CRUD operations and status workflow logic.
 */
export const useStatusStore = create<StatusState>((set, get) => ({
  // Initial state
  statuses: defaultStatuses,
  
  // Actions
  setStatuses: (statuses) => set({ statuses }),
  
  addStatus: (status) =>
    set((state) => ({
      statuses: [...state.statuses, { ...status, id: uuidv4() }],
    })),
  
  updateStatus: (updatedStatus) =>
    set((state) => ({
      statuses: state.statuses.map((status) =>
        status.id === updatedStatus.id ? updatedStatus : status
      ),
    })),
  
  deleteStatus: (statusId) =>
    set((state) => ({
      statuses: state.statuses.filter((status) => status.id !== statusId),
    })),
  
  getNextStatus: (currentStatusId) => {
    const nextStatusIds = statusTransitions[currentStatusId] || [];
    if (nextStatusIds.length === 0) return null;
    
    const statuses = get().statuses;
    return statuses.find((status) => status.id === nextStatusIds[0]) || null;
  },
}));