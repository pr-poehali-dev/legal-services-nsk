import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function CarCheckSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl">
              <Icon name="ShieldCheck" className="text-white" size={80} />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">
              Сопровождение при покупке автомобиля
            </h2>
            <p className="text-xl mb-6 text-white/90">
              Не дайте себя обмануть! Проверим юридическую чистоту сделки ДО покупки
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" className="mt-1 flex-shrink-0" size={20} />
                <span>Проверка ДКП и документов продавца</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" className="mt-1 flex-shrink-0" size={20} />
                <span>Проверка на залог, арест, ограничения</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" className="mt-1 flex-shrink-0" size={20} />
                <span>Анализ истории авто по базам</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" className="mt-1 flex-shrink-0" size={20} />
                <span>Юридическое сопровождение сделки</span>
              </div>
            </div>
          </div>
          <div>
            <Card className="bg-white text-gray-900">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">5 000 ₽</div>
                <p className="text-sm text-muted-foreground mb-4">Полная проверка + сопровождение</p>
                <a href="https://wa.me/79994523500?text=Хочу%20проверку%20авто%20перед%20покупкой" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Заказать проверку
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
