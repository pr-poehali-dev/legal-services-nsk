import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface Case {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  lawyer: string;
  price: number;
  progress: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
}

interface Payment {
  id: string;
  amount: number;
  date: string;
  description: string;
  status: "paid" | "pending" | "overdue";
}

const ClientDashboard: React.FC = () => {
  const [user] = useState({
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (999) 452-35-00",
    avatar: "",
  });

  const [cases] = useState<Case[]>([
    {
      id: "1",
      title: "Развод и раздел имущества",
      description: "Оформление развода с разделом совместно нажитого имущества",
      status: "in_progress",
      createdAt: "2024-07-15",
      updatedAt: "2024-08-01",
      lawyer: "Анна Сергеева",
      price: 25000,
      progress: 65,
    },
    {
      id: "2",
      title: "Взыскание алиментов",
      description:
        "Подача заявления на взыскание алиментов на несовершеннолетнего ребенка",
      status: "pending",
      createdAt: "2024-08-01",
      updatedAt: "2024-08-01",
      lawyer: "Анна Сергеева",
      price: 8000,
      progress: 20,
    },
  ]);

  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Свидетельство о браке.pdf",
      type: "pdf",
      uploadedAt: "2024-07-20",
      size: "2.1 MB",
    },
    {
      id: "2",
      name: "Справка о доходах.pdf",
      type: "pdf",
      uploadedAt: "2024-07-22",
      size: "1.5 MB",
    },
    {
      id: "3",
      name: "Документы на квартиру.zip",
      type: "zip",
      uploadedAt: "2024-07-25",
      size: "5.3 MB",
    },
  ]);

  const [payments] = useState<Payment[]>([
    {
      id: "1",
      amount: 15000,
      date: "2024-07-15",
      description: "Первоначальный взнос за ведение дела",
      status: "paid",
    },
    {
      id: "2",
      amount: 10000,
      date: "2024-08-15",
      description: "Доплата за услуги по разделу имущества",
      status: "pending",
    },
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Ожидает", variant: "secondary" as const },
      in_progress: { label: "В работе", variant: "default" as const },
      completed: { label: "Завершено", variant: "success" as const },
      cancelled: { label: "Отменено", variant: "destructive" as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: "Оплачено", variant: "success" as const },
      pending: { label: "Ожидает оплаты", variant: "secondary" as const },
      overdue: { label: "Просрочено", variant: "destructive" as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Личный кабинет
              </h1>
              <p className="text-gray-600 mt-1">
                Управление вашими делами и документами
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Icon name="Settings" className="h-4 w-4 mr-2" />
                Настройки
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="User" className="h-5 w-5" />
                Информация о клиенте
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Имя</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Телефон</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cases">Мои дела</TabsTrigger>
            <TabsTrigger value="documents">Документы</TabsTrigger>
            <TabsTrigger value="payments">Платежи</TabsTrigger>
            <TabsTrigger value="messages">Сообщения</TabsTrigger>
          </TabsList>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Мои дела</h2>
              <Button>
                <Icon name="Plus" className="h-4 w-4 mr-2" />
                Новое обращение
              </Button>
            </div>

            <div className="grid gap-4">
              {cases.map((case_) => (
                <Card key={case_.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{case_.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {case_.description}
                        </CardDescription>
                      </div>
                      {getStatusBadge(case_.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Юрист</p>
                        <p className="font-medium">{case_.lawyer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Стоимость</p>
                        <p className="font-medium">
                          {case_.price.toLocaleString()} ₽
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Создано</p>
                        <p className="font-medium">
                          {new Date(case_.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Обновлено</p>
                        <p className="font-medium">
                          {new Date(case_.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-gray-600">Прогресс</p>
                        <p className="text-sm font-medium">{case_.progress}%</p>
                      </div>
                      <Progress value={case_.progress} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="FileText" className="h-4 w-4 mr-2" />
                        Детали
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="MessageCircle" className="h-4 w-4 mr-2" />
                        Написать юристу
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Документы</h2>
              <Button>
                <Icon name="Upload" className="h-4 w-4 mr-2" />
                Загрузить документ
              </Button>
            </div>

            <div className="grid gap-4">
              {documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon
                            name="FileText"
                            className="h-5 w-5 text-blue-600"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-600">
                            Загружен{" "}
                            {new Date(doc.uploadedAt).toLocaleDateString()} •{" "}
                            {doc.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Download" className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <h2 className="text-xl font-semibold">История платежей</h2>

            <div className="grid gap-4">
              {payments.map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-lg">
                          {payment.amount.toLocaleString()} ₽
                        </p>
                        <p className="text-gray-600">{payment.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        {getPaymentStatusBadge(payment.status)}
                        {payment.status === "pending" && (
                          <Button className="mt-2" size="sm">
                            Оплатить
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <h2 className="text-xl font-semibold">Сообщения</h2>

            <Card>
              <CardContent className="p-6 text-center">
                <Icon
                  name="MessageCircle"
                  className="h-12 w-12 text-gray-400 mx-auto mb-4"
                />
                <p className="text-gray-600 mb-4">У вас пока нет сообщений</p>
                <Button>
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Написать юристу
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;
