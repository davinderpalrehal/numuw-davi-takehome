import { User } from './UserTypes.ts';

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string) => void;
}
