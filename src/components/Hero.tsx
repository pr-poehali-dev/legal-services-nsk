import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";

const Hero = () => {
  const { openModal } = useModal();
  return (
    <section
      id="home"
      className="relative pt-20 pb-16 overflow-hidden"
      role="banner"
    >
      {/* Background with glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-background to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(210,180,140,0.1)_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full frosted-glass shadow-glass text-accent text-sm font-medium">
                <Icon name="MapPin" className="h-4 w-4 mr-2" />
                Новосибирск
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent">
                  Профессиональная
                </span>{" "}
                <span className="text-foreground">
                  юридическая помощь в Новосибирске
                </span>
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
                className="bg-accent hover:bg-accent/90 text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                onClick={openModal}
              >
                <Icon name="Phone" className="h-5 w-5 mr-2" />
                Бесплатная консультация
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="glass-card border-2 border-accent/30 hover:border-accent hover:shadow-glass transition-all duration-500"
              >
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
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center group">
                <div className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-500">
                  500+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Выигранных дел
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-500">
                  10+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Лет опыта
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-500">
                  98%
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Довольных клиентов
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
              <img
                src="/img/44535199-aa32-4b9a-9bbf-4b7dfb3075bf.jpg"
                alt="Профессиональный юрист в Новосибирске - консультация в офисе ЮрСервис НСК"
                className="w-full h-full object-cover brightness-75"
                loading="eager"
                width="600"
                height="750"
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
            <div className="absolute -bottom-6 -left-6 frosted-glass rounded-xl p-4 shadow-glass hover:shadow-elegant transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center">
                  <Icon name="Award" className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-sm gradient-text">
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
    </section>
  );
};

export default Hero;