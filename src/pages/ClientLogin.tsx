import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const SMS_AUTH_URL = 'https://functions.poehali.dev/3435e395-e2f4-4083-b5f9-45aa97f38b94';

export default function ClientLogin() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [phoneStep, setPhoneStep] = useState<'phone' | 'code'>('phone');
  
  const [loading, setLoading] = useState(false);
  const { loginWithSMS } = useAuth();
  const navigate = useNavigate();

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || phone.length < 10) {
      toast.error('Введите корректный номер телефона');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(SMS_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send',
          phone: phone.startsWith('+') ? phone : `+${phone}`
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.sms_sent) {
          toast.success('Код отправлен по SMS!');
        } else {
          toast.success('Код сохранён (проверьте консоль для тестирования)');
        }
        setPhoneStep('code');
      } else {
        toast.error(data.error || 'Ошибка отправки кода');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || code.length !== 6) {
      toast.error('Введите 6-значный код');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(SMS_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          phone: phone.startsWith('+') ? phone : `+${phone}`,
          code
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        loginWithSMS(data.token, data.user);
        toast.success('Вход выполнен!');
        navigate('/client/cabinet');
      } else {
        toast.error(data.error || 'Неверный код');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Icon name="User" className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Вход в личный кабинет</CardTitle>
          <CardDescription className="text-center">
            Войдите по номеру телефона
          </CardDescription>
        </CardHeader>
        <CardContent>
          {phoneStep === 'phone' ? (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 999 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Код придёт по SMS
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="Send" className="mr-2 h-4 w-4" />
                    Получить код
                  </>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Код из SMS</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  disabled={loading}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Код действителен 10 минут
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Проверка...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" className="mr-2 h-4 w-4" />
                    Войти
                  </>
                )}
              </Button>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setPhoneStep('phone');
                  setCode('');
                }}
              >
                <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                Изменить номер
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}