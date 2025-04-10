/**
 * Utility function to get the correct path for images in both development and production
 * This handles the different base paths between local development and GitHub Pages deployment
 */
export const getImagePath = (path) => {
  // Check if we're in production (GitHub Pages) by looking at the PUBLIC_URL
  const publicUrl = process.env.PUBLIC_URL || '';
  
  // Make sure the path starts with a slash if it doesn't already
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Combine the public URL with the path
  return `${publicUrl}${normalizedPath}`;
};
