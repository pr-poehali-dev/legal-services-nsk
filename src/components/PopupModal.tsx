import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";

const PopupModal = () => {
  const { isOpen, closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки формы
    console.log("Форма отправлена:", formData);
    closeModal();
    // Показываем уведомление об успешной отправке
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon name="Calendar" className="h-5 w-5 text-primary" />
            <span>Бесплатная консультация</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Имя *</label>
            <Input
              name="name"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Телефон *</label>
            <Input
              name="phone"
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ваш вопрос</label>
            <Textarea
              name="message"
              placeholder="Кратко опишите вашу ситуацию..."
              className="min-h-[80px]"
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Icon name="Send" className="h-4 w-4 mr-2" />
              Отправить
            </Button>
            <Button type="button" variant="outline" onClick={closeModal}>
              Отмена
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            <Icon name="Shield" className="h-3 w-3 inline mr-1" />
            Ваши данные защищены
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PopupModal;
