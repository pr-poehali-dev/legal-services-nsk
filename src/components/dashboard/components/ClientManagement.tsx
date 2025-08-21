import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Client } from '@/contexts/ClientContext';

interface ClientManagementProps {
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'totalCases' | 'totalPaid'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
}

const ClientManagement: React.FC<ClientManagementProps> = ({ 
  clients, 
  addClient, 
  updateClient, 
  deleteClient 
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive',
    isLawyer: false
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'active',
      isLawyer: false
    });
    setEditingClient(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Заполните все обязательные поля');
      return;
    }

    if (editingClient) {
      updateClient(editingClient.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        isLawyer: formData.isLawyer
      });
    } else {
      addClient({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        registeredAt: new Date().toISOString().split('T')[0],
        status: formData.status,
        isLawyer: formData.isLawyer
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      status: client.status,
      isLawyer: client.isLawyer
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этого клиента? Все его дела также будут удалены.')) {
      deleteClient(id);
    }
  };

  const toggleLawyerStatus = (client: Client) => {
    updateClient(client.id, { isLawyer: !client.isLawyer });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Управление клиентами</h2>
          <p className="text-muted-foreground">Добавляйте клиентов и назначайте юристов</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Icon name="UserPlus" className="h-4 w-4 mr-2" />
              Добавить клиента
            </Button>
          </DialogTrigger>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingClient ? 'Редактировать клиента' : 'Добавить клиента'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">ФИО *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Иванов Иван Иванович"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="client@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Статус</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'active' | 'inactive' }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Активный</SelectItem>
                    <SelectItem value="inactive">Неактивный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isLawyer"
                  checked={formData.isLawyer}
                  onChange={(e) => setFormData(prev => ({ ...prev, isLawyer: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isLawyer">Назначить юристом</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Отмена
                </Button>
                <Button type="submit">
                  {editingClient ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Icon name="Users" className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Всего клиентов</p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Icon name="UserCheck" className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Активные</p>
                <p className="text-2xl font-bold">{clients.filter(c => c.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Icon name="Briefcase" className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Юристы</p>
                <p className="text-2xl font-bold">{clients.filter(c => c.isLawyer).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      <div className="grid gap-4">
        {clients.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Icon name="Users" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Пока нет клиентов. Добавьте первого!</p>
            </CardContent>
          </Card>
        ) : (
          clients.map((client) => (
            <Card key={client.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-lg">
                        {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{client.name}</h3>
                        {client.isLawyer && (
                          <Badge variant="secondary">
                            <Icon name="Briefcase" className="h-3 w-3 mr-1" />
                            Юрист
                          </Badge>
                        )}
                        <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                          {client.status === 'active' ? 'Активный' : 'Неактивный'}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{client.email}</p>
                      <p className="text-gray-600">{client.phone}</p>
                      <p className="text-sm text-gray-500">
                        Зарегистрирован: {new Date(client.registeredAt).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Дел</p>
                        <p className="font-semibold">{client.totalCases}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Оплачено</p>
                        <p className="font-semibold">{client.totalPaid.toLocaleString()} ₽</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(client)}
                      >
                        <Icon name="Edit" className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleLawyerStatus(client)}
                        className={client.isLawyer ? 'bg-purple-50' : ''}
                      >
                        <Icon name="Briefcase" className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(client.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Icon name="Trash2" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientManagement;