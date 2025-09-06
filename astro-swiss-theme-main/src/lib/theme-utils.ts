// Theme utility functions for dynamic configuration and layout management

import { getThemeConfig } from '../config/theme.config';
import type { ThemeConfig, NavLink } from '../config/theme.config';

// Get theme configuration with runtime overrides
export function getActiveThemeConfig(): ThemeConfig {
  return getThemeConfig();
}

// Navigation utilities
export function getNavigationLinks(position: 'header' | 'footer' = 'header'): NavLink[] {
  const config = getActiveThemeConfig();
  
  if (position === 'header') {
    return config.navigation.header.links;
  }
  
  return config.navigation.footer.links;
}

export function getFooterColumns() {
  const config = getActiveThemeConfig();
  return config.navigation.footer.columns || [];
}

// Feature checks
export function isFeatureEnabled(feature: keyof ThemeConfig['features']): boolean {
  const config = getActiveThemeConfig();
  return config.features[feature]?.enabled ?? false;
}

export function getFeatureVariant(feature: keyof ThemeConfig['features']): string {
  const config = getActiveThemeConfig();
  return config.features[feature]?.variant || 'default';
}

// Content collection utilities
export function getEnabledCollections(): string[] {
  const config = getActiveThemeConfig();
  return Object.entries(config.content.collections)
    .filter(([_, enabled]) => enabled)
    .map(([collection]) => collection);
}

export function isCollectionEnabled(collection: keyof ThemeConfig['content']['collections']): boolean {
  const config = getActiveThemeConfig();
  return config.content.collections[collection] ?? false;
}

// Styling utilities
export function getContainerClass(): string {
  const config = getActiveThemeConfig();
  const containerType = config.styling.layout.container;
  
  switch (containerType) {
    case 'wide':
      return 'max-w-7xl mx-auto px-6 lg:px-8';
    case 'full':
      return 'w-full px-6 lg:px-8';
    default:
      return 'max-w-6xl mx-auto px-6 lg:px-8';
  }
}

export function getSpacingClass(size: 'section' | 'component' = 'section'): string {
  const config = getActiveThemeConfig();
  const spacing = config.styling.layout.spacing;
  
  if (size === 'section') {
    switch (spacing) {
      case 'compact':
        return 'py-12 lg:py-16';
      case 'spacious':
        return 'py-20 lg:py-32';
      default:
        return 'py-16 lg:py-24';
    }
  }
  
  // Component spacing
  switch (spacing) {
    case 'compact':
      return 'space-y-4';
    case 'spacious':
      return 'space-y-8';
    default:
      return 'space-y-6';
  }
}

export function getAnimationClass(): string {
  const config = getActiveThemeConfig();
  
  if (!config.styling.animations.enabled) {
    return '';
  }
  
  const duration = config.styling.animations.duration;
  switch (duration) {
    case 'fast':
      return 'transition-all duration-200';
    case 'slow':
      return 'transition-all duration-500';
    default:
      return 'transition-all duration-300';
  }
}

// SEO and metadata utilities
export function getSiteMetadata() {
  const config = getActiveThemeConfig();
  return {
    title: config.site.title,
    description: config.site.description,
    url: config.site.url,
    author: config.site.author,
    language: config.site.language,
    social: config.site.social,
  };
}

export function getAnalyticsConfig() {
  const config = getActiveThemeConfig();
  return config.site.analytics;
}

export function getBrandConfig() {
  const config = getActiveThemeConfig();
  return config.brand;
}

// CSS custom properties generation
export function generateCSSVariables(): Record<string, string> {
  const config = getActiveThemeConfig();
  const brand = config.brand;
  
  return {
    '--brand-primary': brand.colors.primary,
    '--brand-secondary': brand.colors.secondary,
    '--brand-accent': brand.colors.accent,
    '--font-heading': brand.fonts.heading,
    '--font-body': brand.fonts.body,
  };
}

// Layout component props generation
export function getHeroProps() {
  const config = getActiveThemeConfig();
  const heroConfig = config.features.hero;
  
  return {
    enabled: heroConfig.enabled,
    variant: heroConfig.variant,
    showCta: heroConfig.showCta,
  };
}

export function getAboutProps() {
  const config = getActiveThemeConfig();
  const aboutConfig = config.features.about;
  
  return {
    enabled: aboutConfig.enabled,
    variant: aboutConfig.variant,
  };
}

export function getServicesProps() {
  const config = getActiveThemeConfig();
  const servicesConfig = config.features.services;
  
  return {
    enabled: servicesConfig.enabled,
    variant: servicesConfig.variant,
  };
}

export function getPortfolioProps() {
  const config = getActiveThemeConfig();
  const portfolioConfig = config.features.portfolio;
  
  return {
    enabled: portfolioConfig.enabled,
    variant: portfolioConfig.variant,
  };
}

export function getContactProps() {
  const config = getActiveThemeConfig();
  const contactConfig = config.features.contact;
  
  return {
    enabled: contactConfig.enabled,
    showForm: contactConfig.showForm,
    showMap: contactConfig.showMap,
  };
}

// Content pagination utilities
export function getPaginationConfig() {
  const config = getActiveThemeConfig();
  return {
    pageSize: config.content.pagination.pageSize,
  };
}

// Responsive breakpoints
export function getBreakpoints() {
  const config = getActiveThemeConfig();
  return config.styling.responsive.breakpoints;
}

// Theme preset utilities
export function applyPreset(presetName: string) {
  // This would be used in build-time or initialization scripts
  // to apply a specific preset configuration
  console.log(`Applying theme preset: ${presetName}`);
}

// Development utilities
export function validateThemeConfig(config: ThemeConfig): string[] {
  const errors: string[] = [];
  
  // Validate required fields
  if (!config.site.title) {
    errors.push('Site title is required');
  }
  
  if (!config.site.description) {
    errors.push('Site description is required');
  }
  
  if (!config.site.url) {
    errors.push('Site URL is required');
  }
  
  if (!config.brand.name) {
    errors.push('Brand name is required');
  }
  
  // Validate navigation
  if (!config.navigation.header.links || config.navigation.header.links.length === 0) {
    errors.push('At least one header navigation link is required');
  }
  
  // Validate at least one enabled content collection
  const enabledCollections = Object.values(config.content.collections).some(enabled => enabled);
  if (!enabledCollections) {
    errors.push('At least one content collection must be enabled');
  }
  
  return errors;
}

export function getThemeDebugInfo() {
  const config = getActiveThemeConfig();
  const errors = validateThemeConfig(config);
  
  return {
    config,
    errors,
    enabledFeatures: Object.entries(config.features)
      .filter(([_, feature]) => feature.enabled)
      .map(([name]) => name),
    enabledCollections: getEnabledCollections(),
    environment: {
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD,
      ssr: import.meta.env.SSR,
    }
  };
}