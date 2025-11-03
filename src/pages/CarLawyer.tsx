import HeroSection from '@/components/car-lawyer/HeroSection';
import SituationsSection from '@/components/car-lawyer/SituationsSection';
import CarCheckSection from '@/components/car-lawyer/CarCheckSection';
import CompensationSection from '@/components/car-lawyer/CompensationSection';
import WorkflowSection from '@/components/car-lawyer/WorkflowSection';
import ContactFormSection from '@/components/car-lawyer/ContactFormSection';
import FooterSection from '@/components/car-lawyer/FooterSection';

export default function CarLawyer() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <HeroSection />
      <SituationsSection />
      <CarCheckSection />
      <CompensationSection />
      <WorkflowSection />
      <ContactFormSection />
      <FooterSection />
    </div>
  );
}
