import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function CompensationSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-4">
          Что вы получите с нами
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Работаем по закону «О защите прав потребителей» — вы получите намного больше, чем заплатили
        </p>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-5xl font-bold text-primary mb-3">100%</div>
              <h3 className="font-semibold mb-2">Полный возврат</h3>
              <p className="text-sm text-muted-foreground">Вся стоимость автомобиля по ст. 18 ЗоЗПП</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-5xl font-bold text-primary mb-3">50%</div>
              <h3 className="font-semibold mb-2">Штраф</h3>
              <p className="text-sm text-muted-foreground">От суммы взыскания за отказ продавца</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-5xl font-bold text-primary mb-3">1%</div>
              <h3 className="font-semibold mb-2">Неустойка</h3>
              <p className="text-sm text-muted-foreground">За каждый день просрочки по ст. 23</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-5xl font-bold text-primary mb-3">+50К</div>
              <h3 className="font-semibold mb-2">Моральный вред</h3>
              <p className="text-sm text-muted-foreground">Компенсация стресса и неудобств</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Icon name="TrendingUp" className="text-blue-600" size={32} />
              Реальный пример из практики
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-lg">Ситуация клиента:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Купил Volkswagen Tiguan за 1 850 000 ₽</li>
                  <li>• Через 2 месяца обнаружил скрученный пробег (было 180 тыс. вместо 45 тыс.)</li>
                  <li>• Продавец отказался возвращать деньги</li>
                  <li>• Прошло 90 дней с момента претензии</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">Что взыскали через суд:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Возврат стоимости авто:</span>
                    <span className="font-bold">1 850 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Неустойка (90 дней × 1%):</span>
                    <span className="font-bold">1 665 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Штраф 50%:</span>
                    <span className="font-bold">1 757 500 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Моральный вред:</span>
                    <span className="font-bold">50 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Юридические расходы:</span>
                    <span className="font-bold">45 000 ₽</span>
                  </div>
                  <div className="border-t-2 border-blue-300 pt-3 mt-3">
                    <div className="flex justify-between items-center text-xl">
                      <span className="font-bold">ИТОГО взыскано:</span>
                      <span className="font-bold text-blue-600">5 367 500 ₽</span>
                    </div>
                    <p className="text-right text-sm text-blue-600 font-semibold mt-1">
                      В 2,9 раза больше стоимости авто!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
