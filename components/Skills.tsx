'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function Skills() {
  const t = useTranslations('skills');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [showAllTechnical, setShowAllTechnical] = useState(false);
  const [showAllSoftware, setShowAllSoftware] = useState(false);
  const [showAllExpertise, setShowAllExpertise] = useState(false);

  // Get skills from translations
  const allTechnicalSkills = t.raw('technicalSkills') as string[];
  const allSoftware = t.raw('softwareTools') as string[];
  const allExpertise = t.raw('expertiseAreas') as string[];

  const visibleTechnicalSkills = showAllTechnical ? allTechnicalSkills : allTechnicalSkills.slice(0, 5);
  const visibleSoftware = showAllSoftware ? allSoftware : allSoftware.slice(0, 5);
  const visibleExpertise = showAllExpertise ? allExpertise : allExpertise.slice(0, 5);

  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
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
            className="text-4xl md:text-5xl font-bold font-display gradient-text mb-16 text-center"
          >
            {t('title')}
          </motion.h2>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Technical Skills */}
            <motion.div variants={staggerItem} className="card flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 gradient-bg-red-blue rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  {t('technical')}
                </h3>
              </div>
              <div className="space-y-3 mb-4">
                {visibleTechnicalSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0" />
                    <span className="text-sm">{skill}</span>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => setShowAllTechnical(!showAllTechnical)}
                className="w-full px-4 py-2 gradient-bg-red-blue text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
              >
                <span>{showAllTechnical ? t('showLess') : t('showMore')}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${showAllTechnical ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>

            {/* Software & Tools */}
            <motion.div variants={staggerItem} className="card flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 gradient-bg-blue-red rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  {t('software')}
                </h3>
              </div>
              <div className="space-y-3 mb-4">
                {visibleSoftware.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-900/20 transition-colors"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0" />
                    <span className="text-sm">{skill}</span>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => setShowAllSoftware(!showAllSoftware)}
                className="w-full px-4 py-2 gradient-bg-red-blue text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
              >
                <span>{showAllSoftware ? t('showLess') : t('showMore')}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${showAllSoftware ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>

            {/* Expertise */}
            <motion.div variants={staggerItem} className="card flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 gradient-bg-red-blue rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  {t('expertise')}
                </h3>
              </div>
              <div className="space-y-3 mb-4">
                {visibleExpertise.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0" />
                    <span className="text-sm">{skill}</span>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => setShowAllExpertise(!showAllExpertise)}
                className="w-full px-4 py-2 gradient-bg-red-blue text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
              >
                <span>{showAllExpertise ? t('showLess') : t('showMore')}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${showAllExpertise ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
