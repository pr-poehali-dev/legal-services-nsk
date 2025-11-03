import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/car-lawyer/HeroSection';
import SituationsSection from '@/components/car-lawyer/SituationsSection';
import CarCheckSection from '@/components/car-lawyer/CarCheckSection';
import CompensationSection from '@/components/car-lawyer/CompensationSection';
import WorkflowSection from '@/components/car-lawyer/WorkflowSection';
import ContactFormSection from '@/components/car-lawyer/ContactFormSection';
import FooterSection from '@/components/car-lawyer/FooterSection';

export default function CarLawyer() {
  return (
    <>
      <Helmet>
        <title>Автоюрист по возврату денег за автомобиль | Взыщем стоимость + компенсация до 300%</title>
        <meta name="description" content="Купили проблемный автомобиль? Скрыли пробег, дефекты, проблемы с документами? Поможем вернуть деньги + компенсацию до 300%. 98% выигранных дел. Бесплатная консультация за 15 минут." />
        <meta name="keywords" content="автоюрист, возврат денег за автомобиль, скрученный пробег, скрытые дефекты авто, проверка ДКП, возврат автомобиля продавцу, защита прав автопокупателей, юрист по автомобильным спорам" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Автоюрист по возврату денег за автомобиль | Взыщем до 300% компенсации" />
        <meta property="og:description" content="Вернём деньги за проблемный автомобиль. Скрыли пробег, дефекты или обманули при покупке? 98% выигранных дел. Консультация за 15 минут." />
        <meta property="og:url" content="https://example.com/car-lawyer" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Автоюрист | Возврат денег за автомобиль + до 300% компенсации" />
        <meta name="twitter:description" content="Поможем вернуть деньги за проблемный автомобиль. 98% выигранных дел. Бесплатная консультация." />
        
        <link rel="canonical" href="https://example.com/car-lawyer" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "Автоюрист по возврату денег за автомобиль",
            "description": "Юридическая помощь при покупке проблемных автомобилей. Возврат денег и компенсации до 300%.",
            "url": "https://example.com/car-lawyer",
            "telephone": "+79994523500",
            "priceRange": "Бесплатная консультация",
            "areaServed": {
              "@type": "Country",
              "name": "Россия"
            },
            "serviceType": [
              "Возврат денег за автомобиль",
              "Защита прав автопокупателей",
              "Проверка ДКП",
              "Юридическое сопровождение сделки"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "450",
              "bestRating": "5"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <HeroSection />
        <SituationsSection />
        <CarCheckSection />
        <CompensationSection />
        <WorkflowSection />
        <ContactFormSection />
        <FooterSection />
      </div>
    </>
  );
}