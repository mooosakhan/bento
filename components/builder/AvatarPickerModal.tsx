import React, { useState } from 'react';
import { X, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AvatarUpload } from './AvatarUpload';
import { AvatarUrlInput } from './AvatarUrlInput';
import { AvatarGrid } from './AvatarGrid';

interface AvatarPickerModalProps {
  currentAvatar: string;
  onSelect: (avatarData: { type: 'upload' | 'url' | 'preset'; value: string }) => void;
  onClose: () => void;
}

type TabType = 'preset' | 'upload' | 'url';

export function AvatarPickerModal({ currentAvatar, onSelect, onClose }: AvatarPickerModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('preset');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Choose Avatar</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Upload, paste a URL, or choose from presets
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-6 pb-4">
          <button
            onClick={() => setActiveTab('preset')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all ${
              activeTab === 'preset'
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Presets</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all ${
              activeTab === 'upload'
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all ${
              activeTab === 'url'
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>URL</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'preset' && (
            <AvatarGrid
              currentAvatar={currentAvatar}
              onSelect={(value) => {
                onSelect({ type: 'preset', value });
                onClose();
              }}
            />
          )}
          
          {activeTab === 'upload' && (
            <AvatarUpload
              onUpload={(value) => {
                onSelect({ type: 'upload', value });
                onClose();
              }}
            />
          )}
          
          {activeTab === 'url' && (
            <AvatarUrlInput
              currentUrl={currentAvatar}
              onSubmit={(value) => {
                onSelect({ type: 'url', value });
                onClose();
              }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-200 bg-neutral-50">
          <p className="text-sm text-neutral-500">
            {activeTab === 'upload' && 'Max 2MB • JPG, PNG, WebP'}
            {activeTab === 'url' && 'Paste any image URL'}
            {activeTab === 'preset' && 'Choose from our curated collection'}
          </p>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
