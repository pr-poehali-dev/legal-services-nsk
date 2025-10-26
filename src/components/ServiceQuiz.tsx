import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useModal } from '@/hooks/useModal';

interface QuizOption {
  id: string;
  label: string;
  icon: string;
}

interface QuizStep {
  question: string;
  options: QuizOption[];
}

interface ServiceRecommendation {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

const ServiceQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const { openModal } = useModal();

  const steps: QuizStep[] = [
    {
      question: 'С какой ситуацией вы столкнулись?',
      options: [
        { id: 'dtp', label: 'ДТП и страховые споры', icon: 'Car' },
        { id: 'family', label: 'Развод, алименты, раздел имущества', icon: 'Users' },
        { id: 'debt', label: 'Долги и кредиты', icon: 'CreditCard' },
        { id: 'work', label: 'Трудовые споры', icon: 'Briefcase' },
        { id: 'property', label: 'Недвижимость и сделки', icon: 'Home' },
        { id: 'other', label: 'Другая ситуация', icon: 'HelpCircle' },
      ],
    },
    {
      question: 'Когда это произошло?',
      options: [
        { id: 'today', label: 'Сегодня или вчера', icon: 'AlertCircle' },
        { id: 'week', label: 'На этой неделе', icon: 'Calendar' },
        { id: 'month', label: 'В этом месяце', icon: 'CalendarDays' },
        { id: 'long', label: 'Давно, но нужно решить', icon: 'Clock' },
      ],
    },
    {
      question: 'Что вам нужно?',
      options: [
        { id: 'money', label: 'Получить деньги (компенсация, выплаты)', icon: 'Wallet' },
        { id: 'defend', label: 'Защититься (суд, претензии)', icon: 'Shield' },
        { id: 'docs', label: 'Оформить документы', icon: 'FileText' },
        { id: 'consult', label: 'Просто узнать, что делать', icon: 'MessageCircle' },
      ],
    },
  ];

  const getRecommendation = (): ServiceRecommendation => {
    const [situation, timing, goal] = answers;

    if (situation === 'dtp') {
      return {
        title: 'Юрист по ДТП и ОСАГО',
        description: 'Поможем взыскать выплаты со страховой, защитим от лишения прав, представим интересы в суде.',
        icon: 'Car',
        benefits: [
          'Взыскание по ОСАГО и КАСКО',
          'Защита при ДТП с пострадавшими',
          'Возврат водительских прав',
          'Оценка ущерба и экспертиза',
        ],
      };
    }

    if (situation === 'family') {
      return {
        title: 'Семейный юрист',
        description: 'Решим вопросы развода, алиментов, раздела имущества. Защитим ваши интересы и интересы детей.',
        icon: 'Users',
        benefits: [
          'Развод через суд и по согласию',
          'Раздел имущества и квартир',
          'Взыскание и снижение алиментов',
          'Определение места жительства детей',
        ],
      };
    }

    if (situation === 'debt') {
      return {
        title: 'Юрист по долгам и кредитам',
        description: 'Поможем избавиться от долгов законно: банкротство, реструктуризация, защита от коллекторов.',
        icon: 'CreditCard',
        benefits: [
          'Банкротство физических лиц',
          'Защита от коллекторов',
          'Реструктуризация долгов',
          'Списание долгов по кредитам',
        ],
      };
    }

    if (situation === 'work') {
      return {
        title: 'Трудовой юрист',
        description: 'Восстановим на работе, взыщем зарплату и компенсации, оспорим незаконное увольнение.',
        icon: 'Briefcase',
        benefits: [
          'Восстановление на работе',
          'Взыскание невыплаченной зарплаты',
          'Оспаривание увольнения',
          'Трудовые споры с работодателем',
        ],
      };
    }

    if (situation === 'property') {
      return {
        title: 'Юрист по недвижимости',
        description: 'Сопровождение сделок, проверка документов, защита при мошенничестве, споры с застройщиками.',
        icon: 'Home',
        benefits: [
          'Проверка чистоты сделки',
          'Сопровождение купли-продажи',
          'Споры с застройщиками',
          'Оформление наследства',
        ],
      };
    }

    return {
      title: 'Юридическая консультация',
      description: 'Разберем вашу ситуацию, найдем решение и подскажем дальнейшие действия.',
      icon: 'Scale',
      benefits: [
        'Анализ вашей ситуации',
        'Варианты решения проблемы',
        'План действий',
        'Оценка перспектив дела',
      ],
    };
  };

  const handleAnswer = (optionId: string) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleConsultation = () => {
    openModal();
  };

  if (showResult) {
    const recommendation = getRecommendation();
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="text-center bg-primary/5">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name={recommendation.icon as any} className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">{recommendation.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-center text-muted-foreground text-lg">
            {recommendation.description}
          </p>

          <div className="grid gap-3">
            <p className="font-semibold text-sm text-muted-foreground uppercase">Чем поможем:</p>
            {recommendation.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <Icon name="CheckCircle" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
            <div className="flex items-center gap-2 text-accent font-semibold">
              <Icon name="Gift" className="h-5 w-5" />
              <span>Первая консультация БЕСПЛАТНО</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={handleConsultation}
              className="flex-1 bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Icon name="Phone" className="h-5 w-5 mr-2" />
              Получить консультацию
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              size="lg"
            >
              <Icon name="RotateCcw" className="h-5 w-5 mr-2" />
              Пройти заново
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = steps[currentStep];

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Шаг {currentStep + 1} из {steps.length}
          </span>
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {currentQuestion.options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="h-auto py-4 px-6 justify-start text-left hover:bg-primary/10 hover:border-primary transition-all"
              onClick={() => handleAnswer(option.id)}
            >
              <Icon name={option.icon as any} className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="text-base">{option.label}</span>
            </Button>
          ))}
        </div>

        {currentStep > 0 && (
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => {
              setCurrentStep(currentStep - 1);
              setAnswers(answers.slice(0, -1));
            }}
          >
            <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
            Назад
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceQuiz;
