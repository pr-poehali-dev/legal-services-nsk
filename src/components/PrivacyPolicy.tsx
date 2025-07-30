import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Политика обработки персональных данных</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 text-gray-700">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-primary">1. Общие положения</h3>
            <p>
              Настоящая Политика обработки персональных данных (далее — Политика) действует в отношении 
              всей информации, которую юридическая консультация может получить о пользователе во время 
              использования им сайта и сервисов компании.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-primary">2. Обрабатываемые персональные данные</h3>
            <p>Мы можем обрабатывать следующие персональные данные:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Фамилия, имя, отчество</li>
              <li>Номер телефона</li>
              <li>Адрес электронной почты</li>
              <li>Информация о юридической проблеме</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-primary">3. Цели обработки персональных данных</h3>
            <p>Персональные данные обрабатываются в следующих целях:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Предоставление юридических консультаций</li>
              <li>Связь с клиентом для уточнения деталей</li>
              <li>Информирование о статусе обращения</li>
              <li>Улучшение качества услуг</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-primary">4. Правовые основания</h3>
            <p>
              Обработка персональных данных осуществляется на основании согласия субъекта персональных 
              данных и в соответствии с требованиями Федерального закона от 27.07.2006 №152-ФЗ 
              «О персональных данных».
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-primary">5. Сроки обработки</h3>
            <p>
              Персональные данные обрабатываются в течение срока, необходимого для достижения 
              целей обработки, но не более 3 лет с момента последнего обращения, если иное не 
              предусмотрено законодательством.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-primary">6. Права субьекта персональных данных</h3>
            <p>Вы имеете право:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Требовать уточнения, блокирования или уничтожения данных</li>
              <li>Получать информацию о способах и целях обработки</li>
              <li>Обжаловать действия в Роскомнадзоре</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-primary">7. Безопасность данных</h3>
            <p>
              Мы принимаем необходимые технические и организационные меры для защиты персональных 
              данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования, 
              распространения, а также от иных неправомерных действий.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-primary">8. Контактная информация</h3>
            <p>
              По вопросам обработки персональных данных вы можете обратиться по телефону: 
              <strong>+7 (999) 452-35-00</strong>
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-600">
              Настоящая Политика может быть изменена в любое время без предварительного уведомления. 
              Актуальная версия размещается на сайте.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}