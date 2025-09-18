import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Case {
  id: string;
  title: string;
  description: string;
  client_name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  deadline?: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cases_count: number;
}

const LawyerDashboard: React.FC = () => {
  const [cases] = useState<Case[]>([
    {
      id: '1',
      title: 'Развод и раздел имущества',
      description: 'Необходимо оформить развод и разделить совместно нажитое имущество',
      client_name: 'Анна Иванова',
      status: 'in_progress',
      priority: 'high',
      created_at: '2024-01-15',
      deadline: '2024-03-15'
    },
    {
      id: '2',
      title: 'Трудовой спор',
      description: 'Работодатель незаконно уволил, нужна помощь в восстановлении на работе',
      client_name: 'Дмитрий Козлов',
      status: 'pending',
      priority: 'medium',
      created_at: '2024-01-20'
    },
    {
      id: '3',
      title: 'Наследственное дело',
      description: 'Вступление в наследство после смерти родственника',
      client_name: 'Анна Иванова',
      status: 'completed',
      priority: 'low',
      created_at: '2023-12-10'
    }
  ]);

  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'Анна Иванова',
      email: 'anna@example.com',
      phone: '+7 (999) 123-45-67',
      cases_count: 2
    },
    {
      id: '2',
      name: 'Дмитрий Козлов',
      email: 'dmitry@example.com',
      phone: '+7 (999) 456-78-90',
      cases_count: 1
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in_progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидание';
      case 'in_progress': return 'В работе';
      case 'completed': return 'Завершено';
      case 'cancelled': return 'Отменено';
      default: return 'Неизвестно';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'urgent': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Кабинет юриста</h1>
          <p className="text-gray-600">Управление делами и клиентами</p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Активные дела</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {cases.filter(c => c.status === 'in_progress').length}
                  </p>
                </div>
                <Icon name="FileText" className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ожидающие</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {cases.filter(c => c.status === 'pending').length}
                  </p>
                </div>
                <Icon name="Clock" className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Клиенты</p>
                  <p className="text-3xl font-bold text-green-600">{clients.length}</p>
                </div>
                <Icon name="Users" className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Завершенные</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {cases.filter(c => c.status === 'completed').length}
                  </p>
                </div>
                <Icon name="CheckCircle" className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Основное содержимое */}
        <Tabs defaultValue="cases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cases">Дела</TabsTrigger>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="calendar">Календарь</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="cases">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Мои дела</h2>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Icon name="Filter" className="h-4 w-4 mr-2" />
                    Фильтры
                  </Button>
                  <Button>
                    <Icon name="Plus" className="h-4 w-4 mr-2" />
                    Новое дело
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {cases.map((case_item) => (
                  <Card key={case_item.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{case_item.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {case_item.description}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={`${getPriorityColor(case_item.priority)} text-white`}>
                            {case_item.priority}
                          </Badge>
                          <Badge className={`${getStatusColor(case_item.status)} text-white`}>
                            {getStatusText(case_item.status)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500 space-y-1">
                          <p className="flex items-center gap-1">
                            <Icon name="User" className="h-4 w-4" />
                            Клиент: {case_item.client_name}
                          </p>
                          <p className="flex items-center gap-1">
                            <Icon name="Calendar" className="h-4 w-4" />
                            Создано: {new Date(case_item.created_at).toLocaleDateString('ru-RU')}
                          </p>
                          {case_item.deadline && (
                            <p className="flex items-center gap-1 text-orange-600">
                              <Icon name="AlertCircle" className="h-4 w-4" />
                              Срок: {new Date(case_item.deadline).toLocaleDateString('ru-RU')}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" className="h-4 w-4 mr-2" />
                            Редактировать
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" className="h-4 w-4 mr-2" />
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clients">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Мои клиенты</h2>
                <Button>
                  <Icon name="UserPlus" className="h-4 w-4 mr-2" />
                  Добавить клиента
                </Button>
              </div>

              <div className="grid gap-4">
                {clients.map((client) => (
                  <Card key={client.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Icon name="User" className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                            <p className="text-sm text-gray-500">{client.email}</p>
                            <p className="text-sm text-gray-500">{client.phone}</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{client.cases_count}</p>
                          <p className="text-sm text-gray-500">дел</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Phone" className="h-4 w-4 mr-2" />
                            Позвонить
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Mail" className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Календарь событий</CardTitle>
                <CardDescription>
                  Ваши встречи и дедлайны
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Icon name="Calendar" className="h-12 w-12 mx-auto mb-4" />
                  <p>Календарь находится в разработке</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Профиль юриста</CardTitle>
                <CardDescription>
                  Управляйте своими профессиональными данными
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="User" className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Михаил Петров</h3>
                    <p className="text-gray-500">mikhail@example.com</p>
                    <p className="text-gray-500">Семейное и наследственное право</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Статистика работы</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>Всего дел: {cases.length}</p>
                        <p>Активных дел: {cases.filter(c => c.status === 'in_progress').length}</p>
                        <p>Завершенных дел: {cases.filter(c => c.status === 'completed').length}</p>
                        <p>Клиентов: {clients.length}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Настройки</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Icon name="Edit" className="h-4 w-4 mr-2" />
                          Редактировать профиль
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Icon name="Settings" className="h-4 w-4 mr-2" />
                          Настройки уведомлений
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Icon name="FileText" className="h-4 w-4 mr-2" />
                          Шаблоны документов
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LawyerDashboard;