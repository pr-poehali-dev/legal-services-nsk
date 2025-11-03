import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { CONTACTS } from '@/config/contacts';

export default function HeroSection() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full font-semibold">
              <Icon name="ShieldCheck" className="inline mr-2" size={20} />
              Защита автопокупателей
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Вернём деньги за проблемный автомобиль
            </h1>
            <p className="text-xl mb-6 text-white/90">
              Купили машину с дефектами? Обманули при покупке? 
              <span className="block font-bold mt-2">Взыщем полную стоимость + компенсацию до 300%</span>
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-sm text-white/80">Выигранных дел</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-3xl font-bold mb-1">450+</div>
                <div className="text-sm text-white/80">Возвращено авто</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-3xl font-bold mb-1">24 часа</div>
                <div className="text-sm text-white/80">До консультации</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <a href="#form">
                  <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100 text-lg h-14 px-8">
                    <Icon name="FileText" className="mr-2" size={20} />
                    Оставить заявку
                  </Button>
                </a>
                <a 
                  href={`tel:${CONTACTS.phone}`}
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.ym) {
                      window.ym(103525320, 'reachGoal', 'phone_click');
                    }
                  }}
                >
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg h-14 px-8">
                    <Icon name="Phone" className="mr-2" size={20} />
                    {CONTACTS.phoneFormatted}
                  </Button>
                </a>
                <a 
                  href={`https://wa.me/${CONTACTS.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.ym) {
                      window.ym(103525320, 'reachGoal', 'whatsapp_click');
                    }
                  }}
                >
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg h-14 px-8">
                    <Icon name="MessageCircle" className="mr-2" size={20} />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Icon name="AlertCircle" className="text-red-600" size={28} />
                  Узнайте за 5 минут
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Можно ли вернуть ваш автомобиль</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Сколько денег получите сверх стоимости</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Какие документы нужны</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Сроки возврата денег</span>
                  </div>
                </div>
                <a href="#form" className="block mt-6">
                  <Button className="w-full h-12 text-lg bg-red-600 hover:bg-red-700">
                    Получить консультацию
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