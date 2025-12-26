import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const WhyUs = () => {
  const [currentLogo, setCurrentLogo] = useState(0);
  
  const logos = [
    {
      url: "https://cdn.poehali.dev/files/Unknown.png",
      alt: "ЮрСервисНСК"
    },
    {
      url: "https://cdn.poehali.dev/files/ЛоготипНД54 ( без фона ) .jpe g.jpeg",
      alt: "Народная Дружина Октябрьская"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin-slow"></div>
              <div className="absolute inset-8 rounded-full border-2 border-primary/10"></div>
              
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className={`absolute inset-12 flex items-center justify-center transition-all duration-700 ${
                    currentLogo === index 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-90'
                  }`}
                >
                  <img
                    src={logo.url}
                    alt={logo.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              ЮрСервисНСК
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Компания, объединяющая в себе:
              </p>
              
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Общественная деятельность</h3>
                    <p className="text-sm">
                      При поддержке <strong>Народной Дружины</strong> в лице ФЗ о дружинах, зарегистрированной в МВД и подчиняющейся Администрации г. Новосибирска
                    </p>
                  </div>
                  
                  <div className="h-px bg-border"></div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">ООО "Правоотношение"</h3>
                    <p className="text-sm">
                      Юридическая компания, работающая с 2016 года в области права и оказывающая профессиональные юридические услуги
                    </p>
                  </div>
                </CardContent>
              </Card>

              <p className="text-base pt-4">
                Такое объединение позволяет нам сочетать общественную защиту прав граждан с профессиональной юридической поддержкой на самом высоком уровне.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;