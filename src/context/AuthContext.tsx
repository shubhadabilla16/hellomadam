import React, { createContext, useContext, useState, useCallback } from 'react';
import { UserProfile, UserRole } from '../types/management';

const LS_ACTIVE_BEAUTICIAN = 'hello_madam_demo_active_beautician_v2';

interface AuthContextType {
  // Frontend Demo Session Switcher
  activeBeauticianId: string;
  setActiveBeauticianId: (id: string) => void;
  demoRole: UserRole;
  setDemoRole: (role: UserRole) => void;

  // Backward-compatible local demo fields (no real auth provider required)
  firebaseUser: { uid: string; email: string; displayName: string } | null;
  profile: UserProfile | null;
  role: UserRole;
  teamMemberId: string;
  authReady: boolean;
  authLoading: boolean;
  authError: string | null;
  isOwner: boolean;
  isBeautician: boolean;
  isCustomer: boolean;
  signInWithGoogle: () => Promise<UserProfile | null>;
  signInWithEmail: (email: string, password: string) => Promise<UserProfile | null>;
  signOut: () => Promise<void>;
  clearAuthError: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeBeauticianId, setActiveBeauticianIdState] = useState<string>(() => {
    try {
      return localStorage.getItem(LS_ACTIVE_BEAUTICIAN) || 'sneha';
    } catch {
      return 'sneha';
    }
  });

  const [demoRole, setDemoRole] = useState<UserRole>('owner');

  const setActiveBeauticianId = useCallback((id: string) => {
    setActiveBeauticianIdState(id);
    try {
      localStorage.setItem(LS_ACTIVE_BEAUTICIAN, id);
    } catch {
      // ignore storage quota errors
    }
  }, []);

  const mockProfile: UserProfile = {
    uid: `demo-${demoRole}`,
    email: demoRole === 'owner' ? 'owner.demo@hellomadam.local' : `${activeBeauticianId}.demo@hellomadam.local`,
    fullName: demoRole === 'owner' ? 'Hello Madam Owner (Demo)' : activeBeauticianId,
    role: demoRole,
    teamMemberId: activeBeauticianId,
    active: true,
  };

  const signInWithGoogle = useCallback(async () => mockProfile, [mockProfile]);
  const signInWithEmail = useCallback(async () => mockProfile, [mockProfile]);
  const signOut = useCallback(async () => {}, []);
  const clearAuthError = useCallback(() => {}, []);
  const refreshProfile = useCallback(async () => {}, []);

  return (
    <AuthContext.Provider
      value={{
        activeBeauticianId,
        setActiveBeauticianId,
        demoRole,
        setDemoRole,
        firebaseUser: {
          uid: mockProfile.uid,
          email: mockProfile.email,
          displayName: mockProfile.fullName,
        },
        profile: mockProfile,
        role: demoRole,
        teamMemberId: activeBeauticianId,
        authReady: true,
        authLoading: false,
        authError: null,
        isOwner: true,
        isBeautician: true,
        isCustomer: true,
        signInWithGoogle,
        signInWithEmail,
        signOut,
        clearAuthError,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
