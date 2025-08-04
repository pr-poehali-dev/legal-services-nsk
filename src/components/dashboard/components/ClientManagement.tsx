import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

interface ClientManagementProps {
  clients: Client[];
}

const ClientManagement: React.FC<ClientManagementProps> = ({ clients }) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default ClientManagement;