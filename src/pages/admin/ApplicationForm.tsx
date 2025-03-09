
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  addApplication, 
  getApplicationById, 
  updateApplication 
} from '@/services/applicationService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import ImageUploader from '@/components/admin/ImageUploader';

const ApplicationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  
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

  const handleImageChange = (url: string) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
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

  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <div className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
              <ArrowLeft className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {t('app.form.back')}
            </Button>
            <h1 className="text-2xl font-bold">
              {isEditMode ? t('app.form.edit') : t('app.form.add')}
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
                  <Label htmlFor="name">{t('app.form.name')}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('app.form.name')}
                    required
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">{t('app.form.description')}</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder={t('app.form.description')}
                    rows={4}
                    required
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="link">{t('app.form.link')}</Label>
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
                
                <ImageUploader 
                  imageUrl={formData.imageUrl}
                  onChange={handleImageChange}
                />
                
                <div className={`flex ${language === 'ar' ? 'justify-start' : 'justify-end'}`}>
                  <Button type="submit" disabled={isSubmitting}>
                    <Save className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {isSubmitting ? t('app.form.saving') : t('app.form.save')}
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
