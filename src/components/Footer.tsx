import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Icon name="Scale" className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                ЮрСервис НСК
              </span>
            </div>
            <p className="text-muted-foreground">
              Профессиональные юридические услуги в Новосибирске. Защищаем ваши
              права и интересы с 2024 года.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Icon name="Phone" className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Icon name="Mail" className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Icon name="MessageCircle" className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Услуги</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Корпоративное право
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Семейное право
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Недвижимость
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Трудовое право
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Уголовная защита
                </a>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Практика</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Арбитражные споры
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Гражданские дела
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Административное право
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Банкротство
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Контакты</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" className="h-4 w-4" />
                <span>+7 (999) 452-35-00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Mail" className="h-4 w-4" />
                <span>vituarten@icloud.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" className="h-4 w-4 mt-0.5" />
                <span className="text-sm">
                  г. Новосибирск, ул. Ленина, д.3, офис 323
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="text-muted-foreground text-sm">
              © 2024 ЮрСервис НСК. Все права защищены.
            </div>
            <a
              href="https://webmaster.yandex.ru/siteinfo/?site=https://юридический-сервис.рф"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                width="88"
                height="31"
                alt="Яндекс.Метрика"
                border="0"
                src="https://yandex.ru/cycounter?https://юридический-сервис.рф&theme=light&lang=ru"
                className="rounded-lg"
              />
            </a>
          </div>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="privacy" className="hover:text-primary">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-primary">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
