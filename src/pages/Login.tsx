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
  const [authMethod, setAuthMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeRequested, setCodeRequested] = useState(false);
  const { login, setUser } = useAuth();
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Заполните все поля');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      toast.success('Вход выполнен успешно!');
      navigate('/lawyer');
    } catch (error: any) {
      toast.error(error.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Icon name="Scale" className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Вход в систему</CardTitle>
          <CardDescription className="text-center">
            Выберите способ авторизации
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={authMethod === 'whatsapp' ? 'default' : 'outline'}
              onClick={() => {
                setAuthMethod('whatsapp');
                setCodeRequested(false);
              }}
            >
              <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              type="button"
              variant={authMethod === 'email' ? 'default' : 'outline'}
              onClick={() => setAuthMethod('email')}
            >
              <Icon name="Mail" className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>

          {authMethod === 'whatsapp' ? (
            !codeRequested ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 999 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button 
                  onClick={handleWhatsAppRequestCode} 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="mr-2 h-4 w-4" />
                      Получить код в WhatsApp
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Код из WhatsApp</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={loading}
                    maxLength={6}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCodeRequested(false)}
                    className="w-full"
                  >
                    Назад
                  </Button>
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
                </div>
              </form>
            )
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Вход...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" className="mr-2 h-4 w-4" />
                    Войти
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground mb-2">
              Нет аккаунта?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Зарегистрироваться как юрист
              </Link>
            </p>
            {authMethod === 'email' && (
              <p className="text-xs text-muted-foreground">
                Для входа админа используйте: admin@legal.ru / admin123
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
