import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const ServicesMain = () => {
  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-none shadow-2xl">
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                <Icon name="Briefcase" className="h-12 w-12 text-white" />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold">
                Профессиональные юридические услуги
              </h2>
              
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Мы оказываем полный спектр юридических услуг для граждан и бизнеса. 
                Автоюрист, семейные дела, банкротство, недвижимость, миграционные споры и многое другое.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Link to="/services">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 px-8"
                  >
                    <Icon name="ListChecks" className="h-5 w-5 mr-2" />
                    Посмотреть все услуги
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => window.open('tel:+79994523500', '_self')}
                >
                  <Icon name="Phone" className="h-5 w-5 mr-2" />
                  +7 999 452 35 00
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-8 text-blue-100">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" className="h-5 w-5" />
                  <span>Работаем 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" className="h-5 w-5" />
                  <span>Выезд в любой район</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Shield" className="h-5 w-5" />
                  <span>Конфиденциальность</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServicesMain;
