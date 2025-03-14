import fs from 'fs';
import path from 'path';


export const ensureOutputDirExists = () => {
  const outputDir = path.resolve('./output');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('Created output directory');
  }
}; 