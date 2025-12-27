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
      className="pt-20 pb-16 bg-background"
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
                Защищаю права и интересы граждан и предприятий. 
                Индивидуальный подход к каждому клиенту и гарантия результата.
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
                asChild
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all"
              >
                <a 
                  href="tel:+79931903500"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.ym) {
                      window.ym(103525320, 'reachGoal', 'phone_click');
                    }
                  }}
                >
                  <Icon name="Phone" className="h-5 w-5 mr-2" />
                  +7 993 190 35 00
                </a>
              </Button>
            </div>

            {/* Mission */}
            <div className="pt-6 space-y-4">
              <div className="bg-gradient-to-r from-primary/10 via-blue-50 to-primary/5 rounded-xl p-6 border-l-4 border-primary">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Target" className="h-5 w-5 text-primary" />
                  Наша миссия
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Честность превыше всего.</strong> Мы не продаём юридические услуги — мы защищаем людей и их права.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Прозрачность на каждом этапе.</strong> Вы всегда знаете, что происходит с вашим делом и сколько это стоит.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Результат важнее процесса.</strong> Мы работаем до победы, а не до окончания оплаченных часов.
                    </p>
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