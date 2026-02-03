import React, { useState, useRef, useEffect } from 'react';
import { ExperienceItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Toggle } from '@/components/ui/Toggle';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { Plus, Trash2, GripVertical, Eye, EyeOff, Image as ImageIcon, Info } from 'lucide-react';

interface ExperienceEditorProps {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

// Simple chip logo editor component
function SimpleChipLogoEditor({
  chipName,
  logoUrl,
  onLogoChange
}: {
  chipName: string;
  logoUrl: string;
  onLogoChange: (logoUrl: string) => void;
}) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700 space-y-2">
      <div className="flex items-center gap-2">
        {logoUrl ? (
          logoUrl.trim().startsWith('<svg') ? (
            <div
              className="w-5 h-5 flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: logoUrl }}
            />
          ) : (
            <img
              src={logoUrl}
              alt={chipName}
              className="w-5 h-5 object-contain"
            />
          )
        ) : (
          <ImageIcon className="w-5 h-5 text-neutral-400" />
        )}
        <span className="font-mono text-sm font-medium text-neutral-700 dark:text-neutral-300">#{chipName} Logo</span>
      </div>

      <Textarea
        value={logoUrl}
        onChange={(e) => onLogoChange(e.target.value)}
        placeholder="Enter logo URL (https://...) or paste SVG code (<svg>...</svg>)"
        rows={4}
        className="text-sm font-mono"
      />
    </div>
  );
}

interface ExperienceEditorProps {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

// Parse description text for markdown and chips (for preview)
function parseDescriptionText(text: string, chipLogos: { [key: string]: string } = {}) {
  // Split by lines to handle lists
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];
  let listItems: { type: 'ul' | 'ol', items: React.ReactNode[] } | null = null;
  let listKey = 0;

  lines.forEach((line, lineIndex) => {
    // Check for unordered list
    const ulMatch = line.match(/^[-*]\s+(.+)$/);
    // Check for ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)$/);

    if (ulMatch) {
      const content = parseInlineMarkdown(ulMatch[1], chipLogos, lineIndex);
      if (!listItems || listItems.type !== 'ul') {
        if (listItems) {
          result.push(createList(listItems, listKey++));
        }
        listItems = { type: 'ul', items: [] };
      }
      listItems.items.push(<li key={`li-${lineIndex}`} className="ml-4">{content}</li>);
    } else if (olMatch) {
      const content = parseInlineMarkdown(olMatch[1], chipLogos, lineIndex);
      if (!listItems || listItems.type !== 'ol') {
        if (listItems) {
          result.push(createList(listItems, listKey++));
        }
        listItems = { type: 'ol', items: [] };
      }
      listItems.items.push(<li key={`li-${lineIndex}`} className="ml-4">{content}</li>);
    } else {
      // Not a list item
      if (listItems) {
        result.push(createList(listItems, listKey++));
        listItems = null;
      }

      if (line.trim()) {
        const content = parseInlineMarkdown(line, chipLogos, lineIndex);
        result.push(<div key={`line-${lineIndex}`} className="block">{content}</div>);
      } else if (lineIndex < lines.length - 1) {
        result.push(<br key={`br-${lineIndex}`} />);
      }
    }
  });

  // Add remaining list if any
  if (listItems) {
    result.push(createList(listItems, listKey++));
  }

  return result.length > 0 ? result : text;
}

function createList(listItems: { type: 'ul' | 'ol', items: React.ReactNode[] }, key: number) {
  const ListTag = listItems.type;
  return (
    <ListTag key={`list-${key}`} className={listItems.type === 'ul' ? 'list-disc' : 'list-decimal'}>
      {listItems.items}
    </ListTag>
  );
}

