import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";

interface Service {
  icon: string;
  title: string;
  description: string;
  price: string;
  details?: string;
  features?: string[];
  process?: string[];
}

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  const { consultationModal } = useModal();

  if (!service) return null;

  const serviceDetails = {
    "Корпоративное право": {
      details:
        "Полное юридическое сопровождение бизнеса от регистрации до реорганизации. Помогаем решать корпоративные споры и защищать интересы участников.",
      features: [
        "Регистрация и ликвидация юридических лиц",
        "Подготовка и анализ договоров",
        "Корпоративные споры между участниками",
        "Защита прав акционеров и участников",
        "Сопровождение сделок M&A",
      ],
      process: [
        "Консультация и анализ ситуации",
        "Разработка правовой стратегии",
        "Подготовка документов",
        "Сопровождение процесса",
      ],
    },
    "Семейное право": {
      details:
        "Деликатное решение семейных споров с учетом интересов всех сторон. Обеспечиваем защиту прав детей и справедливый раздел имущества.",
      features: [
        "Расторжение брака в суде и ЗАГСе",
        "Раздел совместно нажитого имущества",
        "Взыскание и изменение размера алиментов",
        "Определение места жительства детей",
        "Установление отцовства",
      ],
      process: [
        "Первичная консультация",
        "Сбор необходимых документов",
        "Подача документов в суд",
        "Представительство в суде",
      ],
    },
    Недвижимость: {
      details:
        "Безопасные сделки с недвижимостью и защита от мошенничества. Сопровождаем покупку, продажу и разрешаем споры с застройщиками.",
      features: [
        "Проверка юридической чистоты объекта",
        "Сопровождение сделок купли-продажи",
        "Споры с застройщиками по ДДУ",
        "Оформление наследства на недвижимость",
        "Выселение и вселение",
      ],
      process: [
        "Юридическая экспертиза объекта",
        "Подготовка договоров",
        "Регистрация сделки",
        "Сопровождение до получения документов",
      ],
    },
  };

  const currentDetails = serviceDetails[
    service.title as keyof typeof serviceDetails
  ] || {
    details: service.description,
    features: [
      "Консультация специалиста",
      "Подготовка документов",
      "Представительство интересов",
    ],
    process: ["Анализ ситуации", "Разработка стратегии", "Реализация решения"],
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name={service.icon} className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl">{service.title}</DialogTitle>
              <p className="text-xl font-semibold text-primary">
                {service.price}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Описание услуги</h3>
            <p className="text-muted-foreground leading-relaxed">
              {currentDetails.details}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Что входит в услугу</h3>
            <ul className="space-y-2">
              {currentDetails.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon
                    name="CheckCircle"
                    className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                  />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Этапы работы</h3>
            <div className="space-y-3">
              {currentDetails.process.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                consultationModal.open();
                onClose();
              }}
            >
              <Icon name="Calendar" className="h-5 w-5 mr-2" />
              Записаться на консультацию
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
