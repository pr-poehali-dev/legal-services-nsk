import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon name="Scale" className="h-6 w-6 text-primary" />
            <span>Бесплатная консультация</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Gift" className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">
              Получите консультацию юриста бесплатно!
            </h3>
            <p className="text-muted-foreground text-sm">
              Оставьте заявку и получите профессиональную консультацию по вашему
              вопросу в течение 30 минут
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input placeholder="Ваше имя" />
            </div>
            <div className="space-y-2">
              <Input placeholder="Номер телефона" type="tel" />
            </div>
            <div className="space-y-2">
              <Input placeholder="Кратко о вашем вопросе" />
            </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
              <Icon name="Phone" className="h-5 w-5 mr-2" />
              Получить консультацию
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" className="h-4 w-4" />
                <span>Быстро</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" className="h-4 w-4" />
                <span>Конфиденциально</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Gift" className="h-4 w-4" />
                <span>Бесплатно</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupModal;
