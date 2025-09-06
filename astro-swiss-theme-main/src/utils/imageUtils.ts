/**
 * Image optimization utilities for the Swiss Design Theme
 * Provides helpers for responsive images, placeholders, and performance optimization
 */

export interface ResponsiveImageSizes {
  mobile: number;
  tablet: number;
  desktop: number;
  large: number;
}

// Standard responsive breakpoints following Swiss design principles
export const standardSizes: ResponsiveImageSizes = {
  mobile: 640,
  tablet: 1024,
  desktop: 1440,
  large: 1920,
};

/**
 * Generate responsive sizes attribute for images
 */
export function generateSizes(config?: Partial<ResponsiveImageSizes>): string {
  const sizes = { ...standardSizes, ...config };
  
  return [
    `(max-width: ${sizes.mobile}px) 100vw`,
    `(max-width: ${sizes.tablet}px) 50vw`,
    `(max-width: ${sizes.desktop}px) 33vw`,
    '25vw'
  ].join(', ');
}

/**
 * Generate a blur placeholder data URL
 */
export function generateBlurDataUrl(
  width: number = 10,
  height: number = 10,
  color: string = '#f3f4f6'
): string {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}"/>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Generate a Swiss-themed placeholder image
 */
export function generateSwissPlaceholder(
  width: number,
  height: number,
  text?: string
): string {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Swiss-inspired background -->
      <rect width="${width}" height="${height}" fill="#ffffff"/>
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" stroke="#e5e7eb" stroke-width="1" fill="none"/>
      
      <!-- Swiss cross if space allows -->
      ${width >= 32 && height >= 32 ? `
        <rect x="${width/2 - 2}" y="${height/4}" width="4" height="${height/2}" fill="#d1d5db"/>
        <rect x="${width/4}" y="${height/2 - 2}" width="${width/2}" height="4" fill="#d1d5db"/>
      ` : ''}
      
      <!-- Text if provided -->
      ${text && width >= 100 ? `
        <text x="${width/2}" y="${height/2 + 4}" font-family="Arial, sans-serif" font-size="${Math.min(width/10, 14)}" font-weight="300" text-anchor="middle" fill="#6b7280">${text}</text>
      ` : ''}
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Calculate optimal image dimensions while maintaining aspect ratio
 */
export function calculateImageDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight?: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;
  
  if (!maxHeight) {
    return {
      width: Math.min(originalWidth, maxWidth),
      height: Math.round(Math.min(originalWidth, maxWidth) / aspectRatio),
    };
  }
  
  const scaleFactor = Math.min(
    maxWidth / originalWidth,
    maxHeight / originalHeight
  );
  
  return {
    width: Math.round(originalWidth * scaleFactor),
    height: Math.round(originalHeight * scaleFactor),
  };
}

/**
 * Image format recommendations based on image type and browser support
 */
export function getOptimalFormat(originalFormat: string): 'avif' | 'webp' | 'jpeg' | 'png' {
  // For photos and complex images, prefer modern formats
  if (originalFormat.includes('jpg') || originalFormat.includes('jpeg')) {
    return 'avif'; // Best compression for photos
  }
  
  // For graphics and images with transparency
  if (originalFormat.includes('png')) {
    return 'webp'; // Good compression with transparency support
  }
  
  // Default to WebP for most cases
  return 'webp';
}

/**
 * Quality settings based on image type and usage
 */
export function getOptimalQuality(
  usage: 'hero' | 'thumbnail' | 'content' | 'background' = 'content'
): number {
  switch (usage) {
    case 'hero':
      return 85; // High quality for hero images
    case 'thumbnail':
      return 70; // Lower quality for small thumbnails
    case 'background':
      return 60; // Lower quality for background images
    case 'content':
    default:
      return 80; // Balanced quality for content images
  }
}

/**
 * Generate preload link attributes for critical images
 */
export function generatePreloadAttributes(
  src: string,
  type: 'image' | 'font' = 'image'
): { rel: string; as: string; href: string; type?: string } {
  if (type === 'font') {
    return {
      rel: 'preload',
      as: 'font',
      href: src,
      type: 'font/woff2',
    };
  }
  
  return {
    rel: 'preload',
    as: 'image',
    href: src,
  };
}