import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import LawyerStats from './components/LawyerStats';
import LawyerOverview from './components/LawyerOverview';
import CaseManagement from './components/CaseManagement';
import ClientManagement from './components/ClientManagement';
import PlaceholderTab from './components/PlaceholderTab';
import BlogAdmin from '@/components/admin/BlogAdmin';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  totalCases: number;
  totalPaid: number;
}

interface Case {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  client: string;
  clientId: string;
  price: number;
  progress: number;
}

interface Stats {
  totalClients: number;
  activeCases: number;
  completedCases: number;
  monthlyRevenue: number;
  pendingPayments: number;
}

const LawyerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [stats] = useState<Stats>({
    totalClients: 24,
    activeCases: 8,
    completedCases: 15,
    monthlyRevenue: 185000,
    pendingPayments: 3
  });

  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'Иван Петров',
      email: 'ivan@example.com',
      phone: '+7 (999) 123-45-67',
      registeredAt: '2024-07-15',
      totalCases: 2,
      totalPaid: 25000
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      email: 'maria@example.com',
      phone: '+7 (999) 234-56-78',
      registeredAt: '2024-06-20',
      totalCases: 1,
      totalPaid: 15000
    },
    {
      id: '3',
      name: 'Алексей Козлов',
      email: 'alex@example.com',
      phone: '+7 (999) 345-67-89',
      registeredAt: '2024-08-01',
      totalCases: 3,
      totalPaid: 45000
    }
  ]);

  const [cases] = useState<Case[]>([
    {
      id: '1',
      title: 'Развод и раздел имущества',
      description: 'Оформление развода с разделом совместно нажитого имущества',
      status: 'in_progress',
      createdAt: '2024-07-15',
      updatedAt: '2024-08-01',
      client: 'Иван Петров',
      clientId: '1',
      price: 25000,
      progress: 65
    },
    {
      id: '2',
      title: 'Банкротство физического лица',
      description: 'Процедура банкротства с реструктуризацией долгов',
      status: 'pending',
      createdAt: '2024-08-01',
      updatedAt: '2024-08-01',
      client: 'Мария Сидорова',
      clientId: '2',
      price: 35000,
      progress: 10
    },
    {
      id: '3',
      title: 'Взыскание задолженности',
      description: 'Взыскание долга по договору займа через суд',
      status: 'completed',
      createdAt: '2024-06-15',
      updatedAt: '2024-07-30',
      client: 'Алексей Козлов',
      clientId: '3',
      price: 20000,
      progress: 100
    }
  ]);

  const [newCaseForm, setNewCaseForm] = useState({
    clientId: '',
    title: '',
    description: '',
    price: '',
    status: 'pending'
  });

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating new case:', newCaseForm);
    // Reset form
    setNewCaseForm({
      clientId: '',
      title: '',
      description: '',
      price: '',
      status: 'pending'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Панель юриста</h1>
              <p className="text-gray-600 mt-1">Управление клиентами и делами</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Icon name="Settings" className="h-4 w-4 mr-2" />
                Настройки
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src="" />
                <AvatarFallback>АС</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Stats Cards */}
          <LawyerStats stats={stats} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="cases">Дела</TabsTrigger>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="blog">Блог</TabsTrigger>
            <TabsTrigger value="payments">Платежи</TabsTrigger>
            <TabsTrigger value="reports">Отчеты</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <LawyerOverview cases={cases} clients={clients} />
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-6">
            <CaseManagement
              cases={cases}
              clients={clients}
              newCaseForm={newCaseForm}
              setNewCaseForm={setNewCaseForm}
              handleCreateCase={handleCreateCase}
            />
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <ClientManagement clients={clients} />
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <BlogAdmin />
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <PlaceholderTab
              title="Управление платежами"
              description="Модуль управления платежами в разработке"
              iconName="CreditCard"
            />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <PlaceholderTab
              title="Отчеты и аналитика"
              description="Модуль отчетов и аналитики в разработке"
              iconName="BarChart3"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LawyerDashboard;