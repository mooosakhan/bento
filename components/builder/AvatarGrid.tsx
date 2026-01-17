import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface AvatarGridProps {
    currentAvatar: string;
    onSelect: (avatarPath: string) => void;
}

type CategoryType = 'bento' | 'outline' | 'others';

// Preset avatars - using DiceBear API for now as placeholders
// In production, these would be from /public/avatars/{category}/
const AVATAR_PRESETS = {
    bento: Array.from({ length: 7 }, (_, i) => ({
        id: `bento-${i + 1}`,
        url: `/avatars/bento/face${i + 1}.jpg`,
        alt: `Bento Avatar ${i + 1}`,
    })),
    outline: Array.from({ length: 6 }, (_, i) => ({
        id: `outline-${i + 1}`,
        url: `/avatars/outline/face${i + 1}.jpg`,
        alt: `Outline Avatar ${i + 1}`,
    })),
    others: Array.from({ length: 7 }, (_, i) => ({
        id: `others-${i + 1}`,
        url: `https://api.dicebear.com/7.x/personas/svg?seed=others${i + 1}`,
        alt: `Other Avatar ${i + 1}`,
    })),
};

export function AvatarGrid({ currentAvatar, onSelect }: AvatarGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('bento');
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    const avatars = AVATAR_PRESETS[selectedCategory];

    const handleSelect = (avatarUrl: string) => {
        setSelectedAvatar(avatarUrl);
        onSelect(avatarUrl);
    };

    return (
        <div className="space-y-6">
            {/* Category Selector */}
            <div className="flex items-center gap-2 bg-neutral-100 rounded-full p-1">
                <button
                    onClick={() => setSelectedCategory('bento')}
                    className={`flex-1 px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === 'bento'
                            ? 'bg-white shadow-sm text-neutral-900'
                            : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                >
                    Bento
                </button>
                <button
                    onClick={() => setSelectedCategory('outline')}
                    className={`flex-1 px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === 'outline'
                            ? 'bg-white shadow-sm text-neutral-900'
                            : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                >
                    Outline
                </button>
                <button
                    onClick={() => setSelectedCategory('others')}
                    className={`flex-1 px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === 'others'
                            ? 'bg-white shadow-sm text-neutral-900'
                            : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                >
                    Others
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
                            className={`relative aspect-square rounded-2xl bg-white border-2 transition-all hover:shadow-md hover:-translate-y-1 ${isSelected
                                    ? 'border-neutral-900 shadow-lg ring-4 ring-neutral-900/10'
                                    : 'border-neutral-200 hover:border-neutral-400'
                                }`}
                        >
                            {/* Avatar Image */}
                            <div className="absolute inset-2 rounded-full overflow-hidden bg-neutral-50">
                                <img
                                    src={avatar.url}
                                    alt={avatar.alt}
                                    className={`w-full h-full object-cover ${avatar.id == "bento-5" ? 'p-4' : ''}`}
                                />
                            </div>

                            {/* Selected Indicator */}
                            {isSelected && (
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center shadow-lg">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Category Description */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                <p className="text-sm text-neutral-600">
                    {selectedCategory === 'bento' && (
                        <>
                            <strong>Bento Style:</strong> Colorful, playful avatars perfect for creative profiles
                        </>
                    )}
                    {selectedCategory === 'outline' && (
                        <>
                            <strong>Outline Style:</strong> Clean, minimalist avatars for professional profiles
                        </>
                    )}
                    {selectedCategory === 'others' && (
                        <>
                            <strong>Others:</strong> Diverse avatar styles for unique personalities
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
