import { createContext, ReactNode, useContext, useState } from 'react';

type User = {
  name: string;
  email: string;
};

type ScanReport = {
  imageUri: string;
  date: string;
  confidence: number;
  status: string;
  diseaseName: string;
  description: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  recentScan: ScanReport | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  setRecentScan: (scan: ScanReport) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Account = {
  name: string;
  password: string;
  recentScan?: ScanReport;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentScan, setRecentScanState] = useState<ScanReport | null>(null);
  const [accounts, setAccounts] = useState<Record<string, Account>>({});

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    const key = email.trim().toLowerCase();
    const account = accounts[key];

    if (!account || account.password !== password) {
      setLoading(false);
      throw new Error('Invalid email or password.');
    }

    setUser({ name: account.name, email: key });
    setRecentScanState(account.recentScan ?? null);
    setLoading(false);
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);

    const key = email.trim().toLowerCase();
    if (accounts[key]) {
      setLoading(false);
      throw new Error('An account with this email already exists.');
    }

    setAccounts((prev) => ({
      ...prev,
      [key]: { name, password },
    }));

    setLoading(false);
  };

  const setRecentScan = (scan: ScanReport) => {
    setRecentScanState(scan);
    if (user) {
      const key = user.email.trim().toLowerCase();
      setAccounts((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          recentScan: scan,
        },
      }));
    }
  };

  const signOut = () => {
    setUser(null);
    setRecentScanState(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, recentScan, signIn, signUp, signOut, setRecentScan }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
