import type { ImageMetadata } from 'astro';

// Theme configuration types
export interface ThemeConfig {
  site: SiteConfig;
  brand: BrandConfig;
  navigation: NavigationConfig;
  features: FeatureConfig;
  content: ContentConfig;
  styling: StylingConfig;
}

export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  language: string;
  author: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    plausibleDomain?: string;
  };
}

export interface BrandConfig {
  name: string;
  tagline?: string;
  logo?: ImageMetadata | string;
  favicon?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export interface NavigationConfig {
  header: {
    showLogo: boolean;
    showThemeToggle: boolean;
    links: NavLink[];
  };
  footer: {
    showSocial: boolean;
    showLegal: boolean;
    links: NavLink[];
    columns?: FooterColumn[];
  };
}

export interface NavLink {
  label: string;
  href?: string;
  id?: string; // for anchor scrolling
  external?: boolean;
  children?: NavLink[];
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface FeatureConfig {
  hero: {
    enabled: boolean;
    variant: 'default' | 'minimal' | 'centered' | 'split';
    showCta: boolean;
  };
  about: {
    enabled: boolean;
    variant: 'default' | 'timeline' | 'grid';
  };
  services: {
    enabled: boolean;
    variant: 'cards' | 'list' | 'grid';
  };
  portfolio: {
    enabled: boolean;
    variant: 'grid' | 'masonry' | 'carousel';
  };
  blog: {
    enabled: boolean;
    variant: 'list' | 'grid' | 'featured';
  };
  contact: {
    enabled: boolean;
    showForm: boolean;
    showMap: boolean;
  };
  reports: {
    enabled: boolean;
    showFilters: boolean;
  };
}

export interface ContentConfig {
  collections: {
    reports: boolean;
    projects: boolean;
    pages: boolean;
    blog?: boolean;
    team?: boolean;
  };
  pagination: {
    pageSize: number;
  };
  search: {
    enabled: boolean;
  };
}

export interface StylingConfig {
  layout: {
    container: 'default' | 'wide' | 'full';
    spacing: 'compact' | 'default' | 'spacious';
  };
  animations: {
    enabled: boolean;
    duration: 'fast' | 'default' | 'slow';
  };
  responsive: {
    breakpoints: Record<string, string>;
  };
}

// Default theme configuration
export const defaultThemeConfig: ThemeConfig = {
  site: {
    title: 'Swiss Design Theme',
    description: 'A modern, flexible Astro theme based on Swiss design principles',
    url: 'https://swiss-astro-theme.vercel.app',
    language: 'en',
    author: 'Your Name',
    social: {
      twitter: '@yourhandle',
      linkedin: 'company/yourcompany',
      email: 'hello@yoursite.com',
    },
    analytics: {
      plausibleDomain: 'swiss-astro-theme.vercel.app',
    },
  },
  brand: {
    name: 'Swiss Theme',
    tagline: 'Modern. Clean. Functional.',
    colors: {
      primary: 'hsl(var(--primary))',
      secondary: 'hsl(var(--secondary))',
      accent: 'hsl(var(--accent))',
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
    },
  },
  navigation: {
    header: {
      showLogo: true,
      showThemeToggle: true,
      links: [
        { label: 'About', id: 'about' },
        { label: 'Services', id: 'services' },
        { label: 'Projects', href: '/projects' },
        { label: 'Reports', href: '/reports' },
        { label: 'Contact', id: 'contact' },
      ],
    },
    footer: {
      showSocial: true,
      showLegal: true,
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
      columns: [
        {
          title: 'Services',
          links: [
            { label: 'Consulting', href: '/services/consulting' },
            { label: 'Development', href: '/services/development' },
            { label: 'Design', href: '/services/design' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', href: '/about' },
            { label: 'Team', href: '/team' },
            { label: 'Contact', href: '/contact' },
          ],
        },
      ],
    },
  },
  features: {
    hero: {
      enabled: true,
      variant: 'default',
      showCta: true,
    },
    about: {
      enabled: true,
      variant: 'default',
    },
    services: {
      enabled: true,
      variant: 'cards',
    },
    portfolio: {
      enabled: true,
      variant: 'grid',
    },
    blog: {
      enabled: false,
      variant: 'list',
    },
    contact: {
      enabled: true,
      showForm: true,
      showMap: false,
    },
    reports: {
      enabled: true,
      showFilters: true,
    },
  },
  content: {
    collections: {
      reports: true,
      projects: true,
      pages: true,
    },
    pagination: {
      pageSize: 12,
    },
    search: {
      enabled: false,
    },
  },
  styling: {
    layout: {
      container: 'default',
      spacing: 'default',
    },
    animations: {
      enabled: true,
      duration: 'default',
    },
    responsive: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
  },
};

// Environment-based configuration override
export function getThemeConfig(): ThemeConfig {
  // Start with default config
  let config = { ...defaultThemeConfig };

  // Override with environment variables if available
  if (import.meta.env.SITE_TITLE) {
    config.site.title = import.meta.env.SITE_TITLE;
  }
  if (import.meta.env.SITE_DESCRIPTION) {
    config.site.description = import.meta.env.SITE_DESCRIPTION;
  }
  if (import.meta.env.SITE_URL) {
    config.site.url = import.meta.env.SITE_URL;
  }
  if (import.meta.env.BRAND_NAME) {
    config.brand.name = import.meta.env.BRAND_NAME;
  }
  if (import.meta.env.GOOGLE_ANALYTICS_ID) {
    config.site.analytics.googleAnalyticsId = import.meta.env.GOOGLE_ANALYTICS_ID;
  }
  if (import.meta.env.PLAUSIBLE_DOMAIN) {
    config.site.analytics.plausibleDomain = import.meta.env.PLAUSIBLE_DOMAIN;
  }

  return config;
}

// Preset configurations for different use cases
export const presetConfigs = {
  business: {
    ...defaultThemeConfig,
    features: {
      ...defaultThemeConfig.features,
      portfolio: { enabled: false, variant: 'grid' as const },
      blog: { enabled: false, variant: 'list' as const },
      reports: { enabled: true, showFilters: true },
    },
  },
  portfolio: {
    ...defaultThemeConfig,
    features: {
      ...defaultThemeConfig.features,
      hero: { enabled: true, variant: 'centered' as const, showCta: false },
      services: { enabled: false, variant: 'cards' as const },
      portfolio: { enabled: true, variant: 'masonry' as const },
      reports: { enabled: false, showFilters: false },
    },
    navigation: {
      ...defaultThemeConfig.navigation,
      header: {
        ...defaultThemeConfig.navigation.header,
        links: [
          { label: 'About', id: 'about' },
          { label: 'Projects', href: '/projects' },
          { label: 'Contact', id: 'contact' },
        ],
      },
    },
  },
  blog: {
    ...defaultThemeConfig,
    features: {
      ...defaultThemeConfig.features,
      hero: { enabled: true, variant: 'minimal' as const, showCta: false },
      services: { enabled: false, variant: 'cards' as const },
      portfolio: { enabled: false, variant: 'grid' as const },
      blog: { enabled: true, variant: 'featured' as const },
      reports: { enabled: false, showFilters: false },
    },
    content: {
      ...defaultThemeConfig.content,
      collections: {
        reports: false,
        projects: false,
        pages: true,
        blog: true,
      },
    },
  },
} as const;

// Type for available presets
export type PresetType = keyof typeof presetConfigs;