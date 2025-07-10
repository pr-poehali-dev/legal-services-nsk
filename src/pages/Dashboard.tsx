import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
      return;
    }

    const userData = JSON.parse(currentUser);
    setUser(userData);

    // Загружаем заявки пользователя
    const allApplications = JSON.parse(
      localStorage.getItem("consultations") || "[]",
    );
    const userApplications = allApplications.filter(
      (app: any) =>
        app.phone === userData.phone || app.email === userData.email,
    );
    setApplications(userApplications);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Вы вышли из системы");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Icon name="Scale" className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Личный кабинет</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Добро пожаловать, {user.name}
              </span>
              <Button variant="outline" onClick={() => navigate("/")}>
                <Icon name="Home" className="h-4 w-4 mr-2" />
                На главную
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <Icon name="LogOut" className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="applications">Заявки</TabsTrigger>
            <TabsTrigger value="documents">Документы</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="User" className="h-5 w-5" />
                  <span>Личная информация</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Имя</label>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Телефон</label>
                    <p className="text-lg">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Дата регистрации
                    </label>
                    <p className="text-lg">
                      {new Date(user.createdAt).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                </div>
                <Button className="mt-4">
                  <Icon name="Edit" className="h-4 w-4 mr-2" />
                  Редактировать профиль
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="FileText" className="h-5 w-5" />
                  <span>Мои заявки</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon
                      name="Inbox"
                      className="h-12 w-12 mx-auto text-muted-foreground mb-4"
                    />
                    <p className="text-muted-foreground">
                      У вас пока нет заявок
                    </p>
                    <Button className="mt-4" onClick={() => navigate("/")}>
                      <Icon name="Plus" className="h-4 w-4 mr-2" />
                      Оставить заявку
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold capitalize">
                              {app.type || "Консультация"}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              {new Date(app.date).toLocaleDateString("ru-RU")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Имя: {app.name}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Телефон: {app.phone}
                          </p>
                          {app.question && (
                            <p className="text-sm">Вопрос: {app.question}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="FolderOpen" className="h-5 w-5" />
                  <span>Документы</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Icon
                    name="FileX"
                    className="h-12 w-12 mx-auto text-muted-foreground mb-4"
                  />
                  <p className="text-muted-foreground mb-4">
                    Функция работы с документами находится в разработке
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-700">
                      ⚠️ Скоро здесь будет возможность загружать и хранить
                      документы по вашим делам
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
