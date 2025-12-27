import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";

const GuiltDetermination = () => {
  const { openModal } = useModal();
  const seo = getSEOConfig('guiltDetermination');

  return (
    <>
      <SEOHead 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                <Icon name="Scale" size={40} className="text-yellow-600" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Установление вины за ДТП
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Докажем вашу невиновность и защитим от необоснованных претензий
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  onClick={openModal}
                >
                  <Icon name="MessageCircle" className="mr-2" />
                  Бесплатная консультация
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                  onClick={() => window.location.href = 'tel:+79931903500'}
                >
                  <Icon name="Phone" className="mr-2" />
                  +7 993 190 35 00
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={20} className="text-green-600" />
                  <span>Опыт 15+ лет</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={20} className="text-green-600" />
                  <span>98% выигранных дел</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={20} className="text-green-600" />
                  <span>Работаем по всей России</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Когда нужно установление вины?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="AlertTriangle" className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Вас признали виновным</h3>
                      <p className="text-gray-600 text-sm">
                        ГИБДД или суд признали вас виновником, хотя вы не нарушали ПДД
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Users" className="text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Обоюдная вина</h3>
                      <p className="text-gray-600 text-sm">
                        Установлена обоюдная вина, но на самом деле вы не виноваты
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="FileQuestion" className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Неверный протокол</h3>
                      <p className="text-gray-600 text-sm">
                        В протоколе ДТП указаны неверные обстоятельства происшествия
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Camera" className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Есть видеозапись</h3>
                      <p className="text-gray-600 text-sm">
                        У вас есть видео с регистратора, которое доказывает невиновность
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Как мы доказываем невиновность
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Анализ материалов дела</h3>
                    <p className="text-gray-600">
                      Изучаем протокол, схему ДТП, показания свидетелей, фото и видео с места происшествия
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Независимая экспертиза</h3>
                    <p className="text-gray-600">
                      Назначаем автотехническую экспертизу для установления механизма ДТП и истинного виновника
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Сбор доказательств</h3>
                    <p className="text-gray-600">
                      Запрашиваем записи с камер наблюдения, находим свидетелей, готовим техническую документацию
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Обжалование в суде</h3>
                    <p className="text-gray-600">
                      Подаем иск об установлении невиновности, представляем интересы в суде до положительного решения
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Что вы получите
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="ShieldCheck" size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">Снятие вины</h3>
                  <p className="text-sm text-gray-600">
                    Официальное признание невиновности в ДТП
                  </p>
                </div>

                <div className="text-center p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="DollarSign" size={32} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">Возврат выплат</h3>
                  <p className="text-sm text-gray-600">
                    Не придется платить за чужой ущерб
                  </p>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Award" size={32} className="text-purple-600" />
                  </div>
                  <h3 className="font-bold mb-2">Чистая репутация</h3>
                  <p className="text-sm text-gray-600">
                    Сохраните безаварийную страховую историю
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-700">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Не платите за чужие ошибки!
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Получите бесплатную консультацию и узнайте, как доказать свою невиновность
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold"
                  onClick={openModal}
                >
                  <Icon name="MessageCircle" className="mr-2" />
                  Получить консультацию
                </Button>
                <Button 
                  size="lg"
                  className="bg-yellow-800 text-white hover:bg-yellow-900 font-semibold"
                  onClick={() => window.location.href = 'tel:+79931903500'}
                >
                  <Icon name="Phone" className="mr-2" />
                  Позвонить сейчас
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Стоимость услуг
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
                  <h3 className="text-2xl font-bold mb-4">Базовый пакет</h3>
                  <div className="text-4xl font-bold text-yellow-600 mb-6">
                    от 30 000 ₽
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" />
                      <span>Анализ материалов дела</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" />
                      <span>Подготовка документов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" />
                      <span>Представительство в суде</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={openModal}
                  >
                    Заказать
                  </Button>
                </div>

                <div className="bg-yellow-600 text-white rounded-xl p-8 border-2 border-yellow-700 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Популярный
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Полный пакет</h3>
                  <div className="text-4xl font-bold mb-6">
                    от 50 000 ₽
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="mt-1 flex-shrink-0" />
                      <span>Всё из базового пакета</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="mt-1 flex-shrink-0" />
                      <span>Независимая экспертиза</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="mt-1 flex-shrink-0" />
                      <span>Сбор доказательств</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="mt-1 flex-shrink-0" />
                      <span>Поиск свидетелей</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-white text-yellow-600 hover:bg-gray-100"
                    onClick={openModal}
                  >
                    Заказать
                  </Button>
                </div>
              </div>

              <p className="text-center text-gray-600 mt-8">
                * Точная стоимость определяется после анализа вашей ситуации
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GuiltDetermination;
