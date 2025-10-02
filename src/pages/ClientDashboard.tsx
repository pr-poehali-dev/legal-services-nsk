import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import CreateCaseDialog from '@/components/CreateCaseDialog';

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
  lawyer_name?: string;
}

interface Payment {
  id: string;
  amount: number;
  description: string;
  status: string;
  created_at: string;
}

const API_URL = 'https://functions.poehali.dev/bbe69fb4-2a9a-478e-9b6c-efbfdb5ab40b';

const ClientDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      
      const [casesRes, paymentsRes] = await Promise.all([
        fetch(`${API_URL}?type=cases`, {
          headers: { 'X-Auth-Token': token || '' }
        }),
        fetch(`${API_URL}?type=payments`, {
          headers: { 'X-Auth-Token': token || '' }
        })
      ]);

      if (casesRes.ok) {
        const casesData = await casesRes.json();
        setCases(Array.isArray(casesData) ? casesData : []);
      }

      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json();
        setPayments(Array.isArray(paymentsData) ? paymentsData : []);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      toast.error('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || user?.role !== 'client') {
    return <Navigate to="/client/login" replace />;
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

  const totalPaid = payments
    .filter(p => p.status === 'completed' || p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const activeCases = cases.filter(c => c.status === 'in_progress').length;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Личный кабинет</h1>
            <p className="text-muted-foreground mt-1">Добро пожаловать, {user.name}</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <Icon name="LogOut" className="h-4 w-4 mr-2" />
            Выйти
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Активных дел</CardTitle>
              <Icon name="Briefcase" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCases}</div>
              <p className="text-xs text-muted-foreground">из {cases.length} всего</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Всего оплачено</CardTitle>
              <Icon name="CreditCard" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPaid.toLocaleString('ru-RU')} ₽</div>
              <p className="text-xs text-muted-foreground">{payments.length} платежей</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Статус</CardTitle>
              <Icon name="CheckCircle" className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Активен</div>
              <p className="text-xs text-muted-foreground">С {formatDate(user.created_at || new Date().toISOString())}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Мои дела</h2>
              <Button size="sm" onClick={() => setCreateDialogOpen(true)}>
                <Icon name="Plus" className="h-4 w-4 mr-1" />
                Новое дело
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
                  <p className="text-muted-foreground">У вас пока нет дел</p>
                  <Button className="mt-4" size="sm" onClick={() => setCreateDialogOpen(true)}>
                    Создать первое дело
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
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
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name="Calendar" className="h-4 w-4" />
                            {formatDate(caseItem.created_at)}
                          </div>
                          {caseItem.lawyer_name && (
                            <div className="flex items-center gap-2 text-sm">
                              <Icon name="User" className="h-4 w-4" />
                              <span>{caseItem.lawyer_name}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="default" className="flex-1">
                            <Icon name="Eye" className="h-4 w-4 mr-1" />
                            Открыть
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="MessageCircle" className="h-4 w-4 mr-1" />
                            Чат
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Платежи</h2>
            {loading ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-muted-foreground">Загрузка...</p>
                </CardContent>
              </Card>
            ) : payments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Icon name="Wallet" className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Платежей пока нет</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {payments.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{payment.amount.toLocaleString('ru-RU')} ₽</span>
                        <Badge variant={(payment.status === 'completed' || payment.status === 'paid') ? 'outline' : 'secondary'}>
                          {(payment.status === 'completed' || payment.status === 'paid') ? 'Оплачено' : 'Ожидает'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{payment.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Icon name="Calendar" className="h-3 w-3" />
                        {formatDate(payment.created_at)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <CreateCaseDialog 
          open={createDialogOpen} 
          onOpenChange={setCreateDialogOpen}
          onSuccess={loadData}
        />
      </div>
    </div>
  );
};

export default ClientDashboard;