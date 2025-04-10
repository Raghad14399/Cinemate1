/**
 * This script updates all image paths in the src directory to use the getImagePath utility
 * Run this script with: node update-image-paths.js
 */
const fs = require('fs');
const path = require('path');

// Function to recursively find all JS and JSX files
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJsFiles(filePath, fileList);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to update image paths in a file
function updateImagePaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Skip the imageUtils.js file itself
  if (filePath.includes('imageUtils.js')) {
    return false;
  }
  
  // Check if the file already imports getImagePath
  const hasImport = content.includes('import { getImagePath }') || 
                    content.includes('import {getImagePath}');
  
  // Regular expressions to match image paths
  const stringLiteralRegex = /src=["']\/images\/([^"']*)["']/g;
  const templateLiteralRegex = /src={\s*`\/images\/([^`]*)`\s*}/g;
  const backgroundImageRegex = /backgroundImage:\s*`url\(\/images\/([^)]*)\)`,/g;
  
  // Replace string literals
  if (stringLiteralRegex.test(content)) {
    content = content.replace(stringLiteralRegex, 'src={getImagePath("/images/$1")}');
    modified = true;
  }
  
  // Reset regex lastIndex
  stringLiteralRegex.lastIndex = 0;
  
  // Replace template literals
  if (templateLiteralRegex.test(content)) {
    content = content.replace(templateLiteralRegex, 'src={getImagePath(`/images/$1`)}');
    modified = true;
  }
  
  // Reset regex lastIndex
  templateLiteralRegex.lastIndex = 0;
  
  // Replace background image URLs
  if (backgroundImageRegex.test(content)) {
    content = content.replace(backgroundImageRegex, 'backgroundImage: `url(${getImagePath("/images/$1")})`,');
    modified = true;
  }
  
  // Add import if needed and file was modified
  if (modified && !hasImport) {
    // Find the last import statement
    const importRegex = /^import .+;$/gm;
    let lastImportMatch;
    let lastImportIndex = 0;
    
    while ((match = importRegex.exec(content)) !== null) {
      lastImportMatch = match;
      lastImportIndex = match.index + match[0].length;
    }
    
    if (lastImportIndex > 0) {
      // Insert our import after the last import
      const beforeImport = content.substring(0, lastImportIndex);
      const afterImport = content.substring(lastImportIndex);
      content = beforeImport + '\nimport { getImagePath } from \'../../utils/imageUtils\';' + afterImport;
    }
  }
  
  // Save the file if it was modified
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
  
  return modified;
}

// Main function
function main() {
  const srcDir = path.join(__dirname, 'src');
  const jsFiles = findJsFiles(srcDir);
  
  let updatedCount = 0;
  
  jsFiles.forEach(file => {
    if (updateImagePaths(file)) {
      updatedCount++;
    }
  });
  
  console.log(`\nCompleted! Updated ${updatedCount} files.`);
}

main();
