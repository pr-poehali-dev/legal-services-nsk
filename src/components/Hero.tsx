import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";
import { useState, useEffect } from "react";

const Hero = () => {
  const { openModal } = useModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <main
      id="home"
      className="pt-20 pb-16 bg-gradient-to-br from-background to-secondary/30"
      role="main"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                <Icon name="MapPin" className="h-4 w-4 mr-2" />
                Новосибирск
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Профессиональная юридическая помощь в Новосибирске
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Более 10 лет успешной практики. Защищаю права и интересы граждан
                и предприятий. Индивидуальный подход к каждому клиенту и
                гарантия результата.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={openModal}
              >
                <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const btn = document.getElementById('hero-phone-btn');
                  if (btn) {
                    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 inline"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> +7 993 190 35 00';
                    setTimeout(() => window.open('tel:+79931903500', '_self'), 100);
                  }
                }}
                id="hero-phone-btn"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
              >
                <Icon name="Phone" className="h-5 w-5 mr-2" />
                Показать телефон
              </Button>
            </div>

            {/* Срочность и гарантии */}
            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" className="h-5 w-5 text-accent" />
                <p className="font-semibold text-accent">СРОЧНЫЕ ДЕЛА — В ТЕЧЕНИЕ ЧАСА</p>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Icon name="Shield" className="h-5 w-5 text-accent" />
                <p className="text-sm text-muted-foreground">Гарантия возврата средств при неудовлетворительном результате</p>
              </div>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6 pt-6"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <div className="text-center p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                <div
                  className="text-2xl font-bold text-primary"
                  itemProp="numberOfEmployees"
                >
                  500+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Выигранных дел
                </div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                <div
                  className="text-2xl font-bold text-primary"
                  itemProp="foundingDate"
                >
                  10+
                </div>
                <div className="text-sm text-muted-foreground font-medium">лет опыта</div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground font-medium">
                  Довольных клиентов
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 hover:scale-105 transition-transform duration-500">
              <img
                src="/img/44535199-aa32-4b9a-9bbf-4b7dfb3075bf.jpg"
                alt="Профессиональный юрист в Новосибирске - консультация в офисе ЮрСервис НСК"
                className="w-full h-full object-cover brightness-75"
                loading="eager"
                width="600"
                height="750"
                itemProp="image"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white px-6">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2 drop-shadow-lg">
                    Ваша защита —
                  </h3>
                  <p className="text-xl lg:text-2xl font-semibold drop-shadow-lg">
                    моя профессия
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="Award" className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    Лицензированный адвокат
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Адвокатская палата НСО
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;