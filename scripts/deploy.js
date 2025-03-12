const fs = require('fs');
const path = require('path');
const ghpages = require('gh-pages');

// Path to the out directory
const outDir = path.join(process.cwd(), 'out');

// Function to recursively process HTML files
function processHtmlFiles(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processHtmlFiles(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace paths in HTML files
      content = content.replace(/\/_next\//g, '/barber-booking/_next/');
      content = content.replace(/="\/(?!barber-booking)/g, '="/barber-booking/');
      
      fs.writeFileSync(filePath, content);
    }
  });
}

// Process HTML files
console.log('Processing HTML files...');
processHtmlFiles(outDir);

// Create .nojekyll file
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

// Deploy to GitHub Pages
console.log('Deploying to GitHub Pages...');
ghpages.publish(outDir, {
  branch: 'gh-pages',
  message: 'Auto-generated commit from deploy script',
}, (err) => {
  if (err) {
    console.error('Error deploying to GitHub Pages:', err);
    process.exit(1);
  } else {
    console.log('Successfully deployed to GitHub Pages!');
  }
}); 