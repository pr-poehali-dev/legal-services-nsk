import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Ожидает', variant: 'secondary' as const },
      in_progress: { label: 'В работе', variant: 'default' as const },
      completed: { label: 'Завершено', variant: 'success' as const },
      cancelled: { label: 'Отменено', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Всего клиентов</p>
                    <p className="text-2xl font-bold">{stats.totalClients}</p>
                  </div>
                  <Icon name="Users" className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Активные дела</p>
                    <p className="text-2xl font-bold">{stats.activeCases}</p>
                  </div>
                  <Icon name="Briefcase" className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Завершено дел</p>
                    <p className="text-2xl font-bold">{stats.completedCases}</p>
                  </div>
                  <Icon name="CheckCircle" className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Доход за месяц</p>
                    <p className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()} ₽</p>
                  </div>
                  <Icon name="DollarSign" className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ожидают оплаты</p>
                    <p className="text-2xl font-bold">{stats.pendingPayments}</p>
                  </div>
                  <Icon name="Clock" className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="cases">Дела</TabsTrigger>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="payments">Платежи</TabsTrigger>
            <TabsTrigger value="reports">Отчеты</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Cases */}
              <Card>
                <CardHeader>
                  <CardTitle>Последние дела</CardTitle>
                  <CardDescription>Недавно обновленные дела</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cases.slice(0, 3).map((case_) => (
                      <div key={case_.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{case_.title}</p>
                          <p className="text-sm text-gray-600">{case_.client}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(case_.status)}
                          <p className="text-sm text-gray-600 mt-1">{case_.price.toLocaleString()} ₽</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Clients */}
              <Card>
                <CardHeader>
                  <CardTitle>Активные клиенты</CardTitle>
                  <CardDescription>Клиенты с текущими делами</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.slice(0, 3).map((client) => (
                      <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-gray-600">{client.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{client.totalCases} дел</p>
                          <p className="text-sm text-gray-600">{client.totalPaid.toLocaleString()} ₽</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Управление делами</h2>
              <Button>
                <Icon name="Plus" className="h-4 w-4 mr-2" />
                Новое дело
              </Button>
            </div>

            {/* New Case Form */}
            <Card>
              <CardHeader>
                <CardTitle>Создать новое дело</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateCase} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Клиент</Label>
                    <Select value={newCaseForm.clientId} onValueChange={(value) => setNewCaseForm({...newCaseForm, clientId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите клиента" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Стоимость (₽)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="25000"
                      value={newCaseForm.price}
                      onChange={(e) => setNewCaseForm({...newCaseForm, price: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title">Название дела</Label>
                    <Input
                      id="title"
                      placeholder="Развод и раздел имущества"
                      value={newCaseForm.title}
                      onChange={(e) => setNewCaseForm({...newCaseForm, title: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      placeholder="Детальное описание дела..."
                      value={newCaseForm.description}
                      onChange={(e) => setNewCaseForm({...newCaseForm, description: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Button type="submit" className="w-full md:w-auto">
                      <Icon name="Plus" className="h-4 w-4 mr-2" />
                      Создать дело
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Cases List */}
            <div className="grid gap-4">
              {cases.map((case_) => (
                <Card key={case_.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{case_.title}</CardTitle>
                        <CardDescription className="mt-1">{case_.description}</CardDescription>
                      </div>
                      {getStatusBadge(case_.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Клиент</p>
                        <p className="font-medium">{case_.client}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Стоимость</p>
                        <p className="font-medium">{case_.price.toLocaleString()} ₽</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Создано</p>
                        <p className="font-medium">{new Date(case_.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Обновлено</p>
                        <p className="font-medium">{new Date(case_.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-gray-600">Прогресс</p>
                        <p className="text-sm font-medium">{case_.progress}%</p>
                      </div>
                      <Progress value={case_.progress} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Edit" className="h-4 w-4 mr-2" />
                        Редактировать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="MessageCircle" className="h-4 w-4 mr-2" />
                        Написать клиенту
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="FileText" className="h-4 w-4 mr-2" />
                        Документы
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Клиенты</h2>
              <Button>
                <Icon name="UserPlus" className="h-4 w-4 mr-2" />
                Добавить клиента
              </Button>
            </div>

            <div className="grid gap-4">
              {clients.map((client) => (
                <Card key={client.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="text-lg">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{client.name}</h3>
                          <p className="text-gray-600">{client.email}</p>
                          <p className="text-gray-600">{client.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Дел</p>
                            <p className="font-semibold">{client.totalCases}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Оплачено</p>
                            <p className="font-semibold">{client.totalPaid.toLocaleString()} ₽</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="MessageCircle" className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="FileText" className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <h2 className="text-xl font-semibold">Управление платежами</h2>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="CreditCard" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Модуль управления платежами в разработке</p>
                <Button disabled>
                  Скоро будет доступно
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-xl font-semibold">Отчеты и аналитика</h2>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="BarChart3" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Модуль отчетов и аналитики в разработке</p>
                <Button disabled>
                  Скоро будет доступно
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LawyerDashboard;