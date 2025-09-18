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
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';

interface Stats {
  totalClients: number;
  activeCases: number;
  completedCases: number;
  monthlyRevenue: number;
  pendingPayments: number;
}

const LawyerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();
  const { clients, cases, loading, error, createCase, updateCase, deleteCase } = useAdmin();
  
  const [newCaseForm, setNewCaseForm] = useState({
    clientId: '',
    title: '',
    description: '',
    price: '',
    status: 'pending',
    priority: 'medium',
    category: ''
  });

  // Подсчет статистики из реальных данных
  const stats: Stats = {
    totalClients: clients.length,
    activeCases: cases.filter(c => c.status === 'in_progress').length,
    completedCases: cases.filter(c => c.status === 'completed').length,
    monthlyRevenue: cases
      .filter(c => c.status === 'completed')
      .reduce((sum, c) => sum + c.price, 0),
    pendingPayments: cases.filter(c => c.status === 'pending').length
  };

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseForm.clientId || !newCaseForm.title || !newCaseForm.description) {
      alert('Заполните все обязательные поля');
      return;
    }

    try {
      await createCase({
        title: newCaseForm.title,
        description: newCaseForm.description,
        status: newCaseForm.status as any,
        priority: newCaseForm.priority as any,
        clientId: newCaseForm.clientId,
        price: parseInt(newCaseForm.price) || 0,
        progress: 0,
        category: newCaseForm.category,
        notes: ''
      });

      // Reset form
      setNewCaseForm({
        clientId: '',
        title: '',
        description: '',
        price: '',
        status: 'pending',
        priority: 'medium',
        category: ''
      });

      alert('Дело успешно создано!');
    } catch (err) {
      alert('Ошибка создания дела');
    }
  };

  const handleBackToSite = () => {
    // Не разлогиниваем, просто скрываем дашборд
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.role === 'admin' ? 'Админ-панель' : 'Панель юриста'}
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.role === 'admin' 
                  ? 'Управление системой и контентом' 
                  : 'Управление клиентами и делами'
                }
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline"
                onClick={handleBackToSite}
              >
                <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
                На сайт
              </Button>
              <Button variant="outline" onClick={logout}>
                <Icon name="LogOut" className="h-4 w-4 mr-2" />
                Выход
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src="" />
                <AvatarFallback>
                  {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2) || 'АД'}
                </AvatarFallback>
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
              updateCase={updateCase}
              deleteCase={deleteCase}
            />
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <ClientManagement 
              clients={clients} 
              addClient={() => {}}
              updateClient={() => {}}
              deleteClient={() => {}}
            />
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