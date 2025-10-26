import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const API_URL = 'https://functions.poehali.dev/051ee883-7010-44a8-a46c-b5021e841de7';

export default function ClientLogin() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [phoneStep, setPhoneStep] = useState<'phone' | 'code'>('phone');
  
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error('Заполните все поля');
      return;
    }

    setLoading(true);

    try {
      await login(loginEmail, loginPassword);
      toast.success('Вход выполнен успешно!');
      navigate('/client/cabinet');
    } catch (error: any) {
      toast.error(error.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerEmail || !registerPassword || !registerName) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    if (registerPassword.length < 6) {
      toast.error('Пароль должен быть минимум 6 символов');
      return;
    }

    setLoading(true);

    try {
      await register(registerEmail, registerPassword, registerName, registerPhone);
      toast.success('Регистрация успешна!');
      navigate('/client/cabinet');
    } catch (error: any) {
      toast.error(error.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || phone.length < 10) {
      toast.error('Введите корректный номер телефона');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'phone_request_code',
          phone: phone.startsWith('+') ? phone : `+${phone}`
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Код отправлен в WhatsApp!');
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
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'phone_verify_code',
          phone: phone.startsWith('+') ? phone : `+${phone}`,
          code,
          name: name || `Клиент ${phone.slice(-4)}`
        })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.user);
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
            Войдите или создайте новый аккаунт
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phone" className="w-full">
            <TabsList className="grid w-full grid-cols-3 text-xs">
              <TabsTrigger value="phone">📱 Телефон</TabsTrigger>
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистр.</TabsTrigger>
            </TabsList>

            <TabsContent value="phone">
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
                      Код придёт в WhatsApp
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя (необязательно)</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />
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
                    <Label htmlFor="code">Код из WhatsApp</Label>
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
                    onClick={() => setPhoneStep('phone')}
                    disabled={loading}
                  >
                    <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                    Назад
                  </Button>
                </form>
              )}
            </TabsContent>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Пароль</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
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
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">ФИО *</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Иван Иванов"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email *</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-phone">Телефон</Label>
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="+7 (900) 123-45-67"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Пароль *</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Минимум 6 символов"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Регистрация...
                    </>
                  ) : (
                    <>
                      <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                      Зарегистрироваться
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              ← Вернуться на главную
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}