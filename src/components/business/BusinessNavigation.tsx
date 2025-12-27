import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { CONTACTS } from "@/config/contacts";

const BusinessNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const businessNavItems = [
    { name: "Главная", path: "/business" },
    { name: "Услуги", path: "/business/services" },
    { name: "Кейсы", path: "/business/cases" },
    { name: "Тарифы", path: "/business/pricing" },
    { name: "Контакты", path: "/business/contacts" }
  ];

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(103525320, 'reachGoal', 'phone_click');
    }
    window.location.href = `tel:${CONTACTS.phone.replace(/[^\d+]/g, '')}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-3"
          : "bg-slate-900/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/business" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isScrolled ? "bg-blue-600" : "bg-blue-500"
            }`}>
              <Icon name="Scale" className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className={`font-bold text-lg transition-colors ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}>
                Юрист для бизнеса
              </div>
              <div className={`text-xs transition-colors ${
                isScrolled ? "text-slate-600" : "text-blue-200"
              }`}>
                Калуга
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {businessNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors relative group ${
                  location.pathname === item.path
                    ? isScrolled
                      ? "text-blue-600"
                      : "text-white"
                    : isScrolled
                    ? "text-slate-700 hover:text-blue-600"
                    : "text-blue-100 hover:text-white"
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full ${
                  location.pathname === item.path ? "w-full" : ""
                }`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant={isScrolled ? "outline" : "ghost"}
              size="sm"
              onClick={handlePhoneClick}
              className={
                isScrolled
                  ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                  : "text-white hover:bg-white/10 border border-white/30"
              }
            >
              <Icon name="Phone" size={18} className="mr-2" />
              {CONTACTS.phone}
            </Button>
            
            <Button
              variant={isScrolled ? "ghost" : "outline"}
              size="sm"
              asChild
              className={
                isScrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10 border border-white/30"
              }
            >
              <Link to="/">
                <Icon name="Users" size={18} className="mr-2" />
                Для граждан
              </Link>
            </Button>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon
              name={isMobileMenuOpen ? "X" : "Menu"}
              className={isScrolled ? "text-slate-900" : "text-white"}
              size={24}
            />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={`lg:hidden mt-4 pb-4 space-y-3 ${
            isScrolled ? "border-t border-slate-200 pt-4" : "border-t border-white/20 pt-4"
          }`}>
            {businessNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? isScrolled
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "bg-white/10 text-white font-semibold"
                    : isScrolled
                    ? "text-slate-700 hover:bg-slate-50"
                    : "text-blue-100 hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Button
                onClick={handlePhoneClick}
                className={isScrolled ? "bg-blue-600 hover:bg-blue-700" : "bg-white text-slate-900 hover:bg-blue-50"}
              >
                <Icon name="Phone" size={18} className="mr-2" />
                {CONTACTS.phone}
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/">
                  <Icon name="Users" size={18} className="mr-2" />
                  Для граждан
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BusinessNavigation;