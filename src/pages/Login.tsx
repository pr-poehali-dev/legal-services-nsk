import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const API_URL = 'https://functions.poehali.dev/051ee883-7010-44a8-a46c-b5021e841de7';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeRequested, setCodeRequested] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleWhatsAppRequestCode = async () => {
    if (!phone) {
      toast.error('Введите номер телефона');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'whatsapp_request_code',
          phone: phone
        })
      });

      const data = await response.json();

      if (response.ok && data.sent) {
        toast.success('Код отправлен в WhatsApp!');
        setCodeRequested(true);
      } else {
        toast.error(data.error || data.message || 'Ошибка отправки кода');
      }
    } catch (error: any) {
      toast.error('Ошибка отправки кода');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !code) {
      toast.error('Введите телефон и код');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'whatsapp_verify_code',
          phone: phone,
          code: code
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        toast.success('Вход выполнен!');
        navigate(data.user.role === 'lawyer' ? '/lawyer' : '/client');
      } else {
        toast.error(data.error || 'Неверный код');
      }
    } catch (error: any) {
      toast.error('Ошибка проверки кода');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4 transition-transform duration-500 hover:scale-110">
            <div className="relative">
              <Icon name="Scale" className="h-12 w-12 text-primary animate-pulse" />
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-50" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Вход в систему
          </CardTitle>
          <CardDescription className="text-center">
            Авторизация через WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!codeRequested ? (
            <div className="space-y-4 animate-in fade-in-50 duration-500">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4 text-primary" />
                  Номер телефона
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 999 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>
              <Button 
                onClick={handleWhatsAppRequestCode} 
                className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
                    Получить код в WhatsApp
                  </>
                )}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppVerifyCode} className="space-y-4 animate-in fade-in-50 duration-500">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="MessageCircle" className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-green-900">
                      Код отправлен в WhatsApp
                    </p>
                    <p className="text-xs text-green-700">
                      Проверьте сообщения на номере {phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="code" className="flex items-center gap-2">
                  <Icon name="Lock" className="h-4 w-4 text-primary" />
                  Код из WhatsApp
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={loading}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest font-bold transition-all duration-300 focus:scale-[1.02]"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCodeRequested(false);
                    setCode('');
                  }}
                  className="w-full transition-all duration-300 hover:scale-105"
                >
                  <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                  Назад
                </Button>
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg" 
                  disabled={loading}
                >
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
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Нет аккаунта?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium transition-colors">
                Зарегистрироваться как юрист
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
