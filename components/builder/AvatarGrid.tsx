import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface AvatarGridProps {
    currentAvatar: string;
    onSelect: (avatarPath: string) => void;
}

type CategoryType = 'bento' | 'lorelei' | 'notionists' | 'others' | 'ramx';

// Preset avatars - using DiceBear API for now as placeholders
// In production, these would be from /public/avatars/{category}/
const AVATAR_PRESETS = {
    bento: Array.from({ length: 7 }, (_, i) => ({
        id: `bento-${i + 1}`,
        url: `/avatars/bento/face${i + 1}.jpg`,
        alt: `Bento Avatar ${i + 1}`,
    })),
    lorelei: Array.from({ length: 8 }, (_, i) => ({
        id: `lorelei-${i + 1}`,
        url: `https://api.dicebear.com/7.x/lorelei/svg?seed=lorelei${i + 1}`,
        alt: `Lorelei Avatar ${i + 1}`,
    })),
    notionists: Array.from({ length: 8 }, (_, i) => ({
        id: `notionists-${i + 1}`,
        url: `https://api.dicebear.com/7.x/notionists/svg?seed=notionists${i + 1}`,
        alt: `Notionists Avatar ${i + 1}`,
    })),
    others: [
        ...Array.from({ length: 4 }, (_, i) => ({
            id: `croodles-${i + 1}`,
            url: `https://api.dicebear.com/7.x/croodles/svg?seed=croodles${i + 1}`,
            alt: `Croodles Avatar ${i + 1}`,
        })),
        ...Array.from({ length: 4 }, (_, i) => ({
            id: `openpeeps-${i + 1}`,
            url: `https://api.dicebear.com/7.x/open-peeps/svg?seed=openpeeps${i + 1}`,
            alt: `Open Peeps Avatar ${i + 1}`,
        })),
    ],
    ramx: Array.from({ length: 1 }, (_, i) => ({
        id: `ramx-${i + 1}`,
        url: `/assets/ram.webp`,
        alt: `Ramx Avatar ${i + 1}`,
    })),
};

export function AvatarGrid({ currentAvatar, onSelect }: AvatarGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ramx');
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    const avatars = AVATAR_PRESETS[selectedCategory];

    const handleSelect = (avatarUrl: string) => {
        setSelectedAvatar(avatarUrl);
        onSelect(avatarUrl);
    };

    return (
        <div className="space-y-6">
            {/* Category Selector */}
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-700 rounded-full p-1">

                <button
                    onClick={() => setSelectedCategory('lorelei')}
                    className={`flex-1 px-3 py-2 rounded-full font-medium transition-all text-sm ${selectedCategory === 'lorelei'
                        ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                >
                    Lorelei
                </button>
                <button
                    onClick={() => setSelectedCategory('notionists')}
                    className={`flex-1 px-3 py-2 rounded-full font-medium transition-all text-sm ${selectedCategory === 'notionists'
                        ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                >
                    Notionists
                </button>
                <button
                    onClick={() => setSelectedCategory('bento')}
                    className={`flex-1 px-3 py-2 rounded-full font-medium transition-all text-sm ${selectedCategory === 'bento'
                        ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                >
                    Bento
                </button>
                <button
                    onClick={() => setSelectedCategory('others')}
                    className={`flex-1 px-3 py-2 rounded-full font-medium transition-all text-sm ${selectedCategory === 'others'
                        ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                >
                    Others
                </button>
                  <button
                    onClick={() => setSelectedCategory('ramx')}
                    className={`flex-1 px-3 py-2 rounded-full font-medium transition-all text-sm ${selectedCategory === 'ramx'
                        ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                >
                    Ramx
                </button>
            </div>

            {/* Avatar Grid */}
            <div className="grid grid-cols-4 gap-4">
                {avatars.map((avatar) => {
                    const isSelected = selectedAvatar === avatar.url || currentAvatar === avatar.url;

                    return (
                        <button
                            key={avatar.id}
                            onClick={() => handleSelect(avatar.url)}
                            className={`relative aspect-square rounded-2xl bg-white dark:bg-neutral-800 border-2 transition-all hover:shadow-md hover:-translate-y-1 ${isSelected
                                ? 'border-neutral-900 dark:border-white shadow-lg ring-4 ring-neutral-900/10 dark:ring-white/10'
                                : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600'
                                }`}
                        >
                            {/* Avatar Image */}
                            <div className="absolute inset-2 rounded-full overflow-hidden bg-neutral-50 dark:bg-neutral-700">
                                <img
                                    src={avatar.url}
                                    alt={avatar.alt}
                                    className={`w-full h-full object-cover ${avatar.id == "bento-5" ? 'p-4' : ''}`}
                                />
                            </div>

                            {/* Selected Indicator */}
                            {isSelected && (
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-neutral-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <Check className="w-5 h-5 text-white dark:text-neutral-900" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Category Description */}
            <div className="bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl p-4">
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {selectedCategory === 'bento' && (
                        <>
                            <strong>Bento Style:</strong> Colorful, playful avatars perfect for creative profiles
                        </>
                    )}
                    {selectedCategory === 'lorelei' && (
                        <>
                            <strong>Lorelei Style:</strong> Elegant, illustrated avatars with artistic flair
                        </>
                    )}
                    {selectedCategory === 'notionists' && (
                        <>
                            <strong>Notionists Style:</strong> Modern, geometric avatars for contemporary profiles
                        </>
                    )}
                    {selectedCategory === 'others' && (
                        <>
                            <strong>Others:</strong> Croodles & Open Peeps - Fun, hand-drawn and diverse avatar styles
                        </>
                    )}
                    {selectedCategory === 'ramx' && (
                        <>
                            <strong>Ramx Style:</strong> A unique avatar representing Ramx
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
