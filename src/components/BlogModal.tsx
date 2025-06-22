import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content?: string;
}

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal = ({ post, isOpen, onClose }: BlogModalProps) => {
  if (!post) return null;

  const fullContent = {
    "Новые изменения в трудовом законодательстве 2024": `
      <h3>Основные изменения</h3>
      <p>В 2024 году в трудовое законодательство внесены существенные изменения, которые коснутся как работодателей, так и сотрудников. Рассмотрим ключевые нововведения.</p>
      
      <h3>Изменения в оплате труда</h3>
      <p>Установлены новые правила индексации заработной платы. Работодатели обязаны проводить индексацию не реже одного раза в год с учетом роста потребительских цен.</p>
      
      <h3>Дистанционная работа</h3>
      <p>Уточнены правила оформления дистанционной работы. Теперь работодатель должен обеспечить работника необходимым оборудованием или компенсировать его использование.</p>
      
      <h3>Что нужно делать работодателям</h3>
      <ul>
        <li>Пересмотреть локальные нормативные акты</li>
        <li>Обновить трудовые договоры</li>
        <li>Провести индексацию заработной платы</li>
        <li>Уведомить сотрудников об изменениях</li>
      </ul>
    `,
    "Как правильно оформить увольнение по соглашению сторон": `
      <h3>Преимущества увольнения по соглашению сторон</h3>
      <p>Увольнение по соглашению сторон — это взаимовыгодный способ прекращения трудовых отношений, который позволяет избежать конфликтов и судебных разбирательств.</p>
      
      <h3>Пошаговая инструкция</h3>
      <ol>
        <li><strong>Инициатива:</strong> Любая из сторон может предложить расторжение договора</li>
        <li><strong>Переговоры:</strong> Обсуждение условий увольнения</li>
        <li><strong>Соглашение:</strong> Составление письменного соглашения</li>
        <li><strong>Приказ:</strong> Издание приказа об увольнении</li>
        <li><strong>Расчет:</strong> Выплата всех положенных сумм</li>
      </ol>
      
      <h3>Важные нюансы</h3>
      <p>В соглашении можно предусмотреть выплату компенсации сверх установленной законом, а также особые условия передачи дел и соблюдения конфиденциальности.</p>
    `,
    "Защита прав потребителей при покупке недвижимости": `
      <h3>Основные риски при покупке недвижимости</h3>
      <p>Покупка недвижимости — это серьезная инвестиция, которая требует тщательной проверки всех документов и условий сделки.</p>
      
      <h3>Права покупателей по ДДУ</h3>
      <ul>
        <li>Право на получение квартиры в срок</li>
        <li>Право на возврат денежных средств</li>
        <li>Право на неустойку за просрочку</li>
        <li>Право на компенсацию морального вреда</li>
      </ul>
      
      <h3>Что делать при нарушении сроков</h3>
      <p>Если застройщик нарушает сроки сдачи объекта, покупатель имеет право требовать неустойку в размере 1/150 ключевой ставки ЦБ РФ за каждый день просрочки.</p>
      
      <h3>Как защитить свои права</h3>
      <ol>
        <li>Направить претензию застройщику</li>
        <li>При отказе — обратиться в суд</li>
        <li>Потребовать компенсацию и неустойку</li>
        <li>При необходимости — расторгнуть договор</li>
      </ol>
    `,
  };

  const content =
    fullContent[post.title as keyof typeof fullContent] ||
    `
    <p>${post.excerpt}</p>
    <p>Полный текст статьи будет доступен в ближайшее время. Следите за обновлениями в нашем блоге.</p>
  `;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          <DialogTitle className="text-2xl leading-tight">
            {post.title}
          </DialogTitle>
        </DialogHeader>

        <div className="prose prose-slate max-w-none">
          <div
            className="space-y-4 text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Icon name="Share2" className="h-4 w-4 mr-2" />
              Поделиться
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Bookmark" className="h-4 w-4 mr-2" />
              Сохранить
            </Button>
          </div>
          <Button onClick={onClose}>Закрыть</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
