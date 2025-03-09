
import { Application } from '@/types';

// In a real app, this would be fetched from an API
const LOCAL_STORAGE_KEY = 'applications';

// Sample initial data
const initialApplications: Application[] = [
  {
    id: '1',
    name: 'Code Generator',
    description: 'AI-powered code generation tool that creates consistent, clean code based on your requirements.',
    link: 'https://example.com/code-generator',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'API Manager',
    description: 'Centralized platform for managing, monitoring, and securing all your API endpoints.',
    link: 'https://example.com/api-manager',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Database Explorer',
    description: 'Powerful tool for visualizing and interacting with database structures and data.',
    link: 'https://example.com/database-explorer',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    createdAt: new Date().toISOString()
  }
];

// Initialize localStorage with sample data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialApplications));
  }
};

// Get all applications
export const getApplications = (): Application[] => {
  initializeStorage();
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Get a single application by ID
export const getApplicationById = (id: string): Application | undefined => {
  const applications = getApplications();
  return applications.find(app => app.id === id);
};

// Add a new application
export const addApplication = (application: Omit<Application, 'id' | 'createdAt'>): Application => {
  const applications = getApplications();
  const newApplication: Application = {
    ...application,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...applications, newApplication]));
  return newApplication;
};

// Update an existing application
export const updateApplication = (id: string, updates: Partial<Omit<Application, 'id' | 'createdAt'>>): Application | null => {
  const applications = getApplications();
  const index = applications.findIndex(app => app.id === id);
  
  if (index === -1) return null;
  
  const updatedApplication = {
    ...applications[index],
    ...updates
  };
  
  applications[index] = updatedApplication;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(applications));
  
  return updatedApplication;
};

// Delete an application
export const deleteApplication = (id: string): boolean => {
  const applications = getApplications();
  const filteredApplications = applications.filter(app => app.id !== id);
  
  if (filteredApplications.length === applications.length) {
    return false;
  }
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredApplications));
  return true;
};
