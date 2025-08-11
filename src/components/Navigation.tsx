import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";

interface NavigationProps {
  onLoginClick?: () => void;
}

const Navigation = ({ onLoginClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: "Главная", href: "/" },
    { name: "Услуги", href: "/services" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contacts" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header 
      className={`fixed top-0 w-full backdrop-blur-sm border-b border-border z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 shadow-lg' : 'bg-background/70'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Scale" className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              ЮрСервис НСК
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors duration-200 font-medium ${
                  isActive(item.href) 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              onClick={onLoginClick}
            >
              <Icon name="LogIn" className="h-4 w-4 mr-2" />
              Войти
            </Button>
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
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-2 py-1 transition-colors duration-200 ${
                    isActive(item.href) 
                      ? 'text-primary font-medium' 
                      : 'text-foreground hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="outline"
                className="mt-2 w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  onLoginClick?.();
                }}
              >
                <Icon name="LogIn" className="h-4 w-4 mr-2" />
                Войти
              </Button>
              <Button
                className="mt-2 w-full bg-primary hover:bg-primary/90"
                onClick={openModal}
              >
                Консультация
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;