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
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lawyer_name?: string;
  created_at: string;
}

interface Document {
  id: string;
  name: string;
  file_url: string;
  uploaded_at: string;
}

const ClientDashboard: React.FC = () => {
  const [cases] = useState<Case[]>([
    {
      id: '1',
      title: 'Развод и раздел имущества',
      description: 'Необходимо оформить развод и разделить совместно нажитое имущество',
      status: 'in_progress',
      priority: 'high',
      lawyer_name: 'Михаил Петров',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      title: 'Наследственное дело',
      description: 'Вступление в наследство после смерти родственника',
      status: 'completed',
      priority: 'medium',
      lawyer_name: 'Михаил Петров',
      created_at: '2023-12-10'
    }
  ]);

  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Свидетельство о браке.pdf',
      file_url: '#',
      uploaded_at: '2024-01-20'
    },
    {
      id: '2',
      name: 'Справка о доходах.pdf',
      file_url: '#',
      uploaded_at: '2024-01-18'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Личный кабинет клиента</h1>
          <p className="text-gray-600">Управляйте своими делами и документами</p>
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
                  <p className="text-sm font-medium text-gray-600">Завершенные</p>
                  <p className="text-3xl font-bold text-green-600">
                    {cases.filter(c => c.status === 'completed').length}
                  </p>
                </div>
                <Icon name="CheckCircle" className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Документы</p>
                  <p className="text-3xl font-bold text-purple-600">{documents.length}</p>
                </div>
                <Icon name="Upload" className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего дел</p>
                  <p className="text-3xl font-bold text-gray-600">{cases.length}</p>
                </div>
                <Icon name="Briefcase" className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Основное содержимое */}
        <Tabs defaultValue="cases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cases">Мои дела</TabsTrigger>
            <TabsTrigger value="documents">Документы</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="cases">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Мои дела</h2>
                <Button>
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Новая заявка
                </Button>
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
                        <div className="text-sm text-gray-500">
                          {case_item.lawyer_name && (
                            <p className="flex items-center gap-1">
                              <Icon name="User" className="h-4 w-4" />
                              Юрист: {case_item.lawyer_name}
                            </p>
                          )}
                          <p className="flex items-center gap-1 mt-1">
                            <Icon name="Calendar" className="h-4 w-4" />
                            Создано: {new Date(case_item.created_at).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Мои документы</h2>
                <Button>
                  <Icon name="Upload" className="h-4 w-4 mr-2" />
                  Загрузить документ
                </Button>
              </div>

              <div className="grid gap-4">
                {documents.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon name="FileText" className="h-8 w-8 text-blue-500" />
                          <div>
                            <h3 className="font-medium text-gray-900">{doc.name}</h3>
                            <p className="text-sm text-gray-500">
                              Загружено: {new Date(doc.uploaded_at).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Download" className="h-4 w-4 mr-2" />
                            Скачать
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" className="h-4 w-4 mr-2" />
                            Просмотр
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Профиль пользователя</CardTitle>
                <CardDescription>
                  Управляйте своими личными данными
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="User" className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Анна Иванова</h3>
                    <p className="text-gray-500">anna@example.com</p>
                    <p className="text-gray-500">+7 (999) 123-45-67</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Статистика</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>Всего дел: {cases.length}</p>
                        <p>Активных дел: {cases.filter(c => c.status === 'in_progress').length}</p>
                        <p>Завершенных дел: {cases.filter(c => c.status === 'completed').length}</p>
                        <p>Документов загружено: {documents.length}</p>
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

export default ClientDashboard;