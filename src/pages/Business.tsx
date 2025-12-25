import BusinessHero from "@/components/business/BusinessHero";
import BusinessServices from "@/components/business/BusinessServices";
import BusinessBlog from "@/components/business/BusinessBlog";
import BusinessContacts from "@/components/business/BusinessContacts";
import BusinessFooter from "@/components/business/BusinessFooter";
import SEOHead from "@/components/SEOHead";

const Business = () => {
  return (
    <>
      <SEOHead 
        title="Юридические услуги для бизнеса | Корпоративный юрист"
        description="Комплексное юридическое сопровождение бизнеса: арбитражные споры, договоры, банкротство, налоговые споры, регистрация компаний"
        keywords="юрист для бизнеса, корпоративный юрист, арбитражный юрист, юридическое сопровождение бизнеса"
        canonical="https://yurist-kaluga.ru/business"
      />
      <div className="min-h-screen bg-slate-50">
        <BusinessHero />
        <BusinessServices />
        <BusinessBlog />
        <BusinessContacts />
        <BusinessFooter />
      </div>
    </>
  );
};

export default Business;
