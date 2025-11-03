import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function WorkflowSection() {
  const steps = [
    {
      number: 1,
      title: 'Консультация',
      description: 'Анализируем вашу ситуацию, оцениваем перспективы, называем сумму взыскания'
    },
    {
      number: 2,
      title: 'Досудебная работа',
      description: 'Составляем претензию, проводим экспертизу, собираем доказательства'
    },
    {
      number: 3,
      title: 'Суд',
      description: 'Подаём иск, представляем интересы, добиваемся максимальной суммы'
    },
    {
      number: 4,
      title: 'Получение денег',
      description: 'Взыскиваем решение суда через ФССП, контролируем выплату'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-4">
          Как мы работаем
        </h2>
        <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
          Берём все задачи на себя — вам нужно только предоставить документы
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20">
                <span className="text-3xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-white/80 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Работаем по договору</h3>
              <p className="text-white/80">
                Оплата только за результат. Если не выиграем — вы ничего не платите
              </p>
            </div>
            <div className="flex gap-3">
              <a href="#form">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 h-14 px-8">
                  Начать работу
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
