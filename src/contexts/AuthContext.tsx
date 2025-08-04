import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'lawyer';
  registeredAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'client' | 'lawyer') => Promise<void>;
  register: (email: string, password: string, name: string, phone: string, role: 'client' | 'lawyer') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'client' | 'lawyer'): Promise<void> => {
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Демо пользователи для тестирования
    const demoUsers: { [key: string]: User } = {
      'client@demo.com': {
        id: '1',
        name: 'Иван Петров',
        email: 'client@demo.com',
        phone: '+7 (999) 123-45-67',
        role: 'client',
        registeredAt: '2024-07-15'
      },
      'lawyer@demo.com': {
        id: '2',
        name: 'Анна Сергеева',
        email: 'lawyer@demo.com',
        phone: '+7 (999) 234-56-78',
        role: 'lawyer',
        registeredAt: '2024-01-15'
      }
    };

    const demoUser = demoUsers[email];
    if (demoUser && demoUser.role === role && password === 'demo123') {
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
    } else {
      throw new Error('Неверный email или пароль');
    }
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    phone: string, 
    role: 'client' | 'lawyer'
  ): Promise<void> => {
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role,
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Проверка сохраненного пользователя при загрузке
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;