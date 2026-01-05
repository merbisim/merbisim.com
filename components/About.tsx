'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { slideLeft, slideRight, staggerContainer, staggerItem } from '@/lib/animations';

export function About() {
  const t = useTranslations('about');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: '4+', label: t('yearsExperience') },
    { value: '20+', label: t('projectsCompleted') },
    { value: '10+', label: t('expertise') },
  ];

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900/50">
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

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <motion.div variants={slideLeft} className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/profile.jpg"
                  alt="Mehmet Erbişim"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* Bio */}
            <motion.div variants={slideRight} className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('bio')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <motion.div variants={staggerItem} className="card">
              <h3 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white flex items-center">
                <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                {t('education')}
              </h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {t('educationDetails')}
              </div>
            </motion.div>

            {/* Employment */}
            <motion.div variants={staggerItem} className="card">
              <h3 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white flex items-center">
                <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('employment')}
              </h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {t('employmentDetails')}
              </div>
            </motion.div>

            {/* Patent */}
            <motion.div variants={staggerItem} className="card">
              <h3 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white flex items-center">
                <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                {t('patent')}
              </h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="font-medium">{t('patentTitle')}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('patentNumber')}</p>
              </div>
            </motion.div>

            {/* Publications */}
            <motion.div variants={staggerItem} className="card">
              <h3 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white flex items-center">
                <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {t('publications')}
              </h3>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                <p>{t('publicationsCount')}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
