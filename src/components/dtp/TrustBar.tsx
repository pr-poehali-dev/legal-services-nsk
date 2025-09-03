import React from 'react';
import Icon from '@/components/ui/icon';

const TrustBar = () => {
  return (
    <div className="bg-green-600 text-white py-2 px-4 text-center text-sm font-medium">
      <Icon name="Shield" size={16} className="inline mr-2" />
      <span>✓ Лицензия на юридическую деятельность</span>
      <span className="mx-4">•</span>
      <span>✓ Работаем официально с 2009 года</span>
      <span className="mx-4">•</span> 
      <span>✓ Более 2500 выигранных дел</span>
    </div>
  );
};

export default TrustBar;