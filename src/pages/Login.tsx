import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success('Вход выполнен успешно!');
        navigate('/cabinet');
      } else {
        await register(formData.email, formData.password, formData.name, formData.phone);
        toast.success('Регистрация успешна!');
        navigate('/cabinet');
      }
    } catch (error: any) {
      toast.error(error.message || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-blue-500/5 flex items-center justify-center px-4 pt-20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isLogin ? 'Вход в личный кабинет' : 'Регистрация'}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Войдите для доступа к личному кабинету' 
              : 'Создайте аккаунт для работы с юристом'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (900) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.ru"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Icon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name={isLogin ? "LogIn" : "UserPlus"} className="h-4 w-4 mr-2" />
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin 
                ? 'Нет аккаунта? Зарегистрируйтесь' 
                : 'Уже есть аккаунт? Войдите'}
            </Button>
          </div>

          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              <Icon name="Lock" className="h-3 w-3 inline mr-1" />
              Ваши данные защищены и используются только для работы с юристом
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
