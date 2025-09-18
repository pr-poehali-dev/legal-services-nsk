import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'lawyer' | 'admin';
  created_at: string;
  is_active: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  views: number;
  created_at: string;
  author: string;
}

interface Case {
  id: string;
  title: string;
  client_name: string;
  lawyer_name?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Анна Иванова',
      email: 'anna@example.com',
      role: 'client',
      created_at: '2024-01-15',
      is_active: true
    },
    {
      id: '2',
      name: 'Михаил Петров',
      email: 'mikhail@example.com',
      role: 'lawyer',
      created_at: '2024-01-10',
      is_active: true
    },
    {
      id: '3',
      name: 'Елена Сидорова',
      email: 'elena@example.com',
      role: 'admin',
      created_at: '2024-01-01',
      is_active: true
    }
  ]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Как правильно оформить развод',
      slug: 'kak-pravilno-oformit-razvod',
      excerpt: 'Подробное руководство по оформлению развода через суд и ЗАГС',
      published: true,
      views: 1250,
      created_at: '2024-01-20',
      author: 'Михаил Петров'
    },
    {
      id: '2',
      title: 'Трудовые права работника',
      slug: 'trudovye-prava-rabotnika',
      excerpt: 'Основные права работника и способы их защиты',
      published: true,
      views: 892,
      created_at: '2024-01-18',
      author: 'Ольга Морозова'
    },
    {
      id: '3',
      title: 'Наследование по закону и по завещанию',
      slug: 'nasledovanie-po-zakonu',
      excerpt: 'Разбираем различия между наследованием по закону и по завещанию',
      published: false,
      views: 0,
      created_at: '2024-01-22',
      author: 'Михаил Петров'
    }
  ]);

  const [cases] = useState<Case[]>([
    {
      id: '1',
      title: 'Развод и раздел имущества',
      client_name: 'Анна Иванова',
      lawyer_name: 'Михаил Петров',
      status: 'in_progress',
      priority: 'high',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      title: 'Трудовой спор',
      client_name: 'Дмитрий Козлов',
      status: 'pending',
      priority: 'medium',
      created_at: '2024-01-20'
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    published: false
  });

  const handlePublishPost = (postId: string) => {
    setBlogPosts(posts => 
      posts.map(post => 
        post.id === postId ? { ...post, published: !post.published } : post
      )
    );
  };

  const handleCreatePost = () => {
    const slug = newPost.title.toLowerCase()
      .replace(/[^a-zа-я0-9\s]/gi, '')
      .replace(/\s+/g, '-');
    
    const post: BlogPost = {
      id: String(blogPosts.length + 1),
      title: newPost.title,
      slug: slug,
      excerpt: newPost.excerpt,
      published: newPost.published,
      views: 0,
      created_at: new Date().toISOString().split('T')[0],
      author: 'Администратор'
    };

    setBlogPosts(posts => [post, ...posts]);
    setNewPost({ title: '', excerpt: '', content: '', published: false });
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'client': return 'Клиент';
      case 'lawyer': return 'Юрист';
      case 'admin': return 'Администратор';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'client': return 'bg-blue-500';
      case 'lawyer': return 'bg-green-500';
      case 'admin': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Админ-панель</h1>
          <p className="text-gray-600">Управление системой, пользователями и контентом</p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего пользователей</p>
                  <p className="text-3xl font-bold text-purple-600">{users.length}</p>
                </div>
                <Icon name="Users" className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Клиенты</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {users.filter(u => u.role === 'client').length}
                  </p>
                </div>
                <Icon name="User" className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Юристы</p>
                  <p className="text-3xl font-bold text-green-600">
                    {users.filter(u => u.role === 'lawyer').length}
                  </p>
                </div>
                <Icon name="Briefcase" className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Статьи в блоге</p>
                  <p className="text-3xl font-bold text-orange-600">{blogPosts.length}</p>
                </div>
                <Icon name="FileText" className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Активные дела</p>
                  <p className="text-3xl font-bold text-red-600">
                    {cases.filter(c => c.status === 'in_progress').length}
                  </p>
                </div>
                <Icon name="Scale" className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Основное содержимое */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="blog">Блог</TabsTrigger>
            <TabsTrigger value="cases">Дела</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Управление пользователями</h2>
                <Button>
                  <Icon name="UserPlus" className="h-4 w-4 mr-2" />
                  Добавить пользователя
                </Button>
              </div>

              <div className="grid gap-4">
                {users.map((user) => (
                  <Card key={user.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Icon name="User" className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-sm text-gray-500">
                              Регистрация: {new Date(user.created_at).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={`${getRoleColor(user.role)} text-white`}>
                            {getRoleText(user.role)}
                          </Badge>
                          <Badge className={user.is_active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
                            {user.is_active ? 'Активен' : 'Заблокирован'}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Icon name="Edit" className="h-4 w-4 mr-2" />
                              Редактировать
                            </Button>
                            <Button variant="outline" size="sm">
                              <Icon name="Ban" className="h-4 w-4 mr-2" />
                              {user.is_active ? 'Заблокировать' : 'Разблокировать'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Управление блогом</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" className="h-4 w-4 mr-2" />
                      Создать статью
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Создать новую статью</DialogTitle>
                      <DialogDescription>
                        Заполните информацию для новой статьи блога
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label htmlFor="title">Заголовок</label>
                        <Input
                          id="title"
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                          placeholder="Введите заголовок статьи"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="excerpt">Краткое описание</label>
                        <Input
                          id="excerpt"
                          value={newPost.excerpt}
                          onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                          placeholder="Краткое описание статьи"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="content">Содержание</label>
                        <Textarea
                          id="content"
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          placeholder="Содержание статьи..."
                          rows={6}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="published"
                          checked={newPost.published}
                          onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
                        />
                        <label htmlFor="published">Опубликовать сразу</label>
                      </div>
                      <Button onClick={handleCreatePost} className="w-full">
                        Создать статью
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                            <Badge className={post.published ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                              {post.published ? 'Опубликовано' : 'Черновик'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Автор: {post.author}</span>
                            <span>Создано: {new Date(post.created_at).toLocaleDateString('ru-RU')}</span>
                            <span className="flex items-center gap-1">
                              <Icon name="Eye" className="h-4 w-4" />
                              {post.views} просмотров
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" className="h-4 w-4 mr-2" />
                            Редактировать
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePublishPost(post.id)}
                          >
                            <Icon name={post.published ? "EyeOff" : "Eye"} className="h-4 w-4 mr-2" />
                            {post.published ? 'Скрыть' : 'Опубликовать'}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Trash2" className="h-4 w-4 mr-2" />
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cases">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Управление делами</h2>
                <Button>
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Создать дело
                </Button>
              </div>

              <div className="grid gap-4">
                {cases.map((case_item) => (
                  <Card key={case_item.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{case_item.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                            <span>Клиент: {case_item.client_name}</span>
                            {case_item.lawyer_name && (
                              <span>Юрист: {case_item.lawyer_name}</span>
                            )}
                            <span>Создано: {new Date(case_item.created_at).toLocaleDateString('ru-RU')}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" className="h-4 w-4 mr-2" />
                            Подробнее
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="UserPlus" className="h-4 w-4 mr-2" />
                            Назначить юриста
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки системы</CardTitle>
                <CardDescription>
                  Общие настройки платформы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Email настройки</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Icon name="Mail" className="h-4 w-4 mr-2" />
                          Настроить SMTP
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Icon name="Bell" className="h-4 w-4 mr-2" />
                          Шаблоны уведомлений
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Резервное копирование</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Icon name="Download" className="h-4 w-4 mr-2" />
                          Создать резервную копию
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Icon name="Upload" className="h-4 w-4 mr-2" />
                          Восстановить из копии
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Безопасность</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Icon name="Shield" className="h-4 w-4 mr-2" />
                          Настройки паролей
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Icon name="Activity" className="h-4 w-4 mr-2" />
                          Журнал активности
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Интеграции</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Icon name="Link" className="h-4 w-4 mr-2" />
                          Внешние API
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Icon name="Database" className="h-4 w-4 mr-2" />
                          База данных
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;