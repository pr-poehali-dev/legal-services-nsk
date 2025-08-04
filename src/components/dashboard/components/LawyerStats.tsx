import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Stats {
  totalClients: number;
  activeCases: number;
  completedCases: number;
  monthlyRevenue: number;
  pendingPayments: number;
}

interface LawyerStatsProps {
  stats: Stats;
}

const LawyerStats: React.FC<LawyerStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Всего клиентов</p>
              <p className="text-2xl font-bold">{stats.totalClients}</p>
            </div>
            <Icon name="Users" className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Активные дела</p>
              <p className="text-2xl font-bold">{stats.activeCases}</p>
            </div>
            <Icon name="Briefcase" className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Завершено дел</p>
              <p className="text-2xl font-bold">{stats.completedCases}</p>
            </div>
            <Icon name="CheckCircle" className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Доход за месяц</p>
              <p className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()} ₽</p>
            </div>
            <Icon name="DollarSign" className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ожидают оплаты</p>
              <p className="text-2xl font-bold">{stats.pendingPayments}</p>
            </div>
            <Icon name="Clock" className="h-8 w-8 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LawyerStats;