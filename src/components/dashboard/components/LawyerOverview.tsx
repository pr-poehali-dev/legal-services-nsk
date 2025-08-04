import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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

interface LawyerOverviewProps {
  cases: Case[];
  clients: Client[];
}

const LawyerOverview: React.FC<LawyerOverviewProps> = ({ cases, clients }) => {
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
  );
};

export default LawyerOverview;