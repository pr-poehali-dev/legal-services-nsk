import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import CreateClientDialog from './CreateClientDialog';

interface CreateCaseForClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: any[];
  onSuccess: () => void;
  onClientCreated?: () => void;
}

const API_URL = 'https://functions.poehali.dev/051ee883-7010-44a8-a46c-b5021e841de7';

const CreateCaseForClientDialog = ({ open, onOpenChange, clients, onSuccess, onClientCreated }: CreateCaseForClientDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [createClientOpen, setCreateClientOpen] = useState(false);
  const [formData, setFormData] = useState({
    client_id: '',
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    price: 0
  });

  const handleNewClient = (newClient: any) => {
    setFormData({ ...formData, client_id: newClient.id });
    toast.success('Клиент добавлен');
    if (onClientCreated) {
      onClientCreated();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.client_id || !formData.title) {
      toast.error('Выберите клиента и укажите название дела');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({
          action: 'create_case',
          ...formData
        })
      });

      const data = await response.json();

      if (response.ok || response.status === 201) {
        toast.success('Дело создано! Клиент получит уведомление в WhatsApp');
        setFormData({
          client_id: '',
          title: '',
          description: '',
          category: '',
          priority: 'medium',
          price: 0
        });
        onSuccess();
        onOpenChange(false);
      } else {
        toast.error(data.error || 'Ошибка создания дела');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Создать дело для клиента</DialogTitle>
          <DialogDescription>
            Клиент автоматически получит уведомление в WhatsApp
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="client">Клиент *</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setCreateClientOpen(true)}
                disabled={loading}
              >
                <Icon name="UserPlus" className="h-4 w-4 mr-1" />
                Новый клиент
              </Button>
            </div>
            <Select value={formData.client_id} onValueChange={(value) => setFormData({ ...formData, client_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите клиента" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name} {client.phone && `(${client.phone})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название дела *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Иск о взыскании задолженности"
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
              placeholder="Краткое описание дела..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="price">Стоимость (₽)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
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
                  Создание...
                </>
              ) : (
                <>
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Создать дело
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>

      <CreateClientDialog
        open={createClientOpen}
        onOpenChange={setCreateClientOpen}
        onSuccess={handleNewClient}
      />
    </Dialog>
  );
};

export default CreateCaseForClientDialog;