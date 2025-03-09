
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ExternalLink, Lock, LogOut } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className="text-xl font-medium tracking-tight hover:text-brand-blue transition-colors"
            >
              AppReferenceHub
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
                    Admin
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <Lock className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="border-t py-6 bg-brand-light">
        <div className="container mx-auto px-4 text-center text-sm text-brand-gray">
          <p>© {new Date().getFullYear()} AppReferenceHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