function parseInlineMarkdown(text: string, chipLogos: { [key: string]: string } = {}, lineIndex: number = 0) {
  const elements: React.ReactNode[] = [];
  let currentIndex = 0;

  // Regex patterns
  const chipPattern = /#(\w+)/g;
  const boldPattern = /\*\*(.+?)\*\*/g;
  const italicPattern = /\*(.+?)\*/g;
  const linkPattern = /\[(.+?)\]\((.+?)\)/g;

  // Combine all patterns to find all matches
  const allMatches: Array<{ index: number, length: number, type: string, content: string, href?: string }> = [];

  let match;

  // Find chips
  while ((match = chipPattern.exec(text)) !== null) {
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: 'chip',
      content: match[1]
    });
  }

  // Find bold
  while ((match = boldPattern.exec(text)) !== null) {
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: 'bold',
      content: match[1]
    });
  }

  // Find links
  while ((match = linkPattern.exec(text)) !== null) {
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: 'link',
      content: match[1],
      href: match[2]
    });
  }

  // Sort matches by index
  allMatches.sort((a, b) => a.index - b.index);

  // Build elements
  allMatches.forEach((match, i) => {
    // Add text before this match
    if (match.index > currentIndex) {
      const textBefore = text.slice(currentIndex, match.index);
      // Check for italic in plain text
      const italicMatch = textBefore.match(/^(.*?)\*(.+?)\*(.*)$/);
      if (italicMatch) {
        if (italicMatch[1]) elements.push(<span key={`text-${lineIndex}-${i}-pre`}>{italicMatch[1]}</span>);
        elements.push(<em key={`italic-${lineIndex}-${i}`} className="italic">{italicMatch[2]}</em>);
        if (italicMatch[3]) elements.push(<span key={`text-${lineIndex}-${i}-post`}>{italicMatch[3]}</span>);
      } else {
        elements.push(<span key={`text-${lineIndex}-${i}`}>{textBefore}</span>);
      }
    }

    // Add the matched element
    if (match.type === 'chip') {
      const logoData = chipLogos[match.content];
      const isSvg = logoData && logoData.trim().startsWith('<svg');

      elements.push(
        <span
          key={`chip-${lineIndex}-${i}`}
          className="chip-inner-shadow inline-flex items-center gap-1 px-2 py-1 mx-0.5 rounded-md border-2 border-dotted border-neutral-400 dark:border-white/30 dark:bg-white/15 text-sm font-bold text-neutral-700 dark:text-neutral-300"
        >
          {logoData && (
            isSvg ? (
              <span
                className="w-3.5 h-3.5 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: logoData }}
              />
            ) : (
              <img
                src={logoData}
                alt={match.content}
                className="w-3.5 h-3.5 object-contain"
              />
            )
          )}
          {match.content}
        </span>
      );
    } else if (match.type === 'bold') {
      elements.push(<strong key={`bold-${lineIndex}-${i}`} className="font-bold">{match.content}</strong>);
    } else if (match.type === 'link') {
      elements.push(
        <a
          key={`link-${lineIndex}-${i}`}
          href={match.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {match.content}
        </a>
      );
    }

    currentIndex = match.index + match.length;
  });

  // Add remaining text
  if (currentIndex < text.length) {
    const remainingText = text.slice(currentIndex);
    // Check for italic in remaining text
    const italicMatch = remainingText.match(/^(.*?)\*(.+?)\*(.*)$/);
    if (italicMatch) {
      if (italicMatch[1]) elements.push(<span key={`text-${lineIndex}-end-pre`}>{italicMatch[1]}</span>);
      elements.push(<em key={`italic-${lineIndex}-end`} className="italic">{italicMatch[2]}</em>);
      if (italicMatch[3]) elements.push(<span key={`text-${lineIndex}-end-post`}>{italicMatch[3]}</span>);
    } else {
      elements.push(<span key={`text-${lineIndex}-end`}>{remainingText}</span>);
    }
  }

  return elements.length > 0 ? <>{elements}</> : text;
}

