import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import BlogManager from '@/components/BlogManager';
import CaseEditDialog from '@/components/CaseEditDialog';
import CreateCaseForClientDialog from '@/components/CreateCaseForClientDialog';

interface Case {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  price: number;
  progress: number;
  created_at: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  cases_count: number;
}

const API_URL = 'https://functions.poehali.dev/051ee883-7010-44a8-a46c-b5021e841de7';

const LawyerDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [createCaseDialogOpen, setCreateCaseDialogOpen] = useState(false);
  
  console.log('🔵 LawyerDashboard mounted');

  useEffect(() => {
    console.log('👤 Auth state:', { isAuthenticated, role: user?.role });
    if (isAuthenticated && (user?.role === 'lawyer' || user?.role === 'admin')) {
      console.log('✅ Auth OK, loading data...');
      loadData();
    } else {
      console.log('❌ Auth failed or wrong role');
    }
  }, [isAuthenticated, user]);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      console.log('🔄 Loading data... token:', token ? 'exists' : 'missing');
      
      const [casesRes, clientsRes] = await Promise.all([
        fetch(`${API_URL}?type=cases`, {
          headers: { 'X-Auth-Token': token || '' }
        }),
        fetch(`${API_URL}?type=clients`, {
          headers: { 'X-Auth-Token': token || '' }
        })
      ]);
      
      console.log('📡 API responses:', { casesStatus: casesRes.status, clientsStatus: clientsRes.status });

      if (casesRes.ok) {
        const casesData = await casesRes.json();
        console.log('Cases loaded:', casesData);
        setCases(Array.isArray(casesData) ? casesData : []);
      } else {
        console.error('Cases load failed:', casesRes.status, await casesRes.text());
      }

      if (clientsRes.ok) {
        const clientsData = await clientsRes.json();
        console.log('✅ Clients loaded:', clientsData, 'Total:', Array.isArray(clientsData) ? clientsData.length : 0);
        setClients(Array.isArray(clientsData) ? clientsData : []);
      } else {
        console.error('❌ Clients load failed:', clientsRes.status, await clientsRes.text());
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      toast.error('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (table: string, id: string, type: string) => {
    if (!confirm(`Вы уверены, что хотите удалить эту запись?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`${API_URL}?table=${table}&id=${id}`, {
        method: 'DELETE',
        headers: { 'X-Auth-Token': token || '' }
      });

      if (res.ok) {
        toast.success('Запись удалена');
        if (type === 'case') {
          setCases(prev => prev.filter(c => c.id !== id));
        } else if (type === 'client') {
          setClients(prev => prev.filter(c => c.id !== id));
        }
      } else {
        toast.error('Ошибка при удалении');
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
      toast.error('Ошибка удаления записи');
    }
  };

  if (!isAuthenticated || (user?.role !== 'lawyer' && user?.role !== 'admin')) {
    return <Navigate to="/" replace />;
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string }> = {
      pending: { variant: 'secondary', label: 'Ожидает' },
      in_progress: { variant: 'default', label: 'В работе' },
      completed: { variant: 'outline', label: 'Завершено' },
      cancelled: { variant: 'destructive', label: 'Отменено' }
    };
    const config = variants[status] || { variant: 'secondary', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityIcon = (priority: string) => {
    const icons: Record<string, { icon: string, color: string }> = {
      high: { icon: 'AlertCircle', color: 'text-red-500' },
      medium: { icon: 'AlertTriangle', color: 'text-yellow-500' },
      low: { icon: 'Info', color: 'text-blue-500' }
    };
    const config = icons[priority] || icons.medium;
    return <Icon name={config.icon} className={`h-4 w-4 ${config.color}`} />;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const activeCases = cases.filter(c => c.status === 'in_progress').length;
  const pendingCases = cases.filter(c => c.status === 'pending').length;
  const completedCases = cases.filter(c => c.status === 'completed').length;

  if (!isAuthenticated || !user) {
    console.log('🚫 Not authenticated, redirecting...');
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'lawyer' && user.role !== 'admin') {
    console.log('🚫 Wrong role:', user.role);
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Панель юриста</h1>
            <p className="text-muted-foreground mt-1">Добро пожаловать, {user.name}</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <Icon name="LogOut" className="h-4 w-4 mr-2" />
            Выйти
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">В работе</CardTitle>
              <Icon name="Briefcase" className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCases}</div>
              <p className="text-xs text-muted-foreground">активных дел</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ожидают</CardTitle>
              <Icon name="Clock" className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCases}</div>
              <p className="text-xs text-muted-foreground">новых дел</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Завершено</CardTitle>
              <Icon name="CheckCircle" className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCases}</div>
              <p className="text-xs text-muted-foreground">дел закрыто</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Клиентов</CardTitle>
              <Icon name="Users" className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground">всего клиентов</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cases" className="space-y-6">
          <TabsList>
            <TabsTrigger value="cases">Дела</TabsTrigger>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="blog">Блог</TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Дела клиентов</h2>
              <Button onClick={() => setCreateCaseDialogOpen(true)}>
                <Icon name="Plus" className="h-4 w-4 mr-2" />
                Создать дело
              </Button>
            </div>

            {loading ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-muted-foreground">Загрузка...</p>
                </CardContent>
              </Card>
            ) : cases.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Icon name="FolderOpen" className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Дел пока нет</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {cases.map((caseItem) => (
                  <Card key={caseItem.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getPriorityIcon(caseItem.priority)}
                            <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {caseItem.description}
                          </p>
                        </div>
                        {getStatusBadge(caseItem.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-medium">{caseItem.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${caseItem.progress}%` }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Клиент:</span>
                            <p className="font-medium">{caseItem.client_name || 'Не назначен'}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Категория:</span>
                            <p className="font-medium">{caseItem.category || 'Без категории'}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Цена:</span>
                            <p className="font-medium">{caseItem.price.toLocaleString('ru-RU')} ₽</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Создано:</span>
                            <p className="font-medium">{formatDate(caseItem.created_at)}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="default" className="flex-1" onClick={() => setEditingCase(caseItem)}>
                            <Icon name="Edit" className="h-4 w-4 mr-1" />
                            Редактировать
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDelete('cases', caseItem.id, 'case')}
                          >
                            <Icon name="Trash2" className="h-4 w-4" />
                          </Button>
                          {caseItem.client_phone && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(`https://wa.me/${caseItem.client_phone.replace(/\D/g, '')}`, '_blank')}
                            >
                              <Icon name="MessageCircle" className="h-4 w-4 mr-1" />
                              WhatsApp
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

          <TabsContent value="clients" className="space-y-4">
            {loading ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-muted-foreground">Загрузка...</p>
                </CardContent>
              </Card>
            ) : clients.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Icon name="Users" className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Клиентов пока нет</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {clients.map((client) => (
                  <Card key={client.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Mail" className="h-4 w-4 text-muted-foreground" />
                          <span>{client.email}</span>
                        </div>
                        {client.phone && (
                          <div className="flex items-center gap-2">
                            <Icon name="Phone" className="h-4 w-4 text-muted-foreground" />
                            <span>{client.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Icon name="Calendar" className="h-4 w-4 text-muted-foreground" />
                          <span>Клиент с {formatDate(client.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Briefcase" className="h-4 w-4 text-muted-foreground" />
                          <span>{client.cases_count} дел</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => navigate(`/lawyer/client/${client.id}`)}
                        >
                          <Icon name="Eye" className="h-4 w-4 mr-1" />
                          Профиль
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete('users', client.id, 'client')}
                        >
                          <Icon name="Trash2" className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="blog">
            <BlogManager />
          </TabsContent>
        </Tabs>

        <CaseEditDialog
          open={!!editingCase}
          onOpenChange={(open) => !open && setEditingCase(null)}
          caseData={editingCase}
          onSuccess={loadData}
        />

        <CreateCaseForClientDialog
          open={createCaseDialogOpen}
          onOpenChange={setCreateCaseDialogOpen}
          clients={clients}
          onSuccess={loadData}
          onClientCreated={loadData}
        />
      </div>
    </div>
  );
};

export default LawyerDashboard;