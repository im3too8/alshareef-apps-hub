
import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileUploadResult } from '@/types';

interface ImageUploaderProps {
  imageUrl: string;
  onChange: (url: string) => void;
  sampleImages?: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  imageUrl, 
  onChange,
  sampleImages = []
}) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    // Convert the file to a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const clearImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="image-upload">Image</Label>
        
        <div className="flex items-center gap-2">
          <Button 
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('image-upload')?.click()}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </Button>
          
          {imageUrl && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearImage}
              className="flex items-center gap-2 text-red-500 hover:text-red-600"
            >
              <X className="h-4 w-4" />
              Clear Image
            </Button>
          )}
          
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      
      {imageUrl && (
        <div className="mt-2 rounded-md overflow-hidden border aspect-video">
          <img 
            src={imageUrl} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {sampleImages.length > 0 && (
        <div className="mt-4">
          <Label>Sample Images</Label>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {sampleImages.map((url, index) => (
              <div 
                key={index}
                className={`relative rounded overflow-hidden aspect-video border cursor-pointer hover:opacity-90 transition-opacity ${imageUrl === url ? 'ring-2 ring-brand-blue' : ''}`}
                onClick={() => onChange(url)}
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
      )}
    </div>
  );
};

export default ImageUploader;
