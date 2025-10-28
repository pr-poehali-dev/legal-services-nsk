import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";

const UrgencySection = () => {
  const { openModal } = useModal();

  const consequences = [
    {
      icon: "TrendingDown",
      title: "Теряете деньги каждый день",
      description: "Неустойка по ОСАГО — 1% в день. За месяц промедления это +30% к сумме, которую не получите",
      loss: "до 150 000₽"
    },
    {
      icon: "Clock",
      title: "Истекают сроки обжалования",
      description: "10 дней на штрафы ГИБДД, 30 дней на увольнение. Пропустите — восстановить права невозможно",
      loss: "навсегда"
    },
    {
      icon: "AlertTriangle",
      title: "Доказательства исчезают",
      description: "Свидетели забывают, записи с камер стираются, документы теряются. Чем дольше ждёте — тем слабее позиция",
      loss: "проигрыш дела"
    },
    {
      icon: "XCircle",
      title: "Оппонент укрепляет позицию",
      description: "Страховая готовит отказ, работодатель — оправдания, должник — прячет имущество",
      loss: "0₽ выплат"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-red-900 to-red-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Icon name="AlertCircle" size={48} className="text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Что вы теряете, откладывая решение?
          </h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Каждый день бездействия играет против вас
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-5xl mx-auto">
          {consequences.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-red-100 mb-3 leading-relaxed">{item.description}</p>
                  <div className="inline-flex items-center px-3 py-1 bg-red-800/60 rounded-full text-sm font-bold">
                    Потеря: {item.loss}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Действуйте прямо сейчас — пока не поздно
          </h3>
          <p className="text-gray-600 mb-6">
            Бесплатная консультация — узнайте свои шансы и что нужно делать срочно
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-10 py-6"
            onClick={openModal}
          >
            <Icon name="MessageCircle" size={24} className="mr-2" />
            Получить срочную консультацию
          </Button>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={18} className="text-green-600" />
              <span>Ответ за 15 минут</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={18} className="text-green-600" />
              <span>100% конфиденциально</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;
