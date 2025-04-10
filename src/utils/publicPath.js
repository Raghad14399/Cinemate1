/**
 * Utility to get the correct public path for assets
 * This handles the base path differences between local development and GitHub Pages
 */

// This gets the PUBLIC_URL from the environment (set by Create React App)
const PUBLIC_PATH = process.env.PUBLIC_URL || '';

/**
 * Get the correct path for public assets (like images)
 * @param {string} path - The path to the asset (should start with a slash)
 * @returns {string} The correct path with the public URL prefix
 */
export function getPublicPath(path) {
  // Make sure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${PUBLIC_PATH}${normalizedPath}`;
}
