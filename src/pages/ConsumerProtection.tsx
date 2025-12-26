import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import CompensationCalculator from "@/components/consumer/CompensationCalculator";
import ConsumerRightsSection from "@/components/consumer/ConsumerRightsSection";
import ConsumerProtectionInfo from "@/components/consumer/ConsumerProtectionInfo";

const ConsumerProtection = () => {
  const { openModal } = useModal();

  return (
    <>
      <SEOHead 
        title="Защита прав потребителей в Новосибирске - возврат денег за товар и услуги"
        description="Юридическая помощь по защите прав потребителей: возврат некачественного товара, услуг, компенсация морального вреда. Бесплатная консультация."
        keywords="защита прав потребителей, возврат товара, некачественная услуга, претензия продавцу, компенсация морального вреда"
        canonical="https://юрсервиснск.рф/consumer-protection"
      />
      
      <div className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/citizens">Главная</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/services">Услуги</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Защита прав потребителей</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="secondary" className="text-sm">
                  <Icon name="Shield" className="h-4 w-4 mr-2" />
                  Закон на вашей стороне
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                  Защита прав потребителей
                </h1>
                <p className="text-lg text-muted-foreground">
                  Вернём деньги за некачественный товар или услугу. Взыщем неустойку, 
                  штраф и компенсацию морального вреда. <strong>98% выигранных дел.</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={openModal} className="bg-primary hover:bg-primary/90">
                    <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                    Бесплатная консультация
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.open('tel:+79994523500', '_self')}
                  >
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    +7 999 452 35 00
                  </Button>
                </div>
              </div>

              <CompensationCalculator />
            </div>
          </div>
        </div>

        <ConsumerRightsSection />

        <ConsumerProtectionInfo />

        {/* Final CTA */}
        <div className="py-20 bg-gradient-to-r from-primary to-blue-600">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur border-none shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold">
                    Не дайте нарушить ваши права!
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Бесплатная консультация за 15 минут. Узнайте, сколько денег вы можете получить 
                    и какие у вас шансы на успех.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white"
                      onClick={openModal}
                    >
                      <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                      Получить консультацию
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => window.open('tel:+79994523500', '_self')}
                    >
                      <Icon name="Phone" className="h-5 w-5 mr-2" />
                      +7 999 452 35 00
                    </Button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-8 pt-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" className="h-5 w-5 text-primary" />
                      <span>Ответ в течение часа</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Shield" className="h-5 w-5 text-primary" />
                      <span>Конфиденциальность</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Award" className="h-5 w-5 text-primary" />
                      <span>98% выигранных дел</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ConsumerProtection;
