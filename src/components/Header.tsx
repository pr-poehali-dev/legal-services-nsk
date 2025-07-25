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
    <header className="fixed top-0 w-full glass-header z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Icon name="Scale" className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
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
              className="bg-primary hover:bg-primary/90"
              onClick={openModal}
            >
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
                className="mt-4 w-full bg-primary hover:bg-primary/90"
                onClick={openModal}
              >
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