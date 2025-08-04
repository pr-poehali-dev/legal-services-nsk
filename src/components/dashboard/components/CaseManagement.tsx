import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

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

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  totalCases: number;
  totalPaid: number;
}

interface CaseManagementProps {
  cases: Case[];
  clients: Client[];
  newCaseForm: {
    clientId: string;
    title: string;
    description: string;
    price: string;
    status: string;
  };
  setNewCaseForm: React.Dispatch<React.SetStateAction<{
    clientId: string;
    title: string;
    description: string;
    price: string;
    status: string;
  }>>;
  handleCreateCase: (e: React.FormEvent) => void;
}

const CaseManagement: React.FC<CaseManagementProps> = ({
  cases,
  clients,
  newCaseForm,
  setNewCaseForm,
  handleCreateCase
}) => {
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

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default CaseManagement;