import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AdminClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  totalCases: number;
  totalPaid: number;
  isLawyer: boolean;
  status: 'active' | 'inactive';
  role: string;
}

export interface AdminCase {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  clientId: string;
  client: string;
  price: number;
  progress: number;
  category: string;
  notes: string;
}

interface AdminContextType {
  clients: AdminClient[];
  cases: AdminCase[];
  loading: boolean;
  error: string | null;
  loadData: () => Promise<void>;
  createCase: (caseData: Partial<AdminCase>) => Promise<void>;
  updateCase: (id: string, updates: Partial<AdminCase>) => Promise<void>;
  deleteCase: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

const API_BASE = 'https://functions.poehali.dev';
const ADMIN_API = `${API_BASE}/08d77f75-4910-46f5-8d70-eb523cb523cc`;

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<AdminClient[]>([]);
  const [cases, setCases] = useState<AdminCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(ADMIN_API);
      if (response.ok) {
        const data = await response.json();
        setClients(data.users || []);
        setCases(data.cases || []);
        if (data.demo_mode) {
          console.log('Работаем в demo режиме');
        }
      } else {
        setError('Ошибка загрузки данных');
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  const createCase = async (caseData: Partial<AdminCase>) => {
    try {
      const response = await fetch(ADMIN_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(caseData)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          await loadData(); // Reload data
        } else {
          throw new Error(result.error || 'Failed to create case');
        }
      } else {
        throw new Error('Failed to create case');
      }
    } catch (err) {
      console.error('Error creating case:', err);
      setError('Ошибка создания дела');
    }
  };

  const updateCase = async (id: string, updates: Partial<AdminCase>) => {
    try {
      const response = await fetch(`${ADMIN_API}?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Update local state immediately for better UX
          setCases(prev => prev.map(c => 
            c.id === id ? { ...c, ...updates } : c
          ));
        } else {
          throw new Error(result.error || 'Failed to update case');
        }
      } else {
        throw new Error('Failed to update case');
      }
    } catch (err) {
      console.error('Error updating case:', err);
      setError('Ошибка обновления дела');
    }
  };

  const deleteCase = async (id: string) => {
    try {
      const response = await fetch(`${ADMIN_API}?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setCases(prev => prev.filter(c => c.id !== id));
        } else {
          throw new Error(result.error || 'Failed to delete case');
        }
      } else {
        throw new Error('Failed to delete case');
      }
    } catch (err) {
      console.error('Error deleting case:', err);
      setError('Ошибка удаления дела');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const value = {
    clients,
    cases,
    loading,
    error,
    loadData,
    createCase,
    updateCase,
    deleteCase
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};