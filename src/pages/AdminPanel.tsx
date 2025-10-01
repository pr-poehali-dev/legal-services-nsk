import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  description: string;
  author: string;
  category: string;
  image_url: string;
  video_url: string;
  thumbnail_url: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

const API_URL = 'https://functions.poehali.dev/1d4361c6-c539-45fe-b3bd-af4b53bce6c9';

const AdminPanel = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    description: '',
    author: 'Администратор',
    category: 'Новости',
    image_url: '',
    video_url: '',
    thumbnail_url: '',
    published: false
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch(`${API_URL}?published=false`);
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Ошибка загрузки постов');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingPost ? API_URL : API_URL;
      const method = editingPost ? 'PUT' : 'POST';
      const body = editingPost 
        ? { ...formData, id: editingPost.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        toast.success(editingPost ? 'Пост обновлен' : 'Пост создан');
        resetForm();
        loadPosts();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Ошибка сохранения');
      }
    } catch (error) {
      toast.error('Ошибка сохранения поста');
      console.error(error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      description: post.description || '',
      author: post.author || 'Администратор',
      category: post.category || 'Новости',
      image_url: post.image_url || '',
      video_url: post.video_url || '',
      thumbnail_url: post.thumbnail_url || '',
      published: post.published
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот пост?')) return;

    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Пост удален');
        loadPosts();
      } else {
        toast.error('Ошибка удаления');
      }
    } catch (error) {
      toast.error('Ошибка удаления поста');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      description: '',
      author: 'Администратор',
      category: 'Новости',
      image_url: '',
      video_url: '',
      thumbnail_url: '',
      published: false
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const generateSlug = (title: string) => {
    const translitMap: { [key: string]: string } = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
      'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
      'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
      'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
      'я': 'ya'
    };
    
    return title
      .toLowerCase()
      .split('')
      .map(char => translitMap[char] || char)
      .join('')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Панель управления блогом</h1>
          <p className="text-muted-foreground">
            RSS-лента доступна по адресу: <a href="https://functions.poehali.dev/627660df-b4e0-49ad-ada6-176876eafbba" target="_blank" rel="noopener" className="text-primary underline">https://functions.poehali.dev/627660df-b4e0-49ad-ada6-176876eafbba</a>
          </p>
        </div>

        <div className="mb-6">
          <Button onClick={() => setShowForm(!showForm)}>
            <Icon name={showForm ? "X" : "Plus"} className="h-4 w-4 mr-2" />
            {showForm ? 'Отменить' : 'Создать пост'}
          </Button>
        </div>

        {showForm && (
          <div className="bg-card p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {editingPost ? 'Редактировать пост' : 'Новый пост'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Заголовок</label>
                <Input
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (!editingPost) {
                      setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                    }
                  }}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Slug (URL)</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Краткое описание</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Содержание</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Автор</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Категория</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">URL изображения</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">URL видео (для RSS)</label>
                <Input
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://example.com/video.mp4"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">URL миниатюры (для RSS)</label>
                <Input
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="published" className="font-medium cursor-pointer">
                  Опубликовать
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  <Icon name="Save" className="h-4 w-4 mr-2" />
                  {editingPost ? 'Обновить' : 'Создать'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Отмена
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Все посты</h2>
          
          {posts.length === 0 ? (
            <p className="text-muted-foreground">Постов пока нет</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-card p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Slug: {post.slug} | Автор: {post.author} | Категория: {post.category}
                      </p>
                      {post.description && (
                        <p className="text-muted-foreground mb-2">{post.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`px-2 py-1 rounded ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {post.published ? 'Опубликован' : 'Черновик'}
                        </span>
                        <span>Создан: {new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                        <Icon name="Edit" className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                        <Icon name="Trash2" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
