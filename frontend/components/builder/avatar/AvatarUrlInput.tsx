import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface AvatarUrlInputProps {
  currentUrl: string;
  onSubmit: (url: string) => void;
}

export function AvatarUrlInput({ currentUrl, onSubmit }: AvatarUrlInputProps) {
  const [url, setUrl] = useState(currentUrl);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateUrl = (urlString: string) => {
    try {
      const parsed = new URL(urlString);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handlePreview = () => {
    setError(null);
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setIsValidating(true);

    // Test if the URL loads as an image
    const img = new Image();
    img.onload = () => {
      setIsValidating(false);
      setPreviewUrl(url);
      setError(null);
    };
    img.onerror = () => {
      setIsValidating(false);
      setError('Could not load image from this URL. Please check the link.');
    };
    img.src = url;
  };

  const handleSubmit = () => {
    if (previewUrl) {
      onSubmit(previewUrl);
    } else {
      handlePreview();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="space-y-4">
        <Input
          label="Image URL"
          placeholder="https://example.com/avatar.jpg"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setPreviewUrl(null);
            setError(null);
          }}
          onKeyPress={handleKeyPress}
        />
        
        <div className="flex gap-2">
          <Button 
            onClick={handlePreview}
            disabled={isValidating || !url.trim()}
            className="flex-1"
            variant="secondary"
          >
            {isValidating ? 'Validating...' : 'Preview'}
          </Button>
          {previewUrl && (
            <Button onClick={handleSubmit} className="flex-1">
              Use This Avatar
            </Button>
          )}
        </div>
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="bg-neutral-50 rounded-2xl p-8 flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-neutral-600">Preview looks great! ✨</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">Invalid URL</p>
            <p className="text-sm text-red-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}

    </div>
  );
}
