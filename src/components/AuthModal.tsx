import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Временная реализация - проверяем в localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u: any) =>
          u.email === loginData.email && u.password === loginData.password,
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        onAuthSuccess(user);
        toast.success("Добро пожаловать!");
        onClose();
      } else {
        toast.error("Неверный email или пароль");
      }
    } catch (error) {
      toast.error("Ошибка входа");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    setIsLoading(true);

    try {
      // Временная реализация - сохраняем в localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find((u: any) => u.email === registerData.email)) {
        toast.error("Пользователь с таким email уже существует");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      onAuthSuccess(newUser);
      toast.success("Регистрация успешна!");
      onClose();
    } catch (error) {
      toast.error("Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon name="User" className="h-6 w-6 text-primary" />
            <span>Вход в личный кабинет</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                placeholder="Email"
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
              <Input
                placeholder="Пароль"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                <Icon name="LogIn" className="h-5 w-5 mr-2" />
                {isLoading ? "Входим..." : "Войти"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                placeholder="Имя"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <Input
                placeholder="Email"
                type="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                required
              />
              <Input
                placeholder="Телефон"
                type="tel"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                required
              />
              <Input
                placeholder="Пароль"
                type="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />
              <Input
                placeholder="Подтвердите пароль"
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                <Icon name="UserPlus" className="h-5 w-5 mr-2" />
                {isLoading ? "Регистрируем..." : "Зарегистрироваться"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center text-xs text-muted-foreground">
          <p>⚠️ Функции авторизации находятся в разработке</p>
          <p>
            Присоединяйтесь к нашему сообществу:{" "}
            <a
              href="https://t.me/+QgiLIa1gFRY4Y2Iy"
              className="text-primary hover:underline"
            >
              Telegram
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
