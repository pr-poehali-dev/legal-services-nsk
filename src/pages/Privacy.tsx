import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
              Назад на главную
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Политика конфиденциальности
            </h1>
            <p className="text-muted-foreground">
              Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
              <p className="mb-4">
                Настоящая Политика конфиденциальности определяет порядок обработки
                персональных данных и меры по обеспечению безопасности персональных
                данных, предпринимаемые ЮрСервис НСК (далее – «Компания»).
              </p>
              <p>
                Компания обязуется соблюдать конфиденциальность персональных данных
                и обеспечивать безопасность персональных данных при их обработке.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Сбор персональных данных</h2>
              <p className="mb-4">
                Компания собирает следующие персональные данные:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Фамилия, имя, отчество</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты</li>
                <li>Информация о юридических вопросах</li>
              </ul>
              <p>
                Персональные данные собираются только с согласия субъекта персональных
                данных и используются исключительно для предоставления юридических услуг.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Цели обработки персональных данных</h2>
              <p className="mb-4">
                Персональные данные обрабатываются в следующих целях:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Предоставление юридических консультаций</li>
                <li>Заключение и исполнение договоров на оказание услуг</li>
                <li>Связь с клиентами по вопросам оказания услуг</li>
                <li>Информирование о новых услугах и предложениях</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Сроки обработки персональных данных</h2>
              <p>
                Персональные данные обрабатываются в течение срока, необходимого для
                достижения целей обработки, но не более срока, установленного
                действующим законодательством.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Права субъекта персональных данных</h2>
              <p className="mb-4">
                Субъект персональных данных имеет право:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Получать информацию о составе и содержании своих персональных данных</li>
                <li>Требовать уточнения своих персональных данных</li>
                <li>Требовать удаления своих персональных данных</li>
                <li>Отзывать согласие на обработку персональных данных</li>
                <li>Обжаловать действия или бездействие Компании</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Меры безопасности</h2>
              <p>
                Компания принимает необходимые и достаточные правовые, организационные
                и технические меры для защиты персональных данных от неправомерного
                или случайного доступа к ним, уничтожения, изменения, блокирования,
                копирования, предоставления, распространения персональных данных.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Контактная информация</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2">
                  <strong>ЮрСервис НСК</strong>
                </p>
                <p className="mb-2">
                  Телефон: <a href="tel:+79994523500" className="text-primary hover:underline">+7 (999) 452-35-00</a>
                </p>
                <p className="mb-2">
                  Email: <a href="mailto:info@jurservice-nsk.ru" className="text-primary hover:underline">info@jurservice-nsk.ru</a>
                </p>
                <p>
                  Адрес: г. Новосибирск, ул. Ленина, 1
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Изменения в политике конфиденциальности</h2>
              <p>
                Компания оставляет за собой право вносить изменения в настоящую
                Политику конфиденциальности. При внесении изменений в актуальной
                редакции указывается дата последнего обновления.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;