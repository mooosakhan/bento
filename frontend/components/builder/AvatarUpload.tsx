import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AvatarUploadProps {
  onUpload: (dataUrl: string) => void;
}

export function AvatarUpload({ onUpload }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  const handleFile = (file: File) => {
    setError(null);

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image');
      return;
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      setError('Image must be smaller than 2MB');
      return;
    }

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUploadClick = () => {
    if (preview) {
      onUpload(preview);
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
          isDragging
            ? 'border-neutral-900 bg-neutral-50'
            : preview
            ? 'border-neutral-300'
            : 'border-neutral-300 hover:border-neutral-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        {preview ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm text-neutral-600">Looking good! 👍</p>
            <div className="flex gap-2">
              <Button onClick={handleUploadClick}>
                Use This Avatar
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setPreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
              >
                Choose Different
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center">
              {isDragging ? (
                <ImageIcon className="w-8 h-8 text-neutral-400" />
              ) : (
                <Upload className="w-8 h-8 text-neutral-400" />
              )}
            </div>
            <div>
              <p className="font-medium text-neutral-900 mb-1">
                {isDragging ? 'Drop your image here' : 'Drag & drop your avatar'}
              </p>
              <p className="text-sm text-neutral-500">or</p>
            </div>
            <Button onClick={() => fileInputRef.current?.click()}>
              Browse Files
            </Button>
            <p className="text-xs text-neutral-400">
              JPG, PNG, WebP or GIF • Max 2MB
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">Upload failed</p>
            <p className="text-sm text-red-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
