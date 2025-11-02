import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';

interface Case {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  lawyer_name?: string;
  price: number;
  progress: number;
  category?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
}

interface Payment {
  id: string;
  amount: number;
  date: string;
  description: string;
  status: 'paid' | 'pending' | 'overdue';
}

const ClientDashboard: React.FC = () => {
  const { user, updateProfile, isLoading, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });
  const [userCases, setUserCases] = useState<Case[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);

  // Загрузка дел пользователя при монтировании компонента
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) return;
      
      try {
        const response = await fetch('https://functions.poehali.dev/051ee883-7010-44a8-a46c-b5021e841de7?type=cases', {
          method: 'GET',
          headers: {
            'X-Auth-Token': token,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.cases) {
            setUserCases(data.cases);
          }
        }
      } catch (error) {
        console.error('Error loading user cases:', error);
      } finally {
        setLoadingCases(false);
      }
    };

    fetchUserProfile();
  }, [user?.token]);

  // Обновление данных формы редактирования при изменении пользователя
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name,
        phone: user.phone
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!editData.name.trim()) {
      alert('Имя не может быть пустым');
      return;
    }

    try {
      await updateProfile({
        name: editData.name,
        phone: editData.phone
      });
      setIsEditing(false);
      alert('Профиль успешно обновлен');
    } catch (error) {
      alert('Ошибка при обновлении профиля: ' + (error as Error).message);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      name: user?.name || '',
      phone: user?.phone || ''
    });
    setIsEditing(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Ожидает', variant: 'secondary' as const },
      in_progress: { label: 'В работе', variant: 'default' as const },
      completed: { label: 'Завершено', variant: 'success' as const },
      cancelled: { label: 'Отменено', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config?.variant || 'secondary'}>{config?.label || status}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: 'Оплачено', variant: 'success' as const },
      pending: { label: 'Ожидает оплаты', variant: 'secondary' as const },
      overdue: { label: 'Просрочено', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config?.variant || 'secondary'}>{config?.label || status}</Badge>;
  };

  // Заглушки для документов и платежей (пока не реализованы в бэкенде)
  const [documents] = useState<Document[]>([]);
  const [payments] = useState<Payment[]>([]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Icon name="AlertCircle" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Для доступа к личному кабинету необходимо войти в систему</p>
            <Button onClick={() => window.location.href = '/'}>
              На главную
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
              <p className="text-gray-600 mt-1">Управление вашими делами и документами</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
                На сайт
              </Button>
              <Button variant="outline" onClick={logout}>
                <Icon name="LogOut" className="h-4 w-4 mr-2" />
                Выход
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src="" />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="User" className="h-5 w-5" />
                  Информация о клиенте
                </div>
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    disabled={isLoading}
                  >
                    <Icon name="Edit" className="h-4 w-4 mr-2" />
                    Редактировать
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Имя</Label>
                      <Input
                        id="edit-name"
                        value={editData.name}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Введите ваше имя"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-phone">Телефон</Label>
                      <Input
                        id="edit-phone"
                        value={editData.phone}
                        onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Введите ваш телефон"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email (только для просмотра)</Label>
                    <Input value={user.email} disabled />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                          Сохранение...
                        </>
                      ) : (
                        <>
                          <Icon name="Save" className="h-4 w-4 mr-2" />
                          Сохранить
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleCancelEdit}
                      disabled={isLoading}
                    >
                      Отменить
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Имя</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Телефон</p>
                    <p className="font-medium">{user.phone || 'Не указан'}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cases">Мои дела</TabsTrigger>
            <TabsTrigger value="documents">Документы</TabsTrigger>
            <TabsTrigger value="payments">Платежи</TabsTrigger>
            <TabsTrigger value="messages">Сообщения</TabsTrigger>
          </TabsList>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Мои дела</h2>
              <Button>
                <Icon name="Plus" className="h-4 w-4 mr-2" />
                Новое обращение
              </Button>
            </div>

            {loadingCases ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Loader2" className="h-8 w-8 text-gray-400 mx-auto mb-4 animate-spin" />
                  <p className="text-gray-600">Загрузка дел...</p>
                </CardContent>
              </Card>
            ) : userCases.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="FileX" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">У вас пока нет дел</p>
                  <Button>
                    <Icon name="Plus" className="h-4 w-4 mr-2" />
                    Создать первое дело
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {userCases.map((case_) => (
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
                          <p className="text-sm text-gray-600">Юрист</p>
                          <p className="font-medium">{case_.lawyer_name || 'Не назначен'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Стоимость</p>
                          <p className="font-medium">{case_.price.toLocaleString()} ₽</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Создано</p>
                          <p className="font-medium">{new Date(case_.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Обновлено</p>
                          <p className="font-medium">{new Date(case_.updated_at).toLocaleDateString()}</p>
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
                          <Icon name="FileText" className="h-4 w-4 mr-2" />
                          Детали
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="MessageCircle" className="h-4 w-4 mr-2" />
                          Написать юристу
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Документы</h2>
              <Button>
                <Icon name="Upload" className="h-4 w-4 mr-2" />
                Загрузить документ
              </Button>
            </div>

            {documents.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="FileText" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">У вас пока нет документов</p>
                  <Button>
                    <Icon name="Upload" className="h-4 w-4 mr-2" />
                    Загрузить первый документ
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {documents.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Icon name="FileText" className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-600">
                              Загружен {new Date(doc.uploadedAt).toLocaleDateString()} • {doc.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Download" className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <h2 className="text-xl font-semibold">История платежей</h2>

            {payments.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="CreditCard" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">История платежей пуста</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {payments.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-lg">{payment.amount.toLocaleString()} ₽</p>
                          <p className="text-gray-600">{payment.description}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(payment.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          {getPaymentStatusBadge(payment.status)}
                          {payment.status === 'pending' && (
                            <Button className="mt-2" size="sm">
                              Оплатить
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <h2 className="text-xl font-semibold">Сообщения</h2>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="MessageCircle" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">У вас пока нет сообщений</p>
                <Button>
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Написать юристу
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;