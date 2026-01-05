'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { slideUp, slideDown, fadeIn } from '@/lib/animations';

export function Hero() {
  const t = useTranslations('hero');
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-primary-400/20 to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="container-custom relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideDown}
            className="mb-4"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-4">
              <span className="gradient-text">{t('name')}</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-medium">
              {t('title')}
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-2">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={{ delay: 0.4 }}
            className="mb-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <div className="absolute -left-2 -top-2 text-4xl text-primary-500/20 dark:text-primary-400/20 font-serif">
                &ldquo;
              </div>
              <p className="text-base md:text-lg italic text-gray-700 dark:text-gray-300 px-6 py-2 border-l-4 border-primary-500 bg-primary-50/50 dark:bg-primary-900/10 rounded-r-lg">
                {t('quote')}
              </p>
              <div className="absolute -right-2 -bottom-2 text-4xl text-primary-500/20 dark:text-primary-400/20 font-serif">
                &rdquo;
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection('#projects')}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {t('viewProjects')}
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {t('contact')}
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
            className="mt-16"
          >
            <button
              onClick={() => scrollToSection('#about')}
              className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Scroll down"
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
