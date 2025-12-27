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

          </div>
        </div>

        {/* About Company Section */}
        <div className="mt-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-12">
            ЮрСервисНСК
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left side - Text content */}
            <div className="lg:w-1/2 space-y-6">
              <p className="text-lg text-muted-foreground">
                Компания, объединяющая в себе:
              </p>
              
              <div className="bg-gradient-to-r from-primary/10 via-blue-50 to-primary/5 rounded-xl p-6 border-l-4 border-primary space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Общественная деятельность</h3>
                  <p className="text-sm text-muted-foreground">
                    При поддержке <strong>Народной Дружины</strong> в лице ФЗ о дружинах, зарегистрированной в МВД и подчиняющейся Администрации г. Новосибирска
                  </p>
                </div>
                
                <div className="h-px bg-border"></div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">ООО "Правоотношение"</h3>
                  <p className="text-sm text-muted-foreground">
                    Юридическая компания, работающая с 2016 года в области права и оказывающая профессиональные юридические услуги
                  </p>
                </div>
              </div>

              <p className="text-base text-muted-foreground">
                Такое объединение позволяет нам сочетать общественную защиту прав граждан с профессиональной юридической поддержкой на самом высоком уровне.
              </p>
            </div>

            {/* Right side - Logos with orbit animation */}
            <div className="lg:w-1/2 flex items-center justify-center">
              <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                
                <div className="absolute w-32 h-32 animate-orbit">
                  <img
                    src="https://cdn.poehali.dev/files/ЛоготипНД54 ( без фона ) .jpe g.png"
                    alt="Народная Дружина Октябрьская"
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                </div>

                <div className="absolute w-32 h-32 animate-orbit" style={{ animationDelay: '-5s' }}>
                  <img
                    src="https://cdn.poehali.dev/files/Unkwn.png"
                    alt="ЮрСервисНСК"
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                </div>

                <div className="flex flex-col items-center justify-center z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <img
                    src="https://cdn.poehali.dev/files/Unkwn.png"
                    alt="ЮрСервисНСК"
                    className="w-24 h-24 object-contain mb-3"
                  />
                  <h3 className="text-2xl font-bold text-foreground">ЮрСервисНСК</h3>
                  <p className="text-sm text-muted-foreground mt-2">Юридическая защита</p>
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