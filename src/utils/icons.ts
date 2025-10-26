/**
 * App Icon References
 * These are the official app icons for the Imposter PWA
 */

// Import the app icons from Figma assets
import icon512 from 'figma:asset/0a2b70c25f5ad30d26944f9bc183dc7bf481f2d4.png';
import icon192 from 'figma:asset/734f89d3888e17342f83a9ad7695b51ae1906e4c.png';

export const appIcons = {
  icon512,
  icon192,
};

/**
 * Get the icon URL for the specified size
 */
export function getIconUrl(size: 192 | 512): string {
  return size === 192 ? icon192 : icon512;
}
