import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export default function ConsumerCalculator() {
  const [price, setPrice] = useState<string>('');
  const [days, setDays] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const priceNum = parseFloat(price) || 0;
    const daysNum = parseInt(days) || 0;

    const refund = priceNum;
    const penalty = (priceNum * 0.01 * daysNum);
    const fine = (refund + penalty) * 0.5;
    const moralDamage = Math.min(priceNum * 0.2, 50000);
    const legalCosts = 15000;

    const total = refund + penalty + fine + moralDamage + legalCosts;
    setResult(total);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(num));
  };

  const priceNum = parseFloat(price) || 0;
  const daysNum = parseInt(days) || 0;
  const refund = priceNum;
  const penalty = (priceNum * 0.01 * daysNum);
  const fine = (refund + penalty) * 0.5;
  const moralDamage = Math.min(priceNum * 0.2, 50000);
  const legalCosts = 15000;

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Icon name="Calculator" className="inline mr-2 text-primary" size={20} />
            <span className="font-semibold text-primary">Калькулятор компенсаций</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Рассчитайте свою компенсацию
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Узнайте примерную сумму взыскания по вашему делу с учётом всех законных компенсаций
          </p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Введите данные</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="price" className="text-base font-semibold mb-2 block">
                      Стоимость товара/услуги (₽)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="50000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="text-lg h-12"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Укажите цену, которую вы заплатили
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="days" className="text-base font-semibold mb-2 block">
                      Дней с момента обращения
                    </Label>
                    <Input
                      id="days"
                      type="number"
                      placeholder="60"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      className="text-lg h-12"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Сколько дней прошло с претензии
                    </p>
                  </div>

                  <Button
                    onClick={calculate}
                    className="w-full h-12 text-lg"
                    disabled={!price || !days}
                  >
                    <Icon name="Calculator" className="mr-2" size={20} />
                    Рассчитать компенсацию
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">Расчёт по закону</h3>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Возврат стоимости (ст. 18)</span>
                        <span className="font-semibold">{formatNumber(refund)} ₽</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Неустойка 1% в день (ст. 23)</span>
                        <span className="font-semibold">{formatNumber(penalty)} ₽</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Штраф 50% (п. 6 ст. 13)</span>
                        <span className="font-semibold">{formatNumber(fine)} ₽</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Моральный вред (ст. 15)</span>
                        <span className="font-semibold">{formatNumber(moralDamage)} ₽</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Судебные расходы</span>
                        <span className="font-semibold">{formatNumber(legalCosts)} ₽</span>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg">
                      <div className="text-sm opacity-90 mb-2">Итого вы можете взыскать</div>
                      <div className="text-4xl font-bold mb-2">
                        {formatNumber(result)} ₽
                      </div>
                      <div className="text-sm opacity-90">
                        В {Math.round(result / priceNum * 10) / 10}× больше стоимости товара
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        <Icon name="Info" className="inline mr-1" size={16} />
                        <strong>Важно:</strong> Это примерный расчёт. Точную сумму определит суд с учётом всех обстоятельств дела.
                      </p>
                    </div>

                    <a
                      href="https://wa.me/79994523500"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full h-12 bg-green-600 hover:bg-green-700">
                        <Icon name="MessageCircle" className="mr-2" size={20} />
                        Обсудить моё дело
                      </Button>
                    </a>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                    <div>
                      <Icon name="Calculator" className="mx-auto mb-4 opacity-20" size={64} />
                      <p>Введите данные и нажмите<br />"Рассчитать компенсацию"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Scale" className="text-primary" size={20} />
                Как формируется сумма взыскания
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="mb-2">
                    <strong className="text-foreground">Возврат стоимости:</strong> Полная цена товара или услуги (ст. 18, 29 ЗоЗПП)
                  </p>
                  <p className="mb-2">
                    <strong className="text-foreground">Неустойка:</strong> 1% от цены за каждый день просрочки (ст. 23, 28 ЗоЗПП)
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong className="text-foreground">Штраф:</strong> 50% от присуждённой суммы за отказ продавца (п. 6 ст. 13 ЗоЗПП)
                  </p>
                  <p>
                    <strong className="text-foreground">Моральный вред:</strong> Компенсация переживаний, определяет суд (ст. 15 ЗоЗПП)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
