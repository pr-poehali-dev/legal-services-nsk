import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PlaceholderTabProps {
  title: string;
  description: string;
  iconName: string;
}

const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ title, description, iconName }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      
      <Card>
        <CardContent className="p-6 text-center">
          <Icon name={iconName as any} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{description}</p>
          <Button disabled>
            Скоро будет доступно
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderTab;