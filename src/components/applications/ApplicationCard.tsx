
import React from 'react';
import { Application } from '@/types';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="app-card h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative aspect-video w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent z-10" />
          <img 
            src={application.imageUrl} 
            alt={application.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <h3 className="text-lg font-semibold mb-2 text-brand-dark">{application.name}</h3>
          <p className="text-sm text-brand-gray mb-4 flex-grow">{application.description}</p>
          <a 
            href={application.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-brand-blue hover:underline"
          >
            View Application
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </Card>
    </motion.div>
  );
};

export default ApplicationCard;
