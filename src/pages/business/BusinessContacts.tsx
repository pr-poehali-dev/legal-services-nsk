import BusinessNavigation from "@/components/business/BusinessNavigation";
import BusinessFooter from "@/components/business/BusinessFooter";
import BusinessContacts from "@/components/business/BusinessContacts";
import SEOHead from "@/components/SEOHead";

const BusinessContactsPage = () => {
  return (
    <>
      <SEOHead 
        title="Контакты юриста для бизнеса | Калуга"
        description="Свяжитесь с нами для получения юридической консультации: телефон, email, адрес офиса в Калуге"
        keywords="контакты юриста, юрист для бизнеса калуга, консультация"
      />
      <BusinessNavigation />
      
      <div className="min-h-screen bg-slate-50 pt-20">
        <BusinessContacts />
        <BusinessFooter />
      </div>
    </>
  );
};

export default BusinessContactsPage;
