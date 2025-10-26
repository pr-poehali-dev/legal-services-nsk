import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const SoloGPTWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const soloGptElement = document.querySelector('[data-sologpt]') as HTMLElement;
    if (soloGptElement) {
      soloGptElement.click();
    } else {
      console.log('SoloGPT виджет загружается...');
    }
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <>
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-primary via-primary to-blue-700 hover:scale-110 transition-all duration-300 animate-pulse"
          style={{
            boxShadow: '0 0 30px rgba(37, 99, 235, 0.5)',
          }}
        >
          <Icon name="MessageCircle" className="h-8 w-8 text-white" />
        </Button>
      ) : (
        <div
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-primary via-primary to-blue-700 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
          onClick={handleClick}
          style={{
            boxShadow: '0 0 40px rgba(37, 99, 235, 0.6)',
            minWidth: '280px',
          }}
        >
          <div className="relative p-6">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10"
              onClick={handleMinimize}
            >
              <Icon name="Minimize2" className="h-4 w-4" />
            </Button>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Icon name="Bot" className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">
                  Юридический помощник AI
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Задайте вопрос прямо сейчас — отвечу за 30 секунд!
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-white/80 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Онлайн • Бесплатно</span>
            </div>

            <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
              НОВИНКА
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
            <span className="text-white/90 text-sm font-medium">
              Нажмите, чтобы начать
            </span>
            <Icon name="ArrowRight" className="h-5 w-5 text-white" />
          </div>
        </div>
      )}
    </>
  );
};

export default SoloGPTWidget;