export function ExperienceEditor({ items, onChange }: ExperienceEditorProps) {
  const [previewMode, setPreviewMode] = useState<{ [key: number]: boolean }>({});
  const [infoVisible, setInfoVisible] = useState(false);
  const infoHideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showInfo = () => {
    if (infoHideTimeout.current) {
      clearTimeout(infoHideTimeout.current);
      infoHideTimeout.current = null;
    }
    setInfoVisible(true);
  };

  const startHideTimer = () => {
    if (infoHideTimeout.current) clearTimeout(infoHideTimeout.current);
    infoHideTimeout.current = setTimeout(() => {
      setInfoVisible(false);
      infoHideTimeout.current = null;
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (infoHideTimeout.current) clearTimeout(infoHideTimeout.current);
    };
  }, []);

  const addItem = () => {
    onChange([
      ...items,
      {
        role: 'Your Role',
        company: 'Company Name',
        startDate: 'Jan 2024',
        endDate: '',
        description: 'Brief description of your responsibilities and achievements.',
        companyLogo: '',
        logoBgColor: '#ffffff',
        logoRoundness: 16,
        blurCompanyTitle: false,
        chips: [],
        chipLogos: {},
      },
    ]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, updates: Partial<ExperienceItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    onChange(newItems);
  };

  const togglePreview = (index: number) => {
    setPreviewMode(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const addChip = (index: number) => {
    const newItems = [...items];
    const currentChips = newItems[index].chips || [];
    newItems[index] = {
      ...newItems[index],
      chips: [...currentChips, `Chip${currentChips.length + 1}`]
    };
    onChange(newItems);
  };

  const removeChip = (itemIndex: number, chipIndex: number) => {
    const newItems = [...items];
    const currentChips = [...(newItems[itemIndex].chips || [])];
    currentChips.splice(chipIndex, 1);
    newItems[itemIndex] = { ...newItems[itemIndex], chips: currentChips };
    onChange(newItems);
  };

  const updateChip = (itemIndex: number, chipIndex: number, value: string) => {
    const newItems = [...items];
    const currentChips = [...(newItems[itemIndex].chips || [])];
    currentChips[chipIndex] = value;
    newItems[itemIndex] = { ...newItems[itemIndex], chips: currentChips };
    onChange(newItems);
  };

  const updateChipLogo = (itemIndex: number, chipName: string, logoUrl: string) => {
    const newItems = [...items];
    const currentChipLogos = { ...(newItems[itemIndex].chipLogos || {}) };
    currentChipLogos[chipName] = logoUrl;
    newItems[itemIndex] = { ...newItems[itemIndex], chipLogos: currentChipLogos };
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      {/* ===== EXPERIENCE LIST ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Experience
        </h3>

      <div className="space-y-4 overflow-visible scrollbar-light scrollbar-dark">
        {items.map((item, index) => (
          <div key={index} className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 space-y-3">
            <div className="flex items-start flex-col gap-2">
              <div className='flex items-center justify-between w-full'>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  # {index + 1}
                </label>
                <Button
                  onClick={() => removeItem(index)}
                  className="p-2 text-neutral-400 hover:text-red-600 transition-colors bg-none self-end"
                  variant="ghost"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-3">
                {/* Role */}
                <Input
                  type="text"
                  value={item.role}
                  onChange={(e) => updateItem(index, { role: e.target.value })}
                  placeholder="Role"
                  className=''
                  label='Role'
                />

                {/* Company Name with Blur Toggle */}
                <div className="space-y-2">
                  <Input
                    type="text"
                    value={item.company}
                    onChange={(e) => updateItem(index, { company: e.target.value })}
                    placeholder="Company"
                    className={item.blurCompanyTitle ? 'blur-sm' : ''}
                    label="Company Name"
                  />
                  <Toggle
                    checked={item.blurCompanyTitle || false}
                    onChange={(checked) => updateItem(index, { blurCompanyTitle: checked })}
                    label="Blur company name"
                  />
                </div>

                {/* Company Logo */}
                <div className="space-y-2">

                  <Textarea
                    value={item.companyLogo || ''}
                    onChange={(e) => updateItem(index, { companyLogo: e.target.value })}
                    placeholder="https://example.com/logo.png or <svg>...</svg>"
                    rows={4}
                    label="Company Logo URL or SVG"
                  />

                  {/* Logo Preview */}
                  {item.companyLogo && (
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 flex items-center justify-center "

                      >
                        {item.companyLogo.trim().startsWith('<svg') ? (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: item.companyLogo }}

                          />

                        ) : (
                          <img
                            style={{
                              backgroundColor: item.logoBgColor || '#ffffff',
                              borderRadius: `${item.logoRoundness || 16}%`
                            }}
                            src={item.companyLogo}
                            alt="Logo preview"
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <ColorPicker
                          label="Background Color"
                          value={item.logoBgColor && item.logoBgColor !== 'none' ? item.logoBgColor : '#ffffff'}
                          onChange={(color) => updateItem(index, { logoBgColor: color })}
                          showTransparent={true}
                        />
                        
                        <div>
                          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                            Roundness: {item.logoRoundness || 16}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={item.logoRoundness || 16}
                            onChange={(e) => updateItem(index, { logoRoundness: parseInt(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 gap-2">

                  <Input
                    type="text"
                    value={item.startDate}
                    onChange={(e) => updateItem(index, { startDate: e.target.value })}
                    placeholder="Start Date"
                    label="Start Date"
                  />

                  <Input
                    type="text"
                    value={item.endDate || ''}
                    onChange={(e) => updateItem(index, { endDate: e.target.value })}
                    placeholder="End Date (or leave empty)"
                    label="End Date"
                  />
                </div>

                {/* Description with Markdown Support */}
                <div className="space-y-2">
                  {/* <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Description (Markdown supported: **bold**, *italic*, [link](url), #chip, lists)
                    </label>
                    <button
                      onClick={() => togglePreview(index)}
                      className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                    >
                      {previewMode[index] ? (
                        <>
                          <EyeOff className="w-3 h-3" />
                          Edit
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3" />
                          Preview
                        </>
                      )}
                    </button>
                  </div> */}

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Description</label>

                      <div className="flex items-center gap-2">
                        <div
                          className="relative"
                          onMouseEnter={showInfo}
                          onMouseLeave={startHideTimer}
                        >
                          <Button
                            type="button"
                            aria-label="Markdown help"
                            variant="ghost"
                          >
                            <Info className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                          </Button>

                          <div
                            className={`absolute right-[-100]  bottom-full mb-2 w-60 text-sm rounded shadow-lg border bg-white dark:bg-neutral-800 p-3 z-50 transition-opacity ${infoVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                            onMouseEnter={showInfo}
                            onMouseLeave={startHideTimer}
                          >
                            <div className="text-neutral-700 dark:text-neutral-300">
                              Quick Markdown help:
                              <ul className="list-disc ml-4 mt-2">
                                <li><strong>Bullets:</strong> start a line with <code>-</code> or <code>*</code></li>
                                <li><strong>Numbered:</strong> <code>1. Item</code></li>
                                <li><strong>Bold:</strong> <code>**bold**</code>, <strong>Bold</strong></li>
                                <li><strong>Italic:</strong> <code>*italic*</code>, <em>Italic</em></li>
                                <li><strong>Link:</strong> <code>[text](https://...)</code></li>
                                <li><strong>Chip:</strong> use <code>#chipname</code> to insert a chip</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {previewMode[index] ? (
                      <div className="min-h-[80px] p-3 bg-white dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-600 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-1">
                        {parseDescriptionText(item.description, item.chipLogos || {})}
                      </div>
                    ) : (
                      <Textarea
                        value={item.description}
                        onChange={(e) => updateItem(index, { description: e.target.value })}
                        placeholder="Description of your role and achievements. Use:\n- Bullet points\n1. Numbered lists\n**bold** *italic* [link](url) #chips"
                        rows={8}
                      />
                    )}
                  </div>
                </div>

                {/* Chips Section */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Technologies / Skills
                  </label>

                  {item.chips && item.chips.length > 0 && (
                    <div className="space-y-2">
                      {item.chips.map((chip, chipIndex) => (
                        <div key={chipIndex} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Input
                              type="text"
                              value={chip}
                              onChange={(e) => updateChip(index, chipIndex, e.target.value)}
                              placeholder="Chip name (e.g., React, TypeScript)"
                              className="flex-1 text-base py-2.5"
                            />
                            <Button
                              onClick={() => removeChip(index, chipIndex)}
                              className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                              variant="ghost"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Chip Logo Editor */}
                          <SimpleChipLogoEditor
                            chipName={chip}
                            logoUrl={(item.chipLogos || {})[chip] || ''}
                            onLogoChange={(logoUrl) => updateChipLogo(index, chip, logoUrl)}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    variant="secondary"
                    onClick={() => addChip(index)}
                    className="w-full"
                    size="sm"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Chip
                  </Button>
                </div>
              </div>


            </div>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={addItem}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
      </div>
    </div>
  );
}
