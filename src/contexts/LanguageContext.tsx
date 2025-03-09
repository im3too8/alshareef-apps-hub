
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'ar';

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'AppReferenceHub',
    'nav.admin': 'Admin',
    'nav.login': 'Admin Login',
    'nav.logout': 'Logout',
    'footer.copyright': '© 2024 AppReferenceHub. All rights reserved.',
    'lang.switch': 'العربية',

    // Home page
    'home.title': 'Application Reference Hub',
    'home.subtitle': 'A curated collection of tech tools and applications',
    'app.view': 'View Application',

    // Login page
    'login.title': 'Admin Login',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.button': 'Login',
    'login.error': 'Invalid email or password',

    // Admin dashboard
    'admin.title': 'Admin Dashboard',
    'admin.subtitle': 'Manage your applications',
    'admin.add': 'Add New Application',
    'admin.empty': 'No applications found',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.delete.confirm': 'Are you sure you want to delete this application?',
    'admin.delete.cancel': 'Cancel',
    'admin.delete.confirm.button': 'Delete',

    // Application form
    'app.form.add': 'Add New Application',
    'app.form.edit': 'Edit Application',
    'app.form.name': 'Name',
    'app.form.description': 'Description',
    'app.form.link': 'Link',
    'app.form.image': 'Image',
    'app.form.upload': 'Upload Image',
    'app.form.uploading': 'Uploading...',
    'app.form.clear': 'Clear Image',
    'app.form.save': 'Save Application',
    'app.form.saving': 'Saving...',
    'app.form.back': 'Back',
  },
  ar: {
    // Navigation
    'nav.home': 'مركز تطبيقات المرجع',
    'nav.admin': 'المسؤول',
    'nav.login': 'تسجيل دخول المسؤول',
    'nav.logout': 'تسجيل الخروج',
    'footer.copyright': '© 2024 مركز تطبيقات المرجع. جميع الحقوق محفوظة.',
    'lang.switch': 'English',

    // Home page
    'home.title': 'مركز مرجع التطبيقات',
    'home.subtitle': 'مجموعة منتقاة من الأدوات والتطبيقات التقنية',
    'app.view': 'عرض التطبيق',

    // Login page
    'login.title': 'تسجيل دخول المسؤول',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.button': 'تسجيل الدخول',
    'login.error': 'البريد الإلكتروني أو كلمة المرور غير صالحة',

    // Admin dashboard
    'admin.title': 'لوحة تحكم المسؤول',
    'admin.subtitle': 'إدارة تطبيقاتك',
    'admin.add': 'إضافة تطبيق جديد',
    'admin.empty': 'لم يتم العثور على تطبيقات',
    'admin.edit': 'تعديل',
    'admin.delete': 'حذف',
    'admin.delete.confirm': 'هل أنت متأكد أنك تريد حذف هذا التطبيق؟',
    'admin.delete.cancel': 'إلغاء',
    'admin.delete.confirm.button': 'حذف',

    // Application form
    'app.form.add': 'إضافة تطبيق جديد',
    'app.form.edit': 'تعديل التطبيق',
    'app.form.name': 'الاسم',
    'app.form.description': 'الوصف',
    'app.form.link': 'الرابط',
    'app.form.image': 'الصورة',
    'app.form.upload': 'تحميل الصورة',
    'app.form.uploading': 'جاري التحميل...',
    'app.form.clear': 'مسح الصورة',
    'app.form.save': 'حفظ التطبيق',
    'app.form.saving': 'جاري الحفظ...',
    'app.form.back': 'رجوع',
  }
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Set language and update document direction
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Initialize from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Translate function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
