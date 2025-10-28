import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";

const ProblemsSection = () => {
  const { openModal } = useModal();

  const problems = [
    {
      icon: "AlertCircle",
      title: "Страховая занизила выплату?",
      description: "Вместо 500 000₽ предлагают 80 000₽. Каждый день промедления — упущенные деньги",
      color: "bg-red-50 border-red-200 hover:border-red-400",
      iconColor: "text-red-600"
    },
    {
      icon: "XCircle",
      title: "Несправедливо уволили?",
      description: "Без выплат и компенсаций. Срок обжалования — всего 30 дней, потом поздно",
      color: "bg-orange-50 border-orange-200 hover:border-orange-400",
      iconColor: "text-orange-600"
    },
    {
      icon: "Home",
      title: "Хотят отнять квартиру?",
      description: "Мошенники оформили на себя. Действовать нужно срочно — пока не продали третьим лицам",
      color: "bg-purple-50 border-purple-200 hover:border-purple-400",
      iconColor: "text-purple-600"
    },
    {
      icon: "Car",
      title: "Лишают прав за алкоголь?",
      description: "1.5-2 года без прав и 30 000₽ штраф. Можем обжаловать, но срок — 10 дней",
      color: "bg-blue-50 border-blue-200 hover:border-blue-400",
      iconColor: "text-blue-600"
    },
    {
      icon: "Users",
      title: "Бывший супруг отнимает детей?",
      description: "Угрожает забрать, не даёт видеться. Срочно нужна защита прав в суде",
      color: "bg-pink-50 border-pink-200 hover:border-pink-400",
      iconColor: "text-pink-600"
    },
    {
      icon: "DollarSign",
      title: "Не отдают деньги по договору?",
      description: "Долг растёт, должник скрывается. Срок исковой давности — 3 года, не упустите",
      color: "bg-green-50 border-green-200 hover:border-green-400",
      iconColor: "text-green-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Узнайте свои шансы на победу
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Каждая из этих проблем решаема — если действовать сейчас
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`${problem.color} border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className={`w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 ${problem.iconColor}`}>
                <Icon name={problem.icon} size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-10 py-6 shadow-2xl animate-pulse"
            onClick={openModal}
          >
            <Icon name="Phone" size={24} className="mr-2" />
            Узнать, как решить мою проблему бесплатно
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Консультация 15 минут • Без оплаты • Конфиденциально
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
