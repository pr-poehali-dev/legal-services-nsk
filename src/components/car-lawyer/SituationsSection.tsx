import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function SituationsSection() {
  const situations = [
    {
      icon: 'AlertTriangle',
      title: 'Скрыли пробег',
      description: 'Обнаружили, что реальный пробег больше заявленного? Это обман покупателя по ст. 18 ЗоЗПП',
      result: '→ Полный возврат + штраф'
    },
    {
      icon: 'Wrench',
      title: 'Скрытые дефекты',
      description: 'Авто после ДТП, проблемы с двигателем, коробкой? Продавец обязан был сообщить',
      result: '→ Возврат денег + расходы'
    },
    {
      icon: 'FileX',
      title: 'Проблемы с документами',
      description: 'Дубликат ПТС, залог, ограничения ГИБДД, скрытая история — основание для расторжения',
      result: '→ Аннулируем сделку'
    },
    {
      icon: 'DollarSign',
      title: 'Завышена цена',
      description: 'Реальная стоимость авто на 20-30% ниже? Это существенное нарушение условий договора',
      result: '→ Перерасчёт + возврат'
    },
    {
      icon: 'Hammer',
      title: 'Постоянные поломки',
      description: 'Машина всё время в ремонте? Недостаток технически неустраним — основание для возврата',
      result: '→ Деньги назад + ремонты'
    },
    {
      icon: 'Users',
      title: 'Продавец не идёт на контакт',
      description: 'Игнорирует претензии, отказывает в возврате? Через суд получите в 2-3 раза больше',
      result: '→ Суд + штраф 50%'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-4">
          Ваша ситуация? Мы решаем!
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Если хотя бы один пункт про вас — у вас есть все шансы вернуть деньги с компенсацией
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {situations.map((situation, index) => (
            <Card key={index} className="border-2 border-red-200 hover:border-red-400 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon name={situation.icon as any} className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{situation.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {situation.description}
                </p>
                <span className="text-sm font-semibold text-red-600">{situation.result}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
