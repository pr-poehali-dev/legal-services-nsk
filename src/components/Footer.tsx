import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-secondary/10 border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center space-x-2">
              <Icon name="Scale" className="h-9 w-9 text-primary" />
              <span className="text-2xl font-bold text-foreground">
                ЮрСервис НСК
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Профессиональные юридические услуги в Новосибирске. Защищаем ваши
              права и интересы с 2024 года.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Услуги</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Корпоративное право
                </a>
              </li>
              <li>
                <a href="/#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Семейное право
                </a>
              </li>
              <li>
                <a href="/#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Недвижимость
                </a>
              </li>
              <li>
                <a href="/#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Трудовое право
                </a>
              </li>
              <li>
                <a href="/#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Уголовная защита
                </a>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Практика</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/#practice" className="text-muted-foreground hover:text-primary transition-colors">
                  Арбитражные споры
                </a>
              </li>
              <li>
                <a href="/#practice" className="text-muted-foreground hover:text-primary transition-colors">
                  Гражданские дела
                </a>
              </li>
              <li>
                <a href="/#practice" className="text-muted-foreground hover:text-primary transition-colors">
                  Административное право
                </a>
              </li>
              <li>
                <a href="/#practice" className="text-muted-foreground hover:text-primary transition-colors">
                  Банкротство
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Контакты</h3>
            <div className="space-y-3 text-sm">
              <button 
                onClick={(e) => {
                  const hidden = e.currentTarget.querySelector('.phone-hidden');
                  if (hidden) {
                    (hidden as HTMLElement).style.filter = 'blur(0px)';
                    (hidden as HTMLElement).style.opacity = '1';
                    hidden.textContent = '35 00';
                    setTimeout(() => window.open('tel:+79994523500', '_self'), 300);
                  }
                }}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Icon name="Phone" className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>+7 999 452 <span className="phone-hidden" style={{filter: 'blur(5px)', opacity: 0.6, transition: 'all 0.3s ease'}}>XX XX</span></span>
              </button>
              <a href="mailto:vituarten@icloud.com" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group">
                <Icon name="Mail" className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>vituarten@icloud.com</span>
              </a>
              <div className="flex items-start space-x-2 text-muted-foreground">
                <Icon name="MapPin" className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  г. Новосибирск, ул. Ленина, д. 3, офис 323
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="mt-16 mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* Нижняя часть - реквизиты и мета */}
        <div className="space-y-8">
          {/* Реквизиты */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground/90">
                © 2024 ЮрСервис НСК. Все права защищены.
              </p>
              <div className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                <p className="font-medium text-foreground/70">ИП Витушкин Артем Вячеславович</p>
                <p>ИНН: 421210273345</p>
                <p>ОГРНИП: 323547600197695</p>
              </div>
            </div>

            <div className="flex justify-start md:justify-end">
              <a
                href="https://webmaster.yandex.ru/siteinfo/?site=https://юридический-сервис.рф"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
                title="Яндекс.Метрика"
              >
                <img
                  width="88"
                  height="31"
                  alt="Яндекс.Метрика"
                  src="https://yandex.ru/cycounter?https://юридический-сервис.рф&theme=light&lang=ru"
                  className="rounded"
                />
              </a>
            </div>
          </div>

          {/* Ссылки и ID */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-muted-foreground">
              <a href="/privacy" className="hover:text-primary transition-colors hover:underline">
                Политика конфиденциальности
              </a>
              <a href="/privacy#terms" className="hover:text-primary transition-colors hover:underline">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;