/**
 * Utility function to get the correct path for images in both development and production
 * This handles the different base paths between local development and GitHub Pages deployment
 */
export const getImagePath = (path) => {
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // In development, we don't need the PUBLIC_URL prefix
  // In production, we use the PUBLIC_URL from the environment
  const publicUrl = isDevelopment ? '' : (process.env.PUBLIC_URL || '');
  
  // Make sure the path starts with a slash if it doesn't already
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Combine the public URL with the path
  return `${publicUrl}${normalizedPath}`;
};
