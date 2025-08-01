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
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                <Icon name="MapPin" className="h-4 w-4 mr-2" />
                Новосибирск
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Юрист по гражданским делам в Новосибирске
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">Опытный юрист с 15-летней практикой. Помогаю решать семейные, жилищные, трудовые и другие гражданские споры. Консультация от 2000₽. Бесплатный звонок!</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={openModal}
              >
                <Icon name="Phone" className="h-5 w-5 mr-2" />
                Бесплатная консультация
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="FileText" className="h-5 w-5 mr-2" />
                <a
                  href="#services"
                  className="w-full h-full flex items-center justify-center"
                >
                  Наши услуги
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8" itemScope itemType="https://schema.org/Organization">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary" itemProp="numberOfEmployees">500+</div>
                <div className="text-sm text-muted-foreground">
                  Выигранных дел
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary" itemProp="foundingDate">15+</div>
                <div className="text-sm text-muted-foreground">лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">
                  Успешных дел
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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