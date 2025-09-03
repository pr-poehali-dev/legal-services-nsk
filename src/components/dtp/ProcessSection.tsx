import React from 'react';

const ProcessSection = () => {
  const processSteps = [
    {
      step: "01",
      title: "КОНСУЛЬТАЦИЯ",
      desc: "Анализируем документы и оцениваем перспективы дела",
    },
    {
      step: "02",
      title: "ДОСУДЕБНАЯ РАБОТА",
      desc: "Направляем претензии и ведем переговоры",
    },
    {
      step: "03",
      title: "СУДЕБНОЕ ВЗЫСКАНИЕ",
      desc: "Подаем иск и представляем интересы в суде",
    },
    {
      step: "04",
      title: "ПОЛУЧЕНИЕ ДЕНЕГ",
      desc: "Контролируем исполнение решения суда",
    },
  ];

  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          КАК МЫ РАБОТАЕМ
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {processSteps.map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-blue-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;