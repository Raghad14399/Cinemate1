/**
 * Utility to get the correct public path for assets
 * This handles the base path differences between local development and GitHub Pages
 */

// Determine if we're running in development or production
const isDevelopment = process.env.NODE_ENV === 'development';

// In development, we don't need the PUBLIC_URL prefix
// In production, we use the PUBLIC_URL from the environment (set by Create React App)
const PUBLIC_PATH = isDevelopment ? '' : (process.env.PUBLIC_URL || '');

/**
 * Get the correct path for public assets (like images)
 * @param {string} path - The path to the asset (should start with a slash)
 * @returns {string} The correct path with the public URL prefix
 */
export function getPublicPath(path) {
  // Make sure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // In development, we just use the path directly
  // In production, we prepend the PUBLIC_URL
  return `${PUBLIC_PATH}${normalizedPath}`;
}
