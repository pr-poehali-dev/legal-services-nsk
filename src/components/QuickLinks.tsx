import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const QuickLinks = () => {
  const quickLinks = [
    {
      title: 'Семейные споры',
      description: 'Развод, алименты, раздел имущества',
      href: '/services#family',
      icon: 'Heart',
      color: 'bg-red-50 text-red-600 border-red-200'
    },
    {
      title: 'Трудовые споры',
      description: 'Увольнение, зарплата, трудовые права',
      href: '/services#labor',
      icon: 'Briefcase',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'ДТП и страховые',
      description: 'ОСАГО, ущерб, восстановление после ДТП',
      href: '/dtp-lawyer',
      icon: 'Car',
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    },
    {
      title: 'Гражданские споры',
      description: 'Договоры, долги, защита прав',
      href: '/services#civil',
      icon: 'Scale',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Недвижимость',
      description: 'Покупка, продажа, оформление права',
      href: '/services#real-estate',
      icon: 'Home',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: 'Уголовные дела',
      description: 'Защита в суде, консультации',
      href: '/services#criminal',
      icon: 'Shield',
      color: 'bg-gray-50 text-gray-600 border-gray-200'
    }
  ];

  const phoneNumber = '+7 (999) 452-35-00';
  const phoneLink = 'tel:+79994523500';

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4">


        {/* Быстрые ссылки */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="group p-6 bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg border-2 ${link.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={link.icon} size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Контактный блок с телефоном */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Icon name="Phone" size={32} />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-3">
              Срочная юридическая помощь
            </h3>
            
            <p className="text-blue-100 mb-6 text-lg">
              Звоните прямо сейчас — получите бесплатную консультацию в течение 15 минут
            </p>
            
            <div className="space-y-4">
              <a 
                href={phoneLink}
                className="inline-block text-3xl font-bold hover:text-blue-200 transition-colors"
              >
                {phoneNumber}
              </a>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Круглосуточно</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} />
                  <span>WhatsApp и Telegram</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>Новосибирск</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-blue-500/30">
              <p className="text-sm text-blue-100">
                🎯 <strong>Первая консультация бесплатно</strong> • ⚡ Быстрое решение вопросов • 📋 Работаем без предоплаты
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;