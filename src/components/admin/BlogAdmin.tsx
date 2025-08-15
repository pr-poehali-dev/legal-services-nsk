import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useBlog, type BlogPost } from '@/contexts/BlogContext';
import { toast } from 'sonner';

const BlogAdmin = () => {
  const { posts, categories, addPost, updatePost, deletePost } = useBlog();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: '',
    tags: '',
    image: '',
    videoUrl: '',
    isPublished: false,
    readTime: 1
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      author: '',
      category: '',
      tags: '',
      image: '',
      videoUrl: '',
      isPublished: false,
      readTime: 1
    });
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      category: post.category,
      tags: post.tags.join(', '),
      image: post.image || '',
      videoUrl: post.videoUrl || '',
      isPublished: post.isPublished,
      readTime: post.readTime
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.excerpt.trim()) {
      toast.error('Заполните обязательные поля');
      return;
    }
    
    const postData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      excerpt: formData.excerpt.trim(),
      author: formData.author.trim() || 'Юрист ЮрСервис',
      category: formData.category || 'Общее',
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      image: formData.image.trim() || undefined,
      videoUrl: formData.videoUrl.trim() || undefined,
      isPublished: formData.isPublished,
      readTime: formData.readTime,
      publishDate: editingPost ? editingPost.publishDate : new Date().toISOString().split('T')[0]
    };

    try {
      if (editingPost) {
        updatePost(editingPost.id, postData);
        toast.success('Статья успешно обновлена!');
      } else {
        addPost(postData);
        toast.success('Новая статья создана!');
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Ошибка при сохранении статьи');
    }
  };

  const handleDelete = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (confirm(`Вы уверены, что хотите удалить статью "${post?.title}"?`)) {
      try {
        deletePost(id);
        toast.success('Статья удалена!');
      } catch (error) {
        toast.error('Ошибка при удалении статьи');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Управление блогом</h1>
          <p className="text-muted-foreground">Создавайте и редактируйте статьи для правового блога</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="bg-primary hover:bg-primary/90 text-white">
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Новая статья
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? 'Редактировать статью' : 'Создать новую статью'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Заголовок *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Введите заголовок статьи"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Автор *</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="ФИО автора"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Краткое описание *</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Краткое описание статьи для превью"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Содержание статьи *</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Полный текст статьи (поддерживается Markdown)"
                  rows={10}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Категория *</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== 'Все категории').map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Время чтения (мин)</label>
                  <Input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: parseInt(e.target.value) || 1 }))}
                    min="1"
                    max="60"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Статус</label>
                  <Select
                    value={formData.isPublished ? 'published' : 'draft'}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, isPublished: value === 'published' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Черновик</SelectItem>
                      <SelectItem value="published">Опубликовано</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Теги</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="тег1, тег2, тег3"
                />
                <p className="text-xs text-muted-foreground">Разделяйте теги запятыми</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL изображения</label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">URL видео (YouTube)</label>
                  <Input
                    value={formData.videoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Отмена
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                  {editingPost ? 'Сохранить изменения' : 'Создать статью'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Icon name="FileText" className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Всего статей</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Icon name="Eye" className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Опубликовано</p>
                <p className="text-2xl font-bold">{posts.filter(p => p.isPublished).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Icon name="Edit" className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Черновики</p>
                <p className="text-2xl font-bold">{posts.filter(p => !p.isPublished).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Просмотры</p>
                <p className="text-2xl font-bold">{posts.reduce((sum, post) => sum + post.views, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Все статьи</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="FileText" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Пока нет статей. Создайте первую!</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{post.title}</h3>
                      <Badge variant={post.isPublished ? "default" : "secondary"}>
                        {post.isPublished ? 'Опубликовано' : 'Черновик'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        ID: {post.id}
                      </Badge>
                      {post.videoUrl && (
                        <Badge variant="outline" className="text-xs">
                          <Icon name="Video" className="h-3 w-3 mr-1" />
                          Видео
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{formatDate(post.publishDate)}</span>
                      <span>•</span>
                      <span>{post.views} просмотров</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(post)}
                    >
                      <Icon name="Edit" className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Icon name="Trash2" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogAdmin;