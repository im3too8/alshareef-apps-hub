
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ExternalLink, Lock, LogOut, Globe } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ar' ? 'font-arabic' : ''}`}>
      <header className="glass sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className="text-xl font-medium tracking-tight hover:text-brand-blue transition-colors"
            >
              {t('nav.home')}
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/admin">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`${location.pathname.includes('/admin') ? 'bg-secondary' : ''}`}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    {t('nav.admin')}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <Lock className="h-4 w-4 mr-2" />
                  {t('nav.login')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main className={`flex-1 container mx-auto px-4 py-6 ${language === 'ar' ? 'text-right' : ''}`}>
        {children}
      </main>
      
      <footer className="border-t py-6 bg-brand-light">
        <div className="container mx-auto px-4 flex flex-col items-center gap-2">
          <p className="text-sm text-brand-gray">
            {t('footer.copyright')}
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            {t('lang.switch')}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
