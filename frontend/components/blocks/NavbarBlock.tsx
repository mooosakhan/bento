import React from 'react';
import { NavbarBlockProps } from '@/types';
import { Menu, Search, X, Sun, Moon, Monitor } from 'lucide-react';
import { applyThemeMode, getInitialThemeMode, ThemeMode } from '@/lib/theme';

interface NavbarBlockRendererProps {
  props: NavbarBlockProps;
}

export function NavbarBlockRenderer({ props }: NavbarBlockRendererProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [themeMode, setThemeModeState] = React.useState<ThemeMode>('light');

  // Initialize theme from localStorage
  React.useEffect(() => {
    const initialMode = getInitialThemeMode();
    setThemeModeState(initialMode);
    applyThemeMode(initialMode);
  }, []);

  // Theme toggle handler
  const toggleTheme = () => {
    const modes: ThemeMode[] = ['light', 'dark'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    const newMode = modes[nextIndex];
    
    // Play click sound immediately (async)
    const audio = new Audio('/assets/sounds/switch-93378.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.log('Audio play failed:', err));
    
    // Apply theme changes slightly after sound starts
    setTimeout(() => {
      setThemeModeState(newMode);
      applyThemeMode(newMode);
    }, 50); // 50ms delay for smoother feel
  };

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light':
        return <Sun className="w-5 h-5" />;
      case 'dark':
        return <Moon className="w-5 h-5" />;
    }
  };

  // Keyboard shortcut for search (Ctrl+K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };

    if (props.showSearch) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [props.showSearch]);

  const links = [
    { label: props.homeLabel || 'Home', href: props.homeHref || '#home', show: props.showHome },
    { label: props.aboutLabel || 'About', href: props.aboutHref || '#about', show: props.showAbout },
    { label: props.workLabel || 'Work', href: props.workHref || '#work', show: props.showWork },
    { label: props.contactLabel || 'Contact', href: props.contactHref || '#contact', show: props.showContact },
  ].filter(link => link.show !== false);

  // Prefer explicit navItems if provided
  const navItems = Array.isArray((props as any).navItems) && (props as any).navItems.length
    ? (props as any).navItems.filter((i: any) => i.show !== false)
    : links;

  const logoAlignment = (props as any).logoAlignment || 'left';
  const navAlignment = (props as any).navAlignment || 'right';
  const itemsGap = (props as any).itemsGap !== undefined ? (props as any).itemsGap : 16;

  // Background style handling (bgType, bgColor, bgGradient, bgImage)
  const bgType = (props as any).bgType || null;
  const backgroundStyle: React.CSSProperties = {};
  if (bgType === 'solid' && (props as any).bgColor) {
    backgroundStyle.background = (props as any).bgColor;
  } else if (bgType === 'gradient' && (props as any).bgGradient) {
    backgroundStyle.background = (props as any).bgGradient;
  } else if (bgType === 'image' && (props as any).bgImage) {
    backgroundStyle.backgroundImage = `url('${(props as any).bgImage}')`;
    backgroundStyle.backgroundSize = 'cover';
    backgroundStyle.backgroundPosition = 'center';
  }

  const styleFromTheme = {} as React.CSSProperties;
  // If style-based transparency/blurring still used, keep some defaults
  if (!bgType) {
    if (props.style === 'transparent') {
      styleFromTheme.background = 'transparent';
    } else if (props.style === 'filled') {
      styleFromTheme.background = undefined;
    } else {
      styleFromTheme.background = undefined;
    }
  }

  return (
    <nav className={`sticky top-0 z-10 rounded-xl`} style={{ ...styleFromTheme, ...backgroundStyle }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center h-16 justify-between">
          {/* Logo/Brand */}
          <div className={`flex items-center h-16 overflow-hidden w-full ${logoAlignment === 'center' ? 'justify-center' : logoAlignment === 'right' ? 'justify-end' : 'justify-start'}`}>
            {props.logoUrl && (
              <div
                className="overflow-hidden shadow-sm"
                style={{
                  width: `${props.logoSize || 40}px`,
                  height: `${props.logoSize || 40}px`,
                  borderRadius: `${props.logoRoundness !== undefined ? props.logoRoundness : 8}%`,
                  backgroundColor: props.logoBgColor || 'transparent',
                  marginTop: '12px',
                  flexShrink: 0
                }}
              >
                <img
                  src={props.logoUrl}
                  alt={props.brandText || 'Logo'}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}
            {props.brandText && (
              <span className="text-xl font-bold text-neutral-900 dark:text-white">
                {props.brandText}
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center ml-4 w-full ${navAlignment === 'center' ? 'justify-center' : navAlignment === 'right' ? 'justify-end' : 'justify-start'}`}>
            <div style={{ display: 'flex', gap: `${itemsGap}px`, alignItems: 'center' }}>
              {navItems.map((link: any, index: number) => (
                <a
                  key={link.id || index}
                  href={link.href}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-2 ml-auto md:ml-4">
            {props.showSearch && (
              <>
                {searchOpen ? (
                  <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-5 duration-200">
                    <input
                      type="text"
                      placeholder="Search..."
                      autoFocus
                      className="px-2 py-1 w-36  rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600"
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') setSearchOpen(false);
                      }}
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className=" rounded-md text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label="Close search"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
                    aria-label="Open search"
                  >
                    <Search className="w-4 h-4" />
                    <span className="text-sm">Search</span>
                    <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded">
                      Ctrl+K
                    </kbd>
                  </button>
                )}
              </>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={`Switch theme (current: ${themeMode})`}
              title={`Current: ${themeMode} mode`}
            >
              {getThemeIcon()}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-neutral-200 dark:border-neutral-700 mt-2 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((link: any, index: number) => (
                <a
                  key={link.id || index}
                  href={link.href}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 font-medium px-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {/* Theme toggle in mobile menu */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 font-medium px-2 py-1 text-left"
              >
                {getThemeIcon()}
                <span>Theme: {themeMode}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
