import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { featuredProjects } from '../data/featuredProjects';

export function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const project = featuredProjects.find(p => p.slug === slug);

  if (!project) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ja' ? 'プロジェクトが見つかりません' : 'Project Not Found'}
          </h1>
          <button
            onClick={() => navigate('/browse-work')}
            className="text-blue-500 hover:text-blue-600"
          >
            {language === 'ja' ? '作品一覧に戻る' : 'Back to Browse Work'}
          </button>
        </div>
      </PageLayout>
    );
  }

  const adminUrl = import.meta.env.VITE_WORDPRESS_ADMIN_URL || 'https://admin.chizaizukan.com/wp-admin';
  const editUrl = project.wordpressId ? `${adminUrl}/post.php?post=${project.wordpressId}&action=edit` : undefined;

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {language === 'ja' ? '戻る' : 'Back'}
        </button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[500px] object-cover"
            />
            {editUrl && (
              <a
                href={editUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full text-gray-600 hover:text-gray-900"
                title={language === 'ja' ? 'WordPressで編集' : 'Edit in WordPress'}
              >
                <ExternalLink className="w-4 h-4" />
                {language === 'ja' ? '編集' : 'Edit'}
              </a>
            )}
          </div>

          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-8">
                {project.fullDescription || project.description}
              </p>

              {project.client && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {language === 'ja' ? 'クライアント' : 'Client'}
                  </h2>
                  <p className="text-gray-600">{project.client}</p>
                </div>
              )}

              {project.materials && project.materials.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {language === 'ja' ? '使用素材' : 'Materials'}
                  </h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {project.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.techniques && project.techniques.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {language === 'ja' ? '技法' : 'Techniques'}
                  </h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {project.techniques.map((technique, index) => (
                      <li key={index}>{technique}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {language === 'ja' ? 'ギャラリー' : 'Gallery'}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
}