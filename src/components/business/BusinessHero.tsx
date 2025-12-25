import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { CONTACTS } from "@/config/contacts";

const BusinessHero = () => {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(103525320, 'reachGoal', 'phone_click');
    }
    window.location.href = `tel:${CONTACTS.phone.replace(/[^\d+]/g, '')}`;
  };

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(103525320, 'reachGoal', 'whatsapp_click');
    }
    window.open(`https://wa.me/${CONTACTS.whatsapp}`, '_blank');
  };

  return (
    <section className="relative min-h-[90vh] pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <div className="flex items-center gap-2 bg-blue-600/30 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-2 mb-6">
              <Icon name="Building2" size={20} />
              <span className="text-sm font-semibold">Для юридических лиц и ИП</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Юридическая защита
            <span className="block mt-2 text-blue-400">
              интересов бизнеса
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Арбитражные споры • Договорное право • Налоговые споры • Банкротство • Корпоративное право
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/50 text-lg px-8 py-6"
              onClick={handleWhatsAppClick}
            >
              <Icon name="MessageCircle" size={24} className="mr-2" />
              Консультация в WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-6"
              onClick={handlePhoneClick}
            >
              <Icon name="Phone" size={24} className="mr-2" />
              {CONTACTS.phone}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">15+</div>
              <div className="text-sm text-blue-200">лет опыта</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-sm text-blue-200">компаний</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">92%</div>
              <div className="text-sm text-blue-200">выигранных дел</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-blue-200">на связи</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-8 text-blue-100">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={20} />
              <span>Конфиденциальность</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="FileCheck" size={20} />
              <span>Договор</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={20} />
              <span>Быстрые решения</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </section>
  );
};

export default BusinessHero;