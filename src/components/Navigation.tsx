import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  onLoginClick?: () => void;
}

const Navigation = ({ onLoginClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useModal();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: "Главная", href: "/citizens" },
    { name: "Услуги", href: "/services" },
    { name: "Цены", href: "/pricing" },
    { name: "Блог", href: "/blog" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contacts" },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isCitizensVersion = !location.pathname.startsWith('/business');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleVersionSwitch = () => {
    setIsTransitioning(true);
    
    // Создаем анимацию fade out
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-out';
    
    setTimeout(() => {
      if (isCitizensVersion) {
        localStorage.setItem('audienceType', 'business');
        window.location.href = '/business';
      } else {
        localStorage.setItem('audienceType', 'citizens');
        window.location.href = '/citizens';
      }
    }, 300);
  };

  return (
    <header 
      className={`fixed top-0 w-full backdrop-blur-sm border-b border-border z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 shadow-lg' : 'bg-background/70'
      }`}
      role="banner"
      itemScope 
      itemType="https://schema.org/SiteNavigationElement"
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
              size="sm"
              onClick={handleVersionSwitch}
              disabled={isTransitioning}
              className={`border-2 transition-all duration-300 ${
                isTransitioning ? 'opacity-50 scale-95' : 'hover:scale-105'
              }`}
            >
              <Icon 
                name={isTransitioning ? "RefreshCw" : (isCitizensVersion ? "Building2" : "Users")} 
                className={`h-4 w-4 mr-2 ${isTransitioning ? 'animate-spin' : ''}`}
              />
              {isTransitioning ? "Переключение..." : (isCitizensVersion ? "Для бизнеса" : "Для граждан")}
            </Button>
            {isAuthenticated ? (
              <Link to={user?.role === 'client' ? '/client/cabinet' : '/lawyer'}>
                <Button variant="outline">
                  <Icon name="User" className="h-4 w-4 mr-2" />
                  {user?.name}
                </Button>
              </Link>
            ) : (
              <Link to="/client/login">
                <Button variant="outline">
                  <Icon name="LogIn" className="h-4 w-4 mr-2" />
                  Вход
                </Button>
              </Link>
            )}
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
          isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
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
                className={`w-full border-2 transition-all duration-300 ${
                  isTransitioning ? 'opacity-50' : ''
                }`}
                disabled={isTransitioning}
                onClick={() => {
                  handleVersionSwitch();
                  setIsMenuOpen(false);
                }}
              >
                <Icon 
                  name={isTransitioning ? "RefreshCw" : (isCitizensVersion ? "Building2" : "Users")} 
                  className={`h-4 w-4 mr-2 ${isTransitioning ? 'animate-spin' : ''}`}
                />
                {isTransitioning ? "Переключение..." : (isCitizensVersion ? "Для бизнеса" : "Для граждан")}
              </Button>
              {isAuthenticated ? (
                <Link 
                  to={user?.role === 'client' ? '/client/cabinet' : '/lawyer'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    <Icon name="User" className="h-4 w-4 mr-2" />
                    {user?.name}
                  </Button>
                </Link>
              ) : (
                <Link to="/client/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    <Icon name="LogIn" className="h-4 w-4 mr-2" />
                    Вход
                  </Button>
                </Link>
              )}
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