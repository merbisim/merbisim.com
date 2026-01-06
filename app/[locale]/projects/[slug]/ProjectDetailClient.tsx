'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectDetailClientProps {
  project: {
    title: string;
    images: string[];
  };
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleClose = () => {
    setSelectedImage(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (selectedImage) {
      e.preventDefault();
      const delta = e.deltaY * -0.01;
      const newZoom = Math.min(Math.max(1, zoom + delta), 5);
      setZoom(newZoom);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (selectedImage && zoom > 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
      setPosition({ x, y });
    }
  };

  if (project.images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-12">
        {project.images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image}
              alt={`${project.title} - Image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 25vw, 16vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={handleClose}
            onWheel={handleWheel}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom(Math.min(zoom + 0.5, 5));
                }}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom(Math.max(zoom - 0.5, 1));
                }}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-white text-sm px-2">{Math.round(zoom * 100)}%</span>
            </div>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              onMouseMove={handleMouseMove}
            >
              <div
                className="relative w-full h-full"
                style={{
                  transform: `scale(${zoom}) translate(${position.x}%, ${position.y}%)`,
                  transformOrigin: 'center center',
                  transition: zoom === 1 ? 'transform 0.3s' : 'none',
                }}
              >
                <Image
                  src={selectedImage}
                  alt={project.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = project.images.indexOf(selectedImage);
                    const prevIndex = currentIndex === 0 ? project.images.length - 1 : currentIndex - 1;
                    setSelectedImage(project.images[prevIndex]);
                    setZoom(1);
                    setPosition({ x: 0, y: 0 });
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = project.images.indexOf(selectedImage);
                    const nextIndex = currentIndex === project.images.length - 1 ? 0 : currentIndex + 1;
                    setSelectedImage(project.images[nextIndex]);
                    setZoom(1);
                    setPosition({ x: 0, y: 0 });
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

