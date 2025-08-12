import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  totalCases: number;
  totalPaid: number;
  isLawyer: boolean;
  status: 'active' | 'inactive';
}

export interface Case {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  clientId: string;
  clientName: string;
  price: number;
  progress: number;
  category: string;
  documents: string[];
  notes: string;
}

interface ClientContextType {
  clients: Client[];
  cases: Case[];
  addClient: (client: Omit<Client, 'id' | 'totalCases' | 'totalPaid'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  addCase: (caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCase: (id: string, updates: Partial<Case>) => void;
  deleteCase: (id: string) => void;
  getClientCases: (clientId: string) => Case[];
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
};

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Иванов Петр Сергеевич',
      email: 'ivanov@example.com',
      phone: '+7 (999) 123-45-67',
      registeredAt: '2024-07-15',
      totalCases: 2,
      totalPaid: 45000,
      isLawyer: false,
      status: 'active'
    },
    {
      id: '2',
      name: 'Петрова Анна Викторovna',
      email: 'petrova@example.com',
      phone: '+7 (999) 234-56-78',
      registeredAt: '2024-07-20',
      totalCases: 1,
      totalPaid: 25000,
      isLawyer: true,
      status: 'active'
    },
    {
      id: '3',
      name: 'Сидоров Михаил Андреевич',
      email: 'sidorov@example.com',
      phone: '+7 (999) 345-67-89',
      registeredAt: '2024-08-01',
      totalCases: 3,
      totalPaid: 75000,
      isLawyer: false,
      status: 'active'
    }
  ]);

  const [cases, setCases] = useState<Case[]>([
    {
      id: '1',
      title: 'Развод и раздел имущества',
      description: 'Расторжение брака и раздел совместно нажитого имущества',
      status: 'in_progress',
      priority: 'high',
      createdAt: '2024-07-16',
      updatedAt: '2024-08-05',
      clientId: '1',
      clientName: 'Иванов Петр Сергеевич',
      price: 35000,
      progress: 65,
      category: 'Семейное право',
      documents: ['marriage_certificate.pdf', 'property_documents.pdf'],
      notes: 'Клиент предоставил все необходимые документы. Готовим исковое заявление.'
    },
    {
      id: '2',
      title: 'Регистрация ООО',
      description: 'Регистрация общества с ограниченной ответственностью',
      status: 'completed',
      priority: 'medium',
      createdAt: '2024-07-21',
      updatedAt: '2024-07-28',
      clientId: '2',
      clientName: 'Петрова Анна Викторovna',
      price: 25000,
      progress: 100,
      category: 'Корпоративное право',
      documents: ['charter.pdf', 'registration_documents.pdf'],
      notes: 'Регистрация успешно завершена. Документы переданы клиенту.'
    },
    {
      id: '3',
      title: 'Взыскание долга',
      description: 'Взыскание задолженности по договору поставки',
      status: 'in_progress',
      priority: 'high',
      createdAt: '2024-08-02',
      updatedAt: '2024-08-08',
      clientId: '3',
      clientName: 'Сидоров Михаил Андреевич',
      price: 40000,
      progress: 30,
      category: 'Гражданское право',
      documents: ['supply_contract.pdf', 'debt_calculation.xlsx'],
      notes: 'Направлена претензия должнику. Ожидаем ответ в течение 30 дней.'
    }
  ]);

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const savedClients = localStorage.getItem('clients');
    const savedCases = localStorage.getItem('cases');
    
    if (savedClients) {
      try {
        setClients(JSON.parse(savedClients));
      } catch (error) {
        console.error('Error parsing clients from localStorage:', error);
      }
    }
    
    if (savedCases) {
      try {
        setCases(JSON.parse(savedCases));
      } catch (error) {
        console.error('Error parsing cases from localStorage:', error);
      }
    }
  }, []);

  // Сохранение данных в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('cases', JSON.stringify(cases));
  }, [cases]);

  const addClient = (clientData: Omit<Client, 'id' | 'totalCases' | 'totalPaid'>) => {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(),
      totalCases: 0,
      totalPaid: 0
    };
    setClients(prev => [newClient, ...prev]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, ...updates } : client
    ));
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
    // Также удаляем все дела этого клиента
    setCases(prev => prev.filter(case_ => case_.clientId !== id));
  };

  const addCase = (caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newCase: Case = {
      ...caseData,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now
    };
    setCases(prev => [newCase, ...prev]);
    
    // Обновляем счетчик дел у клиента
    setClients(prev => prev.map(client => 
      client.id === caseData.clientId 
        ? { ...client, totalCases: client.totalCases + 1 }
        : client
    ));
  };

  const updateCase = (id: string, updates: Partial<Case>) => {
    const now = new Date().toISOString().split('T')[0];
    setCases(prev => prev.map(case_ => 
      case_.id === id 
        ? { ...case_, ...updates, updatedAt: now }
        : case_
    ));
  };

  const deleteCase = (id: string) => {
    const case_ = cases.find(c => c.id === id);
    if (case_) {
      setCases(prev => prev.filter(c => c.id !== id));
      
      // Обновляем счетчик дел у клиента
      setClients(prev => prev.map(client => 
        client.id === case_.clientId 
          ? { ...client, totalCases: Math.max(0, client.totalCases - 1) }
          : client
      ));
    }
  };

  const getClientCases = (clientId: string) => {
    return cases.filter(case_ => case_.clientId === clientId);
  };

  const value = {
    clients,
    cases,
    addClient,
    updateClient,
    deleteClient,
    addCase,
    updateCase,
    deleteCase,
    getClientCases
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};