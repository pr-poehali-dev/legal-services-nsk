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

const PopupModal = () => {
  const { isOpen, closeModal, openModal } = useModal();
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
      // Отправляем данные на API
      const response = await fetch(
        `https://api.example.com/leads/c80e4b7d4aa14f7c9f0b86e05730e35f1200768ef5b046209e`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            question: formData.question,
            type: "popup",
            timestamp: new Date().toISOString(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время");
      setFormData({ name: "", phone: "", question: "" });
      closeModal();
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
    const timer = setTimeout(() => {
      openModal();
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [openModal]);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Ваше имя *"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Номер телефона *"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Кратко о вашем вопросе"
                value={formData.question}
                onChange={(e) => handleInputChange("question", e.target.value)}
              />
            </div>
          </form>

          <div className="space-y-4">
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <Icon name="Phone" className="h-5 w-5 mr-2" />
              {isSubmitting ? "Отправляем..." : "Получить консультацию"}
            </Button>
          </div>

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
      </DialogContent>
    </Dialog>
  );
};

export default PopupModal;
