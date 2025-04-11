/**
 * GitHub Pages deployment script
 * This script handles the deployment process to GitHub Pages
 */

const { execSync } = require('child_process');
const { setGitHubPagesHomepage, restoreHomepage } = require('./src/utils/deploymentUtils');

// Main deployment function
const deployToGitHub = async () => {
  try {
    console.log('Starting GitHub Pages deployment process...');
    
    // Step 1: Update package.json with GitHub Pages homepage
    console.log('Setting GitHub Pages homepage in package.json...');
    setGitHubPagesHomepage();
    
    // Step 2: Build the project
    console.log('Building the project...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Step 3: Delete existing gh-pages branch if it exists
    console.log('Cleaning up existing gh-pages branch...');
    try {
      // Delete local gh-pages branch if it exists
      execSync('git branch -D gh-pages', { stdio: 'inherit' });
    } catch (error) {
      // It's okay if the branch doesn't exist
      console.log('No local gh-pages branch to delete or other error occurred');
    }

    // Step 4: Deploy to GitHub Pages
    console.log('Deploying to GitHub Pages...');
    execSync('npm run deploy', { stdio: 'inherit' });
    
    // Step 4: Restore package.json for local development
    console.log('Restoring package.json for local development...');
    restoreHomepage();
    
    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
    
    // Make sure to restore package.json even if deployment fails
    console.log('Restoring package.json after error...');
    restoreHomepage();
  }
};

// Run the deployment process
deployToGitHub();
