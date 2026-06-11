const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.name.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      content = content.replace(/from '(\.[^']+)'/g, (match, importPath) => {
        if (!importPath.endsWith('.js')) {
          return `from '${importPath}.js'`;
        }
        return match;
      });
      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  }
}

processDir(distDir);
console.log('Post-processed JS imports');
