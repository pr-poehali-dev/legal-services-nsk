import Icon from '@/components/ui/icon';

export default function FooterSection() {
  return (
    <section className="py-12 px-4 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Icon name="Shield" className="mx-auto mb-3 text-white/80" size={32} />
            <h4 className="font-bold mb-2">Конфиденциальность</h4>
            <p className="text-sm text-white/70">Все данные защищены. Не передаём третьим лицам</p>
          </div>
          <div>
            <Icon name="Award" className="mx-auto mb-3 text-white/80" size={32} />
            <h4 className="font-bold mb-2">Опыт 12+ лет</h4>
            <p className="text-sm text-white/70">Специализируемся только на автомобильных спорах</p>
          </div>
          <div>
            <Icon name="Users" className="mx-auto mb-3 text-white/80" size={32} />
            <h4 className="font-bold mb-2">450+ довольных клиентов</h4>
            <p className="text-sm text-white/70">Вернули более 180 млн рублей</p>
          </div>
        </div>
      </div>
    </section>
  );
}
