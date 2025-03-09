
import React, { useState, useEffect } from 'react';
import { getApplications } from '@/services/applicationService';
import { Application } from '@/types';
import MainLayout from '@/components/layout/MainLayout';
import ApplicationCard from '@/components/applications/ApplicationCard';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for smoother animation
    const timer = setTimeout(() => {
      setApplications(getApplications());
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <MainLayout>
      <section className="py-8 md:py-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-brand-dark">
              Tech Tools Reference Hub
            </h1>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto">
              A curated collection of powerful tools and applications for developers and tech enthusiasts.
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg p-4 h-64 animate-pulse">
                <div className="bg-gray-200 w-full h-32 rounded-lg mb-4"></div>
                <div className="bg-gray-200 w-2/3 h-5 rounded mb-2"></div>
                <div className="bg-gray-200 w-full h-10 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {applications.map(app => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </motion.div>
        )}
      </section>
    </MainLayout>
  );
};

export default HomePage;
