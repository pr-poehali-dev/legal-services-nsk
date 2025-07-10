import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { openModal } = useModal();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Главная", href: "#home" },
    { name: "Услуги", href: "#services" },
    { name: "Практика", href: "#practice" },
    { name: "Кейсы", href: "#cases" },
    { name: "Блог", href: "#blog" },
    { name: "Контакты", href: "#contacts" },
  ];

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
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
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  <Icon name="User" className="h-4 w-4 mr-2" />
                  {user.name}
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <Icon name="LogOut" className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <Icon name="User" className="h-4 w-4 mr-2" />
                  Вход
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={openModal}
                >
                  Консультация
                </Button>
              </div>
            )}
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
              {user ? (
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                  >
                    <Icon name="User" className="h-4 w-4 mr-2" />
                    Личный кабинет
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" className="h-4 w-4 mr-2" />
                    Выйти
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <Icon name="User" className="h-4 w-4 mr-2" />
                    Вход
                  </Button>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={openModal}
                  >
                    Консультация
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </header>
  );
};

export default Header;
