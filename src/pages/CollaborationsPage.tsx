import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

interface Collaboration {
  id: number;
  title: string;
  partner: string;
  description: string;
  image: string;
  year: string;
  outcomes: string[];
}

const collaborations: Collaboration[] = [
  {
    id: 1,
    title: 'Sustainable Fashion Initiative',
    partner: 'Eco Fashion Brand',
    description: 'A collaborative project to develop sustainable textile solutions...',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    year: '2024',
    outcomes: [
      'Development of eco-friendly dyeing process',
      'Reduced water consumption by 50%',
      'Implementation in commercial production'
    ]
  },
  {
    id: 2,
    title: 'Smart Textiles Research',
    partner: 'Technical University',
    description: 'Joint research project on integrating sensors into fabrics...',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80',
    year: '2023',
    outcomes: [
      'Patent filing for new sensor integration method',
      'Published research paper',
      'Prototype development'
    ]
  }
];

export function CollaborationsPage() {
  const { language } = useLanguage();

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">
        {language === 'ja' ? 'コラボレーション' : 'Collaborations'}
      </h1>

      <div className="grid grid-cols-1 gap-8">
        {collaborations.map((collab) => (
          <div key={collab.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={collab.image}
                  alt={collab.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{collab.title}</h2>
                    <p className="text-gray-600">
                      {language === 'ja' ? 'パートナー' : 'Partner'}: {collab.partner}
                    </p>
                    <p className="text-gray-600">
                      {language === 'ja' ? '年' : 'Year'}: {collab.year}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{collab.description}</p>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">
                    {language === 'ja' ? '成果' : 'Outcomes'}
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {collab.outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}