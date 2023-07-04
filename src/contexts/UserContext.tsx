import { createContext, useState } from 'react';

interface UserContextType {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    firstname: string;
    lastname: string;
    phone: string;
    country: string;
    type: string;
  }
}
export const UserContext = createContext<UserContextType | null>(null);
export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}
