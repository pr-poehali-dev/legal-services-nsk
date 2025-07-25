import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModal();

  const menuItems = [
    { name: "Главная", href: "#home" },
    { name: "Услуги", href: "#services" },
    { name: "Практика", href: "#practice" },
    { name: "Кейсы", href: "#cases" },
    { name: "Блог", href: "#blog" },
    { name: "Контакты", href: "#contacts" },
  ];

  return (
    <header className="fixed top-0 w-full frosted-glass border-b border-glass-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 frosted-glass rounded-xl flex items-center justify-center shadow-glass">
              <Icon name="Scale" className="h-6 w-6 text-accent" />
            </div>
            <span className="text-xl font-bold gradient-text">
              ЮрСервис НСК
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              className="frosted-glass hover:shadow-glass text-foreground hover:text-accent transition-all duration-500 hover:scale-105"
              onClick={openModal}
            >
              <Icon name="Phone" className="h-4 w-4 mr-2" />
              Консультация
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                className="mt-4 w-full frosted-glass hover:shadow-glass text-foreground hover:text-accent transition-all duration-500"
                onClick={openModal}
              >
                <Icon name="Phone" className="h-4 w-4 mr-2" />
                Консультация
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;