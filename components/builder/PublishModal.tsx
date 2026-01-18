import React from 'react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PublishModalProps {
  handle: string;
  onClose: () => void;
}

export function PublishModal({ handle, onClose }: PublishModalProps) {
  const [copied, setCopied] = React.useState(false);
  const profileUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/u/${handle}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">🎉 Profile Published!</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Your profile is live and ready to share
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile URL */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Your Profile URL
            </label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl text-sm text-neutral-900 dark:text-white overflow-x-auto">
                {profileUrl}
              </div>
              <Button
                variant="secondary"
                onClick={handleCopy}
                className="flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Live Updates Notice */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>✨ Live Updates:</strong> Any changes you make in the builder will automatically appear on your public profile—no need to republish!
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                window.open(profileUrl, '_blank');
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Profile
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={onClose}
            >
              Continue Editing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
