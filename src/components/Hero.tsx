import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";

const Hero = () => {
  const { openModal } = useModal();

  return (
    <section className="relative bg-gradient-to-b from-background to-secondary/20 pt-20 pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Профессиональная{" "}
              <span className="text-primary">юридическая помощь</span> в
              Новосибирске
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Защищаем ваши права и интересы более 10 лет. Индивидуальный подход
              к каждому клиенту и гарантия результата.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8"
              onClick={openModal}
            >
              <Icon name="Calendar" className="h-5 w-5 mr-2" />
              Запись на консультацию
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Icon name="ArrowDown" className="h-5 w-5 mr-2" />
              Наши услуги
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Успешных дел</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-muted-foreground">Лет опыта</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground">Довольных клиентов</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
