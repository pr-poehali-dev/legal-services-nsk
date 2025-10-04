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
import { useModal } from "@/hooks/useModal";
import { toast } from "sonner";

const ConsultationModal = () => {
  const { consultationModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    question: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error("Заполните обязательные поля");
      return;
    }

    setIsSubmitting(true);

    try {
      // Отправляем уведомление через Green API
      const message = `🆕 Новая заявка на консультацию\n\n👤 Имя: ${formData.name}\n📞 Телефон: ${formData.phone}\n❓ Вопрос: ${formData.question || "Не указан"}\n⏰ Время: ${new Date().toLocaleString("ru-RU")}`;

      const response = await fetch(
        `https://1103.api.green-api.com/waInstance1103279953/sendMessage/c80e4b7d4aa14f7c9f0b86e05730e35f1200768ef5b046209e`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: "79994523500@c.us",
            message: message,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время");
      setFormData({ name: "", phone: "", question: "" });
      localStorage.setItem('consultationShown', 'true');
      consultationModal.close();
    } catch (error) {
      toast.error("Ошибка отправки. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Проверяем, было ли уведомление уже показано или закрыто
    const wasShown = localStorage.getItem('consultationShown');
    
    if (wasShown) {
      return; // Не показываем, если уже показывали
    }

    const timer = setTimeout(() => {
      consultationModal.open();
      localStorage.setItem('consultationShown', 'true');
    }, 90000); // 1.5 минуты (90000 мс)

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    localStorage.setItem('consultationShown', 'true');
    consultationModal.close();
  };

  return (
    <Dialog
      open={consultationModal.isOpen}
      onOpenChange={handleClose}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon name="Calendar" className="h-6 w-6 text-primary" />
            <span>Записаться на консультацию</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Scale" className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">
              БЕСПЛАТНАЯ консультация
            </h3>
            <p className="text-muted-foreground text-sm">
              Оставьте заявку — мы перезвоним в течение 15 минут
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs">
              <div className="flex items-center text-green-600">
                <Icon name="Phone" className="h-3 w-3 mr-1" />
                +7 999 452 35 00
              </div>
              <div className="flex items-center text-green-600">
                <Icon name="Clock" className="h-3 w-3 mr-1" />
                24/7
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Ваше имя *"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
            <Input
              placeholder="Номер телефона *"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
            <Input
              placeholder="Кратко о вашем вопросе"
              value={formData.question}
              onChange={(e) => handleInputChange("question", e.target.value)}
            />
          </form>

          <div className="space-y-3">
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <Icon name="Send" className="h-5 w-5 mr-2" />
              {isSubmitting ? "Отправляем..." : "ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ"}
            </Button>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">или звоните прямо сейчас</p>
              <Button
                variant="outline"
                onClick={() => {
                  window.open('tel:+79994523500', '_self');
                  consultationModal.close();
                }}
                className="border-accent text-accent hover:bg-accent hover:text-white"
              >
                <Icon name="Phone" className="h-4 w-4 mr-2" />
                +7 999 452 35 00
              </Button>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a 
              href="/privacy" 
              target="_blank"
              className="text-primary hover:underline"
            >
              политикой конфиденциальности
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;