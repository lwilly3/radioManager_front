// Show Types
export interface Show {
  id: string;
  title: string;
  description: string;
  type: ShowType;
  duration: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'special';
  presenters: Presenter[];
  createdAt: string;
  updatedAt: string;
}

export type ShowType = 
  | 'morning-show'
  | 'news'
  | 'talk-show'
  | 'music-show'
  | 'cultural'
  | 'sports'
  | 'documentary'
  | 'entertainment'
  | 'debate'
  | 'other';

// Guest Types
export interface Guest {
  id: string;
  name: string;
  role: GuestRole;
  biography?: string;
  avatar?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type GuestRole = 
  | 'journalist'
  | 'expert'
  | 'artist'
  | 'politician'
  | 'athlete'
  | 'writer'
  | 'scientist'
  | 'other';

// Presenter Types
export interface Presenter {
  id: string;
  name: string;
  profilePicture?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  biography?: string;
  isMainPresenter?: boolean;
}

// Previous types remain unchanged...