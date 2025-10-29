import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

const SMS_AUTH_URL = 'https://functions.poehali.dev/3435e395-e2f4-4083-b5f9-45aa97f38b94';

interface SMSAuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (token: string, user: any) => void;
}

export default function SMSAuthModal({ open, onClose, onSuccess }: SMSAuthModalProps) {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phone.trim()) {
      toast.error('Введите номер телефона');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(SMS_AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send',
          phone: phone.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Код отправлен на ваш телефон');
        setStep('code');
      } else {
        toast.error(data.error || 'Не удалось отправить код');
      }
    } catch (error) {
      toast.error('Ошибка при отправке кода');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code.trim()) {
      toast.error('Введите код из СМС');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(SMS_AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify',
          phone: phone.trim(),
          code: code.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Вход выполнен успешно');
        onSuccess(data.token, data.user);
        handleClose();
      } else {
        toast.error(data.error || 'Неверный код');
      }
    } catch (error) {
      toast.error('Ошибка при проверке кода');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('phone');
    setPhone('');
    setCode('');
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Вход через СМС
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {step === 'phone' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Номер телефона</label>
                <Input
                  type="tel"
                  placeholder="+7 999 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  Мы отправим вам код подтверждения
                </p>
              </div>

              <Button
                onClick={handleSendCode}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" className="animate-spin mr-2" size={20} />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="Send" className="mr-2" size={20} />
                    Получить код
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Код из СМС</label>
                <Input
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  disabled={loading}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-muted-foreground">
                  Введите 6-значный код из СМС
                </p>
              </div>

              <Button
                onClick={handleVerifyCode}
                disabled={loading || code.length !== 6}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" className="animate-spin mr-2" size={20} />
                    Проверка...
                  </>
                ) : (
                  <>
                    <Icon name="Lock" className="mr-2" size={20} />
                    Войти
                  </>
                )}
              </Button>

              <Button
                onClick={() => {
                  setStep('phone');
                  setCode('');
                }}
                variant="ghost"
                disabled={loading}
                className="w-full"
              >
                <Icon name="ArrowLeft" className="mr-2" size={20} />
                Изменить номер
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
