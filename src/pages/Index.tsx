import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AudienceSelector from "@/components/AudienceSelector";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Если пользователь уже выбирал аудиторию, перенаправляем его
    const audienceType = localStorage.getItem('audienceType');
    if (audienceType === 'business') {
      navigate('/business');
    } else if (audienceType === 'citizens') {
      navigate('/citizens');
    }
  }, [navigate]);

  const handleAudienceSelect = (type: 'business' | 'citizens') => {
    localStorage.setItem('audienceType', type);
    if (type === 'business') {
      navigate('/business');
    } else {
      navigate('/citizens');
    }
  };

  return (
    <>
      <SEOHead 
        title="ЮрСервис НСК - Юридические услуги в Калуге"
        description="Профессиональные юридические услуги для граждан и бизнеса в Калуге. Автоюрист, гражданские дела, банкротство, миграционные споры."
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <AudienceSelector onSelect={handleAudienceSelect} />
      </div>
    </>
  );
};

export default Index;
