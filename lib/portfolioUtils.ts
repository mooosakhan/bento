import { Profile, ProfileV1, Portfolio, Section } from '@/types';

/**
 * Migrate old v1 profile (blocks-based) to v2 portfolio (sections-based)
 */
export function migrateProfileToPortfolio(profile: ProfileV1): Portfolio {
  const sections: Section[] = [];
  let order = 0;

  // Find header block and convert to hero section
  const headerBlock = profile.blocks.find(b => b.type === 'header');
  if (headerBlock) {
    sections.push({
      id: `section-hero-${Date.now()}`,
      type: 'hero',
      variant: 'minimal',
      props: {
        displayName: headerBlock.props.displayName || profile.displayName,
        bio: headerBlock.props.bio || profile.bio,
        location: headerBlock.props.location,
        avatar: {
          type: 'url',
          value: headerBlock.props.avatarUrl || profile.avatarUrl,
        },
      },
      order: order++,
    });
  }

  // Convert other blocks to appropriate sections
  profile.blocks.forEach((block) => {
    if (block.type === 'header') return; // Already handled

    switch (block.type) {
      case 'skills':
        sections.push({
          id: `section-skills-${block.id}`,
          type: 'skills',
          variant: block.props.layout === 'grid' ? 'grid' : 'chips',
          props: {
            title: 'Skills',
            skills: block.props.skills || [],
            showLevels: false,
          },
          order: order++,
        });
        break;

      case 'experience':
        sections.push({
          id: `section-experience-${block.id}`,
          type: 'experience',
          variant: 'timeline',
          props: {
            title: 'Experience',
            items: block.props.items || [],
          },
          order: order++,
        });
        break;

      case 'projects':
        sections.push({
          id: `section-projects-${block.id}`,
          type: 'projects',
          variant: 'grid',
          props: {
            title: 'Projects',
            projects: block.props.projects || [],
          },
          order: order++,
        });
        break;

      case 'socialRow':
        sections.push({
          id: `section-contact-${block.id}`,
          type: 'contact',
          variant: 'simple',
          props: {
            title: 'Connect',
            socialLinks: {
              twitter: block.props.twitter,
              instagram: block.props.instagram,
              linkedin: block.props.linkedin,
              github: block.props.github,
            },
          },
          order: order++,
        });
        break;

      case 'card':
        // Convert card blocks to custom sections
        sections.push({
          id: `section-custom-${block.id}`,
          type: 'custom',
          variant: 'cards',
          props: {
            title: block.props.title,
            layout: {
              containerWidth: 'normal',
              columns: 1,
              spacing: 'comfortable',
            },
            cards: [
              {
                id: block.id,
                title: block.props.title,
                description: block.props.description,
                imageUrl: block.props.imageUrl,
                link: block.props.ctaUrl,
                buttonLabel: block.props.ctaText,
              },
            ],
          },
          order: order++,
        });
        break;
    }
  });

  return {
    version: 2,
    handle: profile.handle,
    profile: {
      displayName: profile.displayName,
      bio: profile.bio,
      avatar: {
        type: 'url',
        value: profile.avatarUrl,
      },
    },
    theme: profile.theme,
    sections,
  };
}

/**
 * Detect if a profile is v1 or v2
 */
export function isV1Profile(data: any): data is ProfileV1 {
  return data && !data.version && Array.isArray(data.blocks);
}

export function isV2Portfolio(data: any): data is Portfolio {
  return data && data.version === 2 && Array.isArray(data.sections);
}

/**
 * Load and auto-migrate profile if needed
 */
export function loadPortfolio(): Portfolio | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem('bentobuilder_profile');
    if (!stored) return null;

    const data = JSON.parse(stored);

    // If it's v1, migrate it
    if (isV1Profile(data)) {
      const portfolio = migrateProfileToPortfolio(data);
      // Save migrated version
      savePortfolio(portfolio);
      return portfolio;
    }

    // If it's v2, return as is
    if (isV2Portfolio(data)) {
      return data;
    }

    return null;
  } catch (error) {
    console.error('Error loading portfolio:', error);
    return null;
  }
}

/**
 * Save portfolio to localStorage
 */
export function savePortfolio(portfolio: Portfolio): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('bentobuilder_profile', JSON.stringify(portfolio));
  } catch (error) {
    console.error('Error saving portfolio:', error);
  }
}

/**
 * Generate a URL-friendly handle from display name
 */
export function generateHandle(displayName: string): string {
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || 'myportfolio';
}
