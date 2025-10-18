import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface CaseEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: any;
  onSuccess: () => void;
}

const API_URL = 'https://functions.poehali.dev/051ee883-7010-44a8-a46c-b5021e841de7';

const CaseEditDialog = ({ open, onOpenChange, caseData, onSuccess }: CaseEditDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    category: '',
    price: 0,
    progress: 0,
    hearing_date: '',
    hearing_result: '',
    next_hearing_date: ''
  });

  useEffect(() => {
    if (caseData) {
      setFormData({
        title: caseData.title || '',
        description: caseData.description || '',
        status: caseData.status || 'pending',
        priority: caseData.priority || 'medium',
        category: caseData.category || '',
        price: caseData.price || 0,
        progress: caseData.progress || 0,
        hearing_date: caseData.hearing_date ? new Date(caseData.hearing_date).toISOString().slice(0, 16) : '',
        hearing_result: caseData.hearing_result || '',
        next_hearing_date: caseData.next_hearing_date ? new Date(caseData.next_hearing_date).toISOString().slice(0, 16) : ''
      });
    }
  }, [caseData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({
          case_id: caseData.id,
          ...formData,
          hearing_date: formData.hearing_date || null,
          next_hearing_date: formData.next_hearing_date || null
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Дело обновлено! Клиент получит уведомление в WhatsApp');
        onSuccess();
        onOpenChange(false);
      } else {
        toast.error(data.error || 'Ошибка обновления');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать дело</DialogTitle>
          <DialogDescription>
            При изменении даты заседания или результата клиент автоматически получит уведомление в WhatsApp
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название дела *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">Гражданское право</SelectItem>
                  <SelectItem value="business">Корпоративное право</SelectItem>
                  <SelectItem value="family">Семейное право</SelectItem>
                  <SelectItem value="criminal">Уголовная защита</SelectItem>
                  <SelectItem value="real-estate">Недвижимость</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Ожидает</SelectItem>
                  <SelectItem value="in_progress">В работе</SelectItem>
                  <SelectItem value="completed">Завершено</SelectItem>
                  <SelectItem value="cancelled">Отменено</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Приоритет</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Низкий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="high">Высокий</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="progress">Прогресс (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Стоимость (₽)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div className="border-t pt-4 space-y-4">
            <h3 className="font-semibold flex items-center">
              <Icon name="Calendar" className="h-4 w-4 mr-2" />
              Заседания (отправит уведомление в WhatsApp)
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hearing_date">Дата заседания</Label>
                <Input
                  id="hearing_date"
                  type="datetime-local"
                  value={formData.hearing_date}
                  onChange={(e) => setFormData({ ...formData, hearing_date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="next_hearing_date">Следующее заседание</Label>
                <Input
                  id="next_hearing_date"
                  type="datetime-local"
                  value={formData.next_hearing_date}
                  onChange={(e) => setFormData({ ...formData, next_hearing_date: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hearing_result">Результат заседания</Label>
              <Textarea
                id="hearing_result"
                value={formData.hearing_result}
                onChange={(e) => setFormData({ ...formData, hearing_result: e.target.value })}
                placeholder="Опишите результат заседания..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Icon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  Сохранение...
                </>
              ) : (
                <>
                  <Icon name="Save" className="h-4 w-4 mr-2" />
                  Сохранить
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CaseEditDialog;
