import Icon from "@/components/ui/icon";
import { CONTACTS } from "@/config/contacts";

const BusinessFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Scale" size={24} className="text-blue-400" />
              Юрист для бизнеса
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Профессиональная юридическая защита интересов вашего бизнеса в Калуге и области
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Услуги</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-white transition-colors cursor-pointer">Арбитражные споры</li>
              <li className="hover:text-white transition-colors cursor-pointer">Договорное право</li>
              <li className="hover:text-white transition-colors cursor-pointer">Банкротство</li>
              <li className="hover:text-white transition-colors cursor-pointer">Налоговые споры</li>
              <li className="hover:text-white transition-colors cursor-pointer">Корпоративное право</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <Icon name="Phone" size={16} />
                <a href={`tel:${CONTACTS.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">
                  {CONTACTS.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Icon name="Mail" size={16} />
                <a href={`mailto:${CONTACTS.email}`} className="hover:text-white transition-colors">
                  {CONTACTS.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Icon name="MapPin" size={16} />
                <span>г. Калуга, ул. Кирова, 1</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Режим работы</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex justify-between">
                <span>Пн-Пт:</span>
                <span className="text-white">9:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Сб-Вс:</span>
                <span className="text-white">10:00 - 18:00</span>
              </li>
              <li className="flex items-center gap-2 mt-4">
                <Icon name="Clock" size={16} className="text-green-400" />
                <span className="text-green-400 font-semibold">Консультации 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              © {currentYear} Юридические услуги для бизнеса. Все права защищены.
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="/" className="hover:text-white transition-colors flex items-center gap-2">
                <Icon name="Users" size={16} />
                Для граждан
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BusinessFooter;