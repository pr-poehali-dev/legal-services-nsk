import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";

const GuaranteesSection = () => {
  const { openModal } = useModal();

  const guarantees = [
    {
      icon: "Shield",
      title: "Не выиграли — не платите",
      description: "Гонорар только за результат. Проиграли дело — возвращаем 100% оплаты",
      badge: "Гарантия возврата"
    },
    {
      icon: "Infinity",
      title: "Работаем до победы",
      description: "Все инстанции, апелляции, кассации — ведём дело до положительного решения",
      badge: "Без доплат"
    },
    {
      icon: "Clock",
      title: "Консультация за 15 минут",
      description: "Не через неделю, а прямо сейчас. Звоните — ответим на все вопросы бесплатно",
      badge: "Сегодня"
    },
    {
      icon: "Lock",
      title: "100% конфиденциальность",
      description: "Адвокатская тайна — ваши данные защищены законом. Никто не узнает о вашем деле",
      badge: "По закону"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Почему нам доверяют деньги и судьбы
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Железные гарантии — работаем с полной ответственностью
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {guarantees.map((item, index) => (
            <div
              key={index}
              className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:border-blue-400 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={28} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full whitespace-nowrap ml-2">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 max-w-4xl mx-auto text-white">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Icon name="Award" size={32} />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Узнайте ваши шансы на победу бесплатно
            </h3>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Позвоните или оставьте заявку — проконсультируем, оценим перспективы, скажем реальную стоимость
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10"
                onClick={openModal}
              >
                <Icon name="MessageCircle" size={24} className="mr-2" />
                Бесплатная консультация
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-10"
                onClick={() => window.open('tel:+79994523500', '_self')}
              >
                <Icon name="Phone" size={24} className="mr-2" />
                +7 999 452 35 00
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-blue-100">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={20} />
                <span>Ответ за 15 минут</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={20} />
                <span>Без выезда в офис</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={20} />
                <span>Работаем 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteesSection;
