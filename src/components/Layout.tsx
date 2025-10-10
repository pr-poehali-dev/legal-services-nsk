import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navigation = [
    { name: "Главная", href: "/", icon: "Home" },
    { name: "Услуги", href: "/services", icon: "FileText" },
    { name: "О нас", href: "/about", icon: "Users" },
    { name: "Контакты", href: "/contact", icon: "Phone" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
                <Icon name="Scale" size={24} />
              </div>
              <div>
                <div className="font-bold text-xl text-slate-900">LawFirm</div>
                <div className="text-xs text-slate-500">Юридические услуги</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon name={item.icon as any} size={16} />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+79994523500"
                className="text-sm text-slate-600 hover:text-blue-600"
              >
                +7 (999) 452-35-00
              </a>
              <Link to="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Консультация
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-white border-t">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t">
                <a
                  href="tel:+79994523500"
                  className="flex items-center gap-3 px-3 py-3 text-sm text-slate-600"
                >
                  <Icon name="Phone" size={18} />
                  +7 (999) 452-35-00
                </a>
                <Link to="/contact" className="block mt-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Получить консультацию
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
                  <Icon name="Scale" size={24} />
                </div>
                <div>
                  <div className="font-bold text-xl">LawFirm</div>
                  <div className="text-sm text-slate-400">
                    Юридические услуги
                  </div>
                </div>
              </div>
              <p className="text-slate-300 mb-4 max-w-md">
                Профессиональная команда юристов с опытом более 15 лет.
                Обеспечиваем надежную правовую защиту для бизнеса и частных лиц.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Icon name="Mail" size={20} />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Icon name="Phone" size={20} />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Icon name="MapPin" size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Быстрые ссылки</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Корпоративное право
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Договорное право
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Арбитражные споры
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Трудовое право
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Недвижимость
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-slate-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-slate-400 text-sm">
                © 2024 LawFirm. Все права защищены.
              </div>
              <div className="flex gap-6 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors">
                  Политика конфиденциальности
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Условия использования
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}