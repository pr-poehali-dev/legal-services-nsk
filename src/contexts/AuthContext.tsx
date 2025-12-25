import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  loginWithSMS: (token: string, userData: any) => void;
  register: (email: string, password: string, name: string, phone?: string, role?: 'client' | 'lawyer') => Promise<void>;
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

// URL бэкенд функций
const AUTH_API_URL = 'https://functions.poehali.dev/051ee883-7010-44a8-a46c-b5021e841de7';

const AuthProvider = ({ children }: AuthProviderProps) => {
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

      const data = await response.json();
      
      const loggedUser: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: '',
        role: data.user.role,
        created_at: new Date().toISOString(),
        token: data.token
      };

      setUser(loggedUser);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      localStorage.setItem('auth_token', data.token);
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
    phone?: string,
    role: 'client' | 'lawyer' = 'client'
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
          role
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка регистрации');
      }

      const data = await response.json();
      
      const newUser: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: phone || '',
        role: data.user.role,
        created_at: new Date().toISOString(),
        token: data.token
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('auth_token', data.token);
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

      const response = await fetch(AUTH_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
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

  const loginWithSMS = (token: string, userData: any) => {
    const loggedUser: User = {
      id: userData.id,
      name: userData.name || 'Клиент',
      email: userData.email || '',
      phone: userData.phone,
      role: userData.role,
      created_at: userData.created_at,
      token: token
    };

    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
    localStorage.setItem('auth_token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  };

  // Проверка сохраненного пользователя при загрузке
  useEffect(() => {
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
    loginWithSMS,
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

export { AuthProvider };
export default AuthProvider;