import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { downloadSitemap } from '@/utils/generateSitemap';

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
  seo_title?: string;
  seo_description?: string;
  seo_h1?: string;
}

const API_URL = 'https://functions.poehali.dev/5f51a5f5-c821-46dc-80eb-996d07934d5a';

export default function BlogManager() {
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
    published: false,
    seo_title: '',
    seo_description: '',
    seo_h1: ''
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error('Ошибка загрузки постов');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const method = editingPost ? 'PUT' : 'POST';
      const body = editingPost 
        ? { ...formData, id: editingPost.id }
        : formData;
      
      const response = await fetch(API_URL, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success(editingPost ? 'Пост обновлён' : 'Пост создан');
        loadPosts();
        resetForm();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Ошибка сохранения');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Ошибка сохранения');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      description: post.description,
      author: post.author,
      category: post.category,
      image_url: post.image_url,
      video_url: post.video_url,
      thumbnail_url: post.thumbnail_url,
      published: post.published,
      seo_title: post.seo_title || '',
      seo_description: post.seo_description || '',
      seo_h1: post.seo_h1 || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Снять с публикации этот пост?')) return;
    
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Пост снят с публикации');
        loadPosts();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Ошибка удаления');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Ошибка удаления');
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
      published: false,
      seo_title: '',
      seo_description: '',
      seo_h1: ''
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
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Управление блогом</h2>
          <p className="text-sm text-muted-foreground mt-1">
            RSS: <a href="https://functions.poehali.dev/23ab26b5-f1a2-4b59-9c6d-dae8bfb8be0f" target="_blank" rel="noopener" className="text-primary underline">feed</a>
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={async () => {
              try {
                await downloadSitemap();
                toast.success('Sitemap.xml скачан! Загрузите его в корень сайта');
              } catch (error) {
                toast.error('Ошибка генерации sitemap');
              }
            }}
          >
            <Icon name="Download" className="h-4 w-4 mr-2" />
            Скачать Sitemap
          </Button>
          <Button onClick={() => setShowForm(!showForm)}>
            <Icon name={showForm ? "X" : "Plus"} className="h-4 w-4 mr-2" />
            {showForm ? 'Отменить' : 'Создать пост'}
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPost ? 'Редактировать пост' : 'Новый пост'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Заголовок</label>
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
                <label className="block text-sm font-medium mb-1">Slug</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Описание</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Содержимое</label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      [{ 'font': [] }],
                      [{ 'size': ['small', false, 'large', 'huge'] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'color': [] }, { 'background': [] }],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      [{ 'indent': '-1'}, { 'indent': '+1' }],
                      [{ 'align': [] }],
                      ['link', 'image', 'video'],
                      ['clean']
                    ]
                  }}
                  className="bg-white rounded-md border"
                  style={{ minHeight: '300px' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Автор</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Категория</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL изображения</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Search" className="h-4 w-4" />
                  SEO настройки
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      H1 заголовок <span className="text-xs text-muted-foreground">(рекомендуется 30-60 символов)</span>
                    </label>
                    <Input
                      value={formData.seo_h1}
                      onChange={(e) => setFormData({ ...formData, seo_h1: e.target.value })}
                      placeholder="Если не указан, используется заголовок статьи"
                      maxLength={80}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{formData.seo_h1.length}/80 символов</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title (название в поиске) <span className="text-xs text-muted-foreground">(рекомендуется 50-60 символов)</span>
                    </label>
                    <Input
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      placeholder="Если не указан, используется заголовок статьи"
                      maxLength={70}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{formData.seo_title.length}/70 символов</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description (описание в поиске) <span className="text-xs text-muted-foreground">(рекомендуется 120-160 символов)</span>
                    </label>
                    <Textarea
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      placeholder="Если не указано, используется краткое описание"
                      rows={3}
                      maxLength={200}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{formData.seo_description.length}/200 символов</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
                <label htmlFor="published" className="text-sm font-medium">Опубликовать</label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  <Icon name="Save" className="h-4 w-4 mr-2" />
                  Сохранить
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    {post.published ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Опубликован</span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Черновик</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{post.description}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Автор: {post.author}</span>
                    <span>Категория: {post.category}</span>
                    <span>Создан: {new Date(post.created_at).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                    <Icon name="Edit" className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                    <Icon name="Trash2" className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Постов пока нет</p>
        </div>
      )}
    </div>
  );
}