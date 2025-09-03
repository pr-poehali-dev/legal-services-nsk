import React from 'react';

const AchievementsSection = () => {
  const achievements = [
    { number: "2500+", text: "выигранных дел по ДТП" },
    { number: "15 лет", text: "опыта в автоправе" },
    { number: "94%", text: "успешных взысканий" },
    { number: "24/7", text: "поддержка клиентов" },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">
          НАШИ РЕЗУЛЬТАТЫ ГОВОРЯТ САМИ ЗА СЕБЯ
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <div key={index} className="text-center bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg border">
              <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">
                {item.number}
              </div>
              <div className="text-gray-600 font-medium">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;