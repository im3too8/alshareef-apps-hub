
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  addApplication, 
  getApplicationById, 
  updateApplication 
} from '@/services/applicationService';
import { Application } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Image } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const ApplicationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    // If in edit mode, load the application data
    if (isEditMode && id) {
      const application = getApplicationById(id);
      if (application) {
        setFormData({
          name: application.name,
          description: application.description,
          link: application.link,
          imageUrl: application.imageUrl
        });
      } else {
        toast({
          title: 'Application not found',
          description: 'The application you are trying to edit does not exist.',
          variant: 'destructive'
        });
        navigate('/admin');
      }
    }
  }, [id, isEditMode, navigate, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditMode && id) {
        updateApplication(id, formData);
        toast({
          title: 'Application updated',
          description: 'The application has been updated successfully.'
        });
      } else {
        addApplication(formData);
        toast({
          title: 'Application created',
          description: 'The application has been created successfully.'
        });
      }
      navigate('/admin');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error saving the application.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample image URLs for quick selection
  const sampleImages = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1518770660439-4636190af475',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
  ];

  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">
              {isEditMode ? 'Edit Application' : 'Add New Application'}
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Application Name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description of the application"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="https://example.com/app"
                    type="url"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  
                  {formData.imageUrl && (
                    <div className="mt-2 rounded-md overflow-hidden border aspect-video">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <Label>Sample Images</Label>
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {sampleImages.map((url, index) => (
                        <div 
                          key={index}
                          className={`relative rounded overflow-hidden aspect-video border cursor-pointer hover:opacity-90 transition-opacity ${formData.imageUrl === url ? 'ring-2 ring-brand-blue' : ''}`}
                          onClick={() => setFormData(prev => ({ ...prev, imageUrl: url }))}
                        >
                          <img 
                            src={url} 
                            alt={`Sample ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Saving...' : 'Save Application'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ApplicationForm;
