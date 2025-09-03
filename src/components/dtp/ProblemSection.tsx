import React from 'react';
import Icon from '@/components/ui/icon';

const ProblemSection = () => {
  return (
    <section className="py-16 px-4 bg-red-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-red-800 mb-8">
          СТРАХОВЫЕ КОМПАНИИ НЕ ХОТЯТ ПЛАТИТЬ ПОЛНУЮ СУММУ
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Icon
              name="XCircle"
              size={48}
              className="text-red-500 mx-auto mb-4"
            />
            <h3 className="font-bold mb-2">Занижают выплаты</h3>
            <p className="text-gray-600">На 40-70% от реального ущерба</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Icon
              name="Clock"
              size={48}
              className="text-red-500 mx-auto mb-4"
            />
            <h3 className="font-bold mb-2">Тянут время</h3>
            <p className="text-gray-600">Месяцами рассматривают заявления</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Icon
              name="FileX"
              size={48}
              className="text-red-500 mx-auto mb-4"
            />
            <h3 className="font-bold mb-2">Отказывают</h3>
            <p className="text-gray-600">По надуманным причинам</p>
          </div>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg border-l-4 border-yellow-500">
          <p className="text-lg font-semibold text-yellow-800">
            <Icon name="AlertTriangle" size={24} className="inline mr-2" />
            БЕЗ ЮРИСТА ВЫ ПОЛУЧИТЕ В РАЗЫ МЕНЬШЕ ДЕНЕГ!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;