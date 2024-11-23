import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, MapPin, Clock } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  postedDate: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Patent Attorney',
    company: 'Tech IP Law Firm',
    location: 'Tokyo, Japan',
    type: 'Full-time',
    description: 'Seeking experienced patent attorney for technology patents...',
    postedDate: '2024-03-15'
  },
  {
    id: 2,
    title: 'IP Specialist',
    company: 'Global Tech Corp',
    location: 'Osaka, Japan',
    type: 'Full-time',
    description: 'Managing intellectual property portfolio for tech company...',
    postedDate: '2024-03-14'
  }
];

export function JobBoardPage() {
  const { language } = useLanguage();

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">
        {language === 'ja' ? '求人情報' : 'Job Board'}
      </h1>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {job.type}
              </span>
            </div>

            <div className="flex items-center gap-6 text-gray-500 text-sm mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.company}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.postedDate}
              </div>
            </div>

            <p className="text-gray-600 mb-4">{job.description}</p>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              {language === 'ja' ? '応募する' : 'Apply Now'}
            </button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}