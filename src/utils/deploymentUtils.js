/**
 * Deployment utilities for handling GitHub Pages deployment
 * This file contains utilities to help with deploying the app to GitHub Pages
 */

// Function to modify the package.json before deployment
const setGitHubPagesHomepage = () => {
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Path to package.json
    const packageJsonPath = path.resolve(__dirname, '../../package.json');
    
    // Read the current package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Set the homepage for GitHub Pages
    packageJson.homepage = 'https://raghad14399.github.io/Cinemate1/';
    
    // Write the updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
    console.log('Successfully updated package.json for GitHub Pages deployment');
  } catch (error) {
    console.error('Error updating package.json:', error);
  }
};

// Function to restore the package.json after deployment
const restoreHomepage = () => {
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Path to package.json
    const packageJsonPath = path.resolve(__dirname, '../../package.json');
    
    // Read the current package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Restore the homepage for local development
    packageJson.homepage = '.';
    
    // Write the updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
    console.log('Successfully restored package.json for local development');
  } catch (error) {
    console.error('Error restoring package.json:', error);
  }
};

module.exports = {
  setGitHubPagesHomepage,
  restoreHomepage
};
