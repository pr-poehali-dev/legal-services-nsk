import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'lawyer' | 'admin';
  created_at: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { name?: string; phone?: string }) => Promise<void>;
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

// URL бэкенд функций (будут обновлены после деплоя)
const AUTH_API_URL = 'https://functions.poehali.dev/9b1b3903-27ee-46f6-be65-bfcaf9b86f2f';
const PROFILE_API_URL = 'https://functions.poehali.dev/6d737c07-5eb6-4ce4-b92e-d455d785a16d';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(AUTH_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка авторизации');
      }

      const userData = await response.json();
      
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        role: userData.role,
        created_at: new Date().toISOString(),
        token: userData.id
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('auth_token', userData.id);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    phone: string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(AUTH_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'register',
          email,
          password,
          name,
          phone
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка регистрации');
      }

      const userData = await response.json();
      
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        role: userData.role,
        created_at: new Date().toISOString(),
        token: userData.id
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('auth_token', userData.id);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: { name?: string; phone?: string }): Promise<void> => {
    if (!user) {
      throw new Error('Пользователь не авторизован');
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Токен авторизации не найден');
      }

      const response = await fetch(PROFILE_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка обновления профиля');
      }

      const updatedUserData = await response.json();
      
      // Обновляем данные пользователя, сохраняя токен
      const updatedUser: User = {
        ...user,
        name: updatedUserData.name,
        phone: updatedUserData.phone || '',
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  };

  // Проверка сохраненного пользователя при загрузке
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('auth_token');
    
    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Проверяем, что у пользователя есть токен
        if (parsedUser.token || savedToken) {
          setUser({ ...parsedUser, token: parsedUser.token || savedToken });
        } else {
          // Если токена нет, очищаем данные
          localStorage.removeItem('user');
          localStorage.removeItem('auth_token');
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
      }
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;