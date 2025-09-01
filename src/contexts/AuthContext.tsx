import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'lawyer' | 'admin';
  registeredAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone: string) => Promise<void>;
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

  const login = async (email: string, password: string): Promise<void> => {
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Главный администратор
    if (email === 'vituarten@icloud.com' && password === '12011999') {
      const adminUser: User = {
        id: 'admin',
        name: 'Главный администратор',
        email: 'vituarten@icloud.com',
        phone: '+7 (999) 000-00-00',
        role: 'admin',
        registeredAt: '2024-01-01'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return;
    }

    // Поиск среди зарегистрированных клиентов
    const savedClients = localStorage.getItem('clients');
    const clients = savedClients ? JSON.parse(savedClients) : [];
    
    const client = clients.find((c: any) => c.email === email);
    if (client && password === 'client123') { // Временный пароль для клиентов
      const userData: User = {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        role: client.isLawyer ? 'lawyer' : 'client',
        registeredAt: client.registeredAt
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return;
    }

    throw new Error('Неверный email или пароль');
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    phone: string
  ): Promise<void> => {
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Создаем нового клиента
    const newClient = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      registeredAt: new Date().toISOString().split('T')[0],
      totalCases: 0,
      totalPaid: 0,
      isLawyer: false
    };

    // Сохраняем в localStorage
    const savedClients = localStorage.getItem('clients');
    const clients = savedClients ? JSON.parse(savedClients) : [];
    clients.push(newClient);
    localStorage.setItem('clients', JSON.stringify(clients));

    // Автоматически логиним пользователя
    const newUser: User = {
      id: newClient.id,
      name,
      email,
      phone,
      role: 'client',
      registeredAt: newClient.registeredAt
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