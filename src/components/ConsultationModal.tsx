import { useState } from "react";
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
      const consultation = {
        ...formData,
        date: new Date().toISOString(),
        id: Date.now(),
      };

      const existing = JSON.parse(
        localStorage.getItem("consultations") || "[]",
      );
      existing.push(consultation);
      localStorage.setItem("consultations", JSON.stringify(existing));

      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      setFormData({ name: "", phone: "", question: "" });
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

  return (
    <Dialog
      open={consultationModal.isOpen}
      onOpenChange={consultationModal.close}
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
              Профессиональная юридическая консультация
            </h3>
            <p className="text-muted-foreground text-sm">
              Оставьте заявку и получите персональную консультацию по вашему
              вопросу
            </p>
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

          <Button
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Icon name="Send" className="h-5 w-5 mr-2" />
            {isSubmitting ? "Отправляем..." : "Отправить заявку"}
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;
