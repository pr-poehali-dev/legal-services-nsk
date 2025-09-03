import React from 'react';
import Icon from '@/components/ui/icon';

const SocialProofBar = () => {
  return (
    <section className="py-4 px-4 bg-yellow-100 border-y border-yellow-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-8 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Icon name="Users" size={16} />
            <span><strong>1247</strong> довольных клиентов</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-400"></div>
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} />
            <span>Сейчас онлайн: <strong>3</strong> юриста</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-400"></div>
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={16} />
            <span><strong>94%</strong> положительных решений</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;