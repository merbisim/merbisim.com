'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Project slugs mapping
  const projectSlugs: { [key: number]: string } = {
    1: 'kirecburnu-istanbul',
    2: 'aman-bodrum',
    3: 'maldives-waste-to-energy',
    4: 'phaselis-ancient-harbor',
    5: 'siro-battery-factory',
    6: 'sasa-polymer-factory',
    7: 'iskenderun-bay',
    8: 'florya-ataturk-pavilion',
    9: 'benesta-center-istanbul',
    10: 'petkim-socar-rainwater',
    11: 'tcdd-railway-bridge',
    12: 'ozak-bodrum-hotel',
    13: 'hobyo-port-somalia',
    14: 'epique-island',
    15: 'guzelce-marina',
    16: 'lord-palace-cyprus',
    17: 'bagfas',
    18: 'kemerkoy',
    20: 'kusadasi-marina',
    21: 'mesa-golkoy-bodrum',
  };

  // Filter out project19 (bodrum-beach-design)
  const projectIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21];

  const projects = projectIds.map((id) => ({
    id,
    slug: projectSlugs[id],
    title: t(`project${id}.title`),
    location: t(`project${id}.location`),
    year: t(`project${id}.year`),
    category: t(`project${id}.category`),
    description: t(`project${id}.description`),
  })).sort((a, b) => {
    // Extract year for sorting (handle ranges like "2024/2025" or "2023/2024")
    const getYearValue = (yearStr: string) => {
      const years = yearStr.split('/');
      return parseInt(years[years.length - 1]); // Use the latest year
    };
    return getYearValue(b.year) - getYearValue(a.year); // Newest first
  });

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Title */}
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl font-bold font-display gradient-text mb-4 text-center"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-xl text-gray-600 dark:text-gray-400 mb-16 text-center"
          >
            20+ {t('allProjects')}
          </motion.p>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const displayNumber = index + 1; // Sequential numbering after sorting
              return (
              <Link
                key={project.id}
                href={`/${locale}/projects/${project.slug}`}
              >
                <motion.div
                  variants={staggerItem}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group card card-hover cursor-pointer relative overflow-hidden h-full"
                >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Year & Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                      {project.year}
                    </span>
                    <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Number */}
                  <div className="text-5xl font-bold text-gray-200 dark:text-gray-800 mb-2 font-display">
                    {String(displayNumber).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-display mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{project.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {/* View Details Link */}
                  <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold text-sm group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    <span>{t('viewDetails')}</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </motion.div>
              </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
