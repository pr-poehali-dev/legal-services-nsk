import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Case {
  id: string;
  title: string;
  status: string;
  priority: string;
  category: string;
  price: number;
  progress: number;
  created_at: string;
}

interface Interaction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  description: string;
  created_at: string;
  created_by: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  cases: Case[];
  interactions: Interaction[];
  total_paid: number;
  total_debt: number;
}

const API_URL = 'https://functions.poehali.dev/45070852-d041-47e0-b7d4-1036ea1c8dc2';

const ClientCard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [newInteraction, setNewInteraction] = useState({ type: 'note', description: '' });

  useEffect(() => {
    loadClient();
  }, [id]);

  const loadClient = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`${API_URL}?type=client_detail&client_id=${id}`, {
        headers: { 'X-Auth-Token': token || '' }
      });

      if (!res.ok) throw new Error('Failed to load client');
      
      const data = await res.json();
      setClient(data);
    } catch (error) {
      console.error('Error loading client:', error);
      toast.error('Ошибка загрузки данных клиента');
    } finally {
      setLoading(false);
    }
  };

  const addInteraction = async () => {
    if (!newInteraction.description.trim()) {
      toast.error('Введите описание взаимодействия');
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({
          action: 'add_interaction',
          client_id: id,
          type: newInteraction.type,
          description: newInteraction.description
        })
      });

      if (!res.ok) throw new Error('Failed to add interaction');
      
      toast.success('Взаимодействие добавлено');
      setNewInteraction({ type: 'note', description: '' });
      loadClient();
    } catch (error) {
      console.error('Error adding interaction:', error);
      toast.error('Ошибка добавления взаимодействия');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Ожидает', variant: 'secondary' },
      in_progress: { label: 'В работе', variant: 'default' },
      completed: { label: 'Завершено', variant: 'outline' },
      cancelled: { label: 'Отменено', variant: 'destructive' }
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getInteractionIcon = (type: string) => {
    const icons: Record<string, string> = {
      call: 'Phone',
      email: 'Mail',
      meeting: 'Users',
      note: 'FileText'
    };
    return icons[type] || 'FileText';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Клиент не найден</h2>
          <Button onClick={() => navigate('/lawyer')}>Вернуться к панели</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/lawyer')} className="mb-4">
          <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
          Назад к панели
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" className="h-5 w-5" />
                  Информация о клиенте
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Имя</p>
                  <p className="font-medium">{client.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{client.email}</p>
                </div>
                {client.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-medium">{client.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Клиент с</p>
                  <p className="font-medium">
                    {new Date(client.created_at).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Оплачено</span>
                    <span className="font-medium text-green-600">{client.total_paid.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Задолженность</span>
                    <span className="font-medium text-red-600">{client.total_debt.toLocaleString()} ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Icon name="Phone" className="h-4 w-4 mr-2" />
                  Позвонить
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Icon name="Mail" className="h-4 w-4 mr-2" />
                  Написать email
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Создать дело
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="cases" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cases">Дела ({client.cases.length})</TabsTrigger>
                <TabsTrigger value="interactions">История ({client.interactions.length})</TabsTrigger>
                <TabsTrigger value="documents">Документы</TabsTrigger>
              </TabsList>

              <TabsContent value="cases" className="space-y-4">
                {client.cases.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      <Icon name="FolderOpen" className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Дел пока нет</p>
                    </CardContent>
                  </Card>
                ) : (
                  client.cases.map((case_) => (
                    <Card key={case_.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{case_.title}</h3>
                            <div className="flex gap-2 mb-2">
                              {getStatusBadge(case_.status)}
                              <Badge variant="outline">{case_.category}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{case_.price.toLocaleString()} ₽</p>
                            <p className="text-sm text-muted-foreground">Прогресс: {case_.progress}%</p>
                          </div>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2 mt-3">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${case_.progress}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="interactions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Добавить взаимодействие</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Button
                        variant={newInteraction.type === 'call' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewInteraction({ ...newInteraction, type: 'call' })}
                      >
                        <Icon name="Phone" className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={newInteraction.type === 'email' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewInteraction({ ...newInteraction, type: 'email' })}
                      >
                        <Icon name="Mail" className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={newInteraction.type === 'meeting' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewInteraction({ ...newInteraction, type: 'meeting' })}
                      >
                        <Icon name="Users" className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={newInteraction.type === 'note' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewInteraction({ ...newInteraction, type: 'note' })}
                      >
                        <Icon name="FileText" className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Описание взаимодействия..."
                      value={newInteraction.description}
                      onChange={(e) => setNewInteraction({ ...newInteraction, description: e.target.value })}
                      rows={3}
                    />
                    <Button onClick={addInteraction} className="w-full">
                      <Icon name="Plus" className="h-4 w-4 mr-2" />
                      Добавить
                    </Button>
                  </CardContent>
                </Card>

                {client.interactions.map((interaction) => (
                  <Card key={interaction.id}>
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <div className="mt-1">
                          <Icon name={getInteractionIcon(interaction.type)} className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm mb-1">{interaction.description}</p>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span>{new Date(interaction.created_at).toLocaleString('ru-RU')}</span>
                            <span>•</span>
                            <span>{interaction.created_by}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {client.interactions.length === 0 && (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      <Icon name="MessageSquare" className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>История взаимодействий пуста</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    <Icon name="FileText" className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Раздел документов в разработке</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;