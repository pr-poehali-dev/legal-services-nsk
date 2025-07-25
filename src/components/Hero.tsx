import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";

const Hero = () => {
  const { openModal } = useModal();
  return (
    <section
      id="home"
      className="section-padding relative overflow-hidden"
      role="banner"
    >
      <div className="container mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full glass text-primary text-sm font-medium fade-in">
                <Icon name="MapPin" className="h-4 w-4 mr-2 icon-bounce" />
                Новосибирск
              </div>
              <h1 className="text-gradient text-shadow-lg slide-up leading-tight">
                Профессиональная юридическая помощь в Новосибирске
              </h1>
              <p className="text-xl text-foreground/80 leading-relaxed max-w-2xl fade-in">
                Более 2 лет успешной практики. Защищаю права и интересы граждан и предприятий. 
                Индивидуальный подход к каждому клиенту и гарантия результата.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 scale-in">
              <Button
                size="lg"
                className="btn-primary"
                onClick={openModal}
              >
                <Icon name="Phone" className="h-5 w-5 mr-2" />
                Бесплатная консультация
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="glass-button border-white/30 hover:bg-white/10"
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
            <div className="grid grid-cols-3 gap-8 pt-12 fade-in">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">500+</div>
                <div className="text-sm text-foreground/70 font-medium">
                  Выигранных дел
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">10+</div>
                <div className="text-sm text-foreground/70 font-medium">Лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">98%</div>
                <div className="text-sm text-foreground/70 font-medium">
                  Довольных клиентов
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative float">
            <div className="aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl">
              <img
                src="/img/44535199-aa32-4b9a-9bbf-4b7dfb3075bf.jpg"
                alt="Профессиональный юрист в Новосибирске - консультация в офисе ЮрСервис НСК"
                className="w-full h-full object-cover"
                loading="eager"
                width="600"
                height="750"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="text-center text-white px-6">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-shadow-lg">
                    Ваша защита —
                  </h3>
                  <p className="text-xl lg:text-2xl font-semibold text-shadow-lg">
                    моя профессия
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 card-enhanced scale-in">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="Award" className="h-6 w-6 text-primary icon-bounce" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    Лицензированный адвокат
                  </div>
                  <div className="text-xs text-foreground/60">
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