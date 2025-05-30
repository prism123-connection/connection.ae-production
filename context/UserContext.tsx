"use client";

import { getUserProfile } from "@/lib/helper";
import { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  referralId?: string;
  userRole?:string;
  avatarUrl?:string; 
  kycDone: boolean; 
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile(); 
        if (userData) {
          setUser({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            referralId: userData.referralId,
            userRole: userData.role,
            avatarUrl : userData.avatarUrl,
            kycDone : userData.kycDone
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
