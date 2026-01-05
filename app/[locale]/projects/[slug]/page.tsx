import { notFound } from 'next/navigation';
import { ProjectDetailClient } from './ProjectDetailClient';
import { BackButton } from './BackButton';

// Force static generation
export const dynamic = 'force-static';

// Project slugs mapping
const projectSlugs: { [key: string]: number } = {
  'kirecburnu-istanbul': 1,
  'aman-bodrum': 2,
  'maldives-waste-to-energy': 3,
  'phaselis-ancient-harbor': 4,
  'siro-battery-factory': 5,
  'sasa-polymer-factory': 6,
  'iskenderun-bay': 7,
  'florya-ataturk-pavilion': 8,
  'benesta-center-istanbul': 9,
  'petkim-socar-rainwater': 10,
  'tcdd-railway-bridge': 11,
  'ozak-bodrum-hotel': 12,
  'hobyo-port-somalia': 13,
  'epique-island': 14,
  'guzelce-marina': 15,
  'lord-palace-cyprus': 16,
  'bagfas': 17,
  'kemerkoy': 18,
  'kusadasi-marina': 20,
  'mesa-golkoy-bodrum': 21,


};

// Project images mapping
const projectImages: { [key: string]: string[] } = {
  'kirecburnu-istanbul': [
    '/projects/kirecburnu-istanbul/image-1.png',
    '/projects/kirecburnu-istanbul/image-2.png',
    '/projects/kirecburnu-istanbul/image-3.png',
  ],
  'aman-bodrum': [
    '/projects/aman-bodrum/image-1.png',
    '/projects/aman-bodrum/image-2.png',
  ],
  'maldives-waste-to-energy': [
    '/projects/maldives-waste-to-energy/image-1.png',
    '/projects/maldives-waste-to-energy/image-2.png',
    '/projects/maldives-waste-to-energy/image-3.png',
  ],
  'phaselis-ancient-harbor': [
    '/projects/phaselis-ancient-harbor/image-1.png',
    '/projects/phaselis-ancient-harbor/image-2.png',
    '/projects/phaselis-ancient-harbor/image-3.png',
  ],
  'siro-battery-factory': [
    '/projects/siro-battery-factory/image-1.png',
    '/projects/siro-battery-factory/image-2.png',
    '/projects/siro-battery-factory/image-3.png',
  ],
  'sasa-polymer-factory': [
    '/projects/sasa-polymer-factory/image-1.png',
    '/projects/sasa-polymer-factory/image-2.png',
    '/projects/sasa-polymer-factory/image-3.png',
  ],
  'iskenderun-bay': [
    '/projects/iskenderun-bay/image-1.png',
    '/projects/iskenderun-bay/image-2.png',
    '/projects/iskenderun-bay/image-3.png',
  ],
  'florya-ataturk-pavilion': [
    '/projects/florya-ataturk-pavilion/image-1.png',
    '/projects/florya-ataturk-pavilion/image-2.png',
    '/projects/florya-ataturk-pavilion/image-3.png',
    '/projects/florya-ataturk-pavilion/image-4.png',
  ],
  'benesta-center-istanbul': [
    '/projects/benesta-center-istanbul/image-1.png',
    '/projects/benesta-center-istanbul/image-2.png',
    '/projects/benesta-center-istanbul/image-3.png',
    '/projects/benesta-center-istanbul/image-4.png',
    '/projects/benesta-center-istanbul/image-5.png',
  ],
  'petkim-socar-rainwater': [
    '/projects/petkim-socar-rainwater/image-1.png',
    '/projects/petkim-socar-rainwater/image-2.png',
    '/projects/petkim-socar-rainwater/image-3.png',
  ],
  'tcdd-railway-bridge': [
    '/projects/tcdd-railway-bridge/image-1.png',
    '/projects/tcdd-railway-bridge/image-2.png',
    '/projects/tcdd-railway-bridge/image-3.png',
  ],
  'ozak-bodrum-hotel': [
    '/projects/ozak-bodrum-hotel/image-1.png',
    '/projects/ozak-bodrum-hotel/image-2.png',
    '/projects/ozak-bodrum-hotel/image-3.png',
    '/projects/ozak-bodrum-hotel/image-4.png',
  ],
  'hobyo-port-somalia': [
    '/projects/hobyo-port-somalia/image-1.png',
    '/projects/hobyo-port-somalia/image-2.png',
    '/projects/hobyo-port-somalia/image-3.png',
  ],
  'epique-island': [
    '/projects/epique-island/image-1.png',
    '/projects/epique-island/image-2.png',
    '/projects/epique-island/image-3.png',
  ],
  'guzelce-marina': [
    '/projects/guzelce-marina/image-1.png',
    '/projects/guzelce-marina/image-2.png',
    '/projects/guzelce-marina/image-3.png',
    '/projects/guzelce-marina/image-4.png',
  ],
  'lord-palace-cyprus': [
    '/projects/lord-palace-cyprus/image-1.png',
    '/projects/lord-palace-cyprus/image-2.png',
    '/projects/lord-palace-cyprus/image-3.png',
    '/projects/lord-palace-cyprus/image-4.png',
  ],
  'bagfas': [
    '/projects/bagfas/image-1.png',
    '/projects/bagfas/image-2.png',
    '/projects/bagfas/image-3.png',
    '/projects/bagfas/image-4.png',
  ],
};

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = Object.keys(projectSlugs);
  const locales = ['tr', 'en'];
  
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const projectId = projectSlugs[slug];

  if (!projectId) {
    notFound();
  }

  // Direct import of messages for static generation
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const projects = messages.projects as any;
  const projectKey = `project${projectId}` as keyof typeof projects;
  const projectData = projects[projectKey] as any;

  if (!projectData) {
    notFound();
  }

  const project = {
    title: projectData.title || '',
    location: projectData.location || '',
    year: projectData.year || '',
    category: projectData.category || '',
    description: projectData.description || '',
    images: projectImages[slug] || [],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Sticky Back Button - Desktop only */}
      <div className="hidden md:block sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container-custom py-4">
          <BackButton />
        </div>
      </div>
      
      <div className="container-custom py-12">
        {/* Back Button - Mobile only (not sticky) */}
        <div className="md:hidden mb-6">
          <BackButton />
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold">
              {project.year}
            </span>
            <span className="px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-sm font-semibold">
              {project.category}
            </span>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{project.location}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-display gradient-text mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
            {project.description}
          </p>
        </div>

        {/* Project Images - Thumbnails with Lightbox */}
        {project.images.length > 0 ? (
          <ProjectDetailClient project={project} />
        ) : (
          <div className="mb-12 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">
              {locale === 'tr' ? 'Bu proje için görseller yakında eklenecek.' : 'Images for this project will be added soon.'}
            </p>
          </div>
        )}

        {/* Project Details Card */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Project Info */}
          <div className="card">
            <h2 className="text-2xl font-bold font-display mb-6 text-gray-900 dark:text-white flex items-center">
              <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {locale === 'tr' ? 'Proje Bilgileri' : 'Project Information'}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-32 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {locale === 'tr' ? 'Proje Adı' : 'Project Name'}
                </div>
                <div className="flex-1 text-gray-900 dark:text-white">
                  {project.title}
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-32 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {locale === 'tr' ? 'Konum' : 'Location'}
                </div>
                <div className="flex-1 text-gray-900 dark:text-white">
                  {project.location}
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-32 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {locale === 'tr' ? 'Yıl' : 'Year'}
                </div>
                <div className="flex-1 text-gray-900 dark:text-white">
                  {project.year}
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-32 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {locale === 'tr' ? 'Kategori' : 'Category'}
                </div>
                <div className="flex-1">
                  <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-sm font-semibold">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="card">
            <h2 className="text-2xl font-bold font-display mb-6 text-gray-900 dark:text-white flex items-center">
              <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {locale === 'tr' ? 'Proje Özeti' : 'Project Summary'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Technologies & Expertise */}
        <div className="card">
          <h2 className="text-2xl font-bold font-display mb-6 text-gray-900 dark:text-white flex items-center">
            <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {locale === 'tr' ? 'Uzmanlık Alanları & Teknolojiler' : 'Expertise & Technologies'}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {((messages.projects as any)?.expertiseTechnologies || []).map((tech: string, index: number) => (
              <div
                key={index}
                className="flex items-center p-3 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg"
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

