'use client';

import { clientAuth } from '@/utils/firebase-client';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface CurrClientAuth {
  user: User | null;
  hasAuthAttempt: boolean;
}
interface AuthContextOutput {
  currClientAuth: CurrClientAuth;
  signUpWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextOutput>(null!);

export const AuthProvider = (props: { children: ReactNode }) => {
  const router = useRouter();
  const [currClientAuth, setCurrClientAuth] = useState<CurrClientAuth>({
    user: null,
    hasAuthAttempt: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(clientAuth, async (authUser) => {
      if (authUser) {
        setCurrClientAuth({ user: authUser, hasAuthAttempt: true });
      } else {
        setCurrClientAuth({ user: null, hasAuthAttempt: true });
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(clientAuth, email, password);
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(clientAuth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const logOut = async () => {
    await signOut(clientAuth);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{ currClientAuth, loginWithEmailAndPassword, logOut, signUpWithEmailAndPassword }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
