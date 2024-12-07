import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SIZES = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280
};

const QUALITY_SETTINGS = {
  webp: {
    quality: 60,
    lossless: false,
    nearLossless: false,
    smartSubsample: true,
    effort: 6
  }
};

async function optimizeImage(inputPath, outputDir, baseName) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const originalSize = (await fs.stat(inputPath)).size;
    
    // Ne pas agrandir les images plus petites que la taille cible
    const originalWidth = metadata.width;
    
    for (const [size, width] of Object.entries(SIZES)) {
      if (width <= originalWidth) {
        const outputPath = path.join(
          outputDir, 
          `${baseName}-${size}.webp`
        );

        await image
          .resize({
            width,
            height: Math.round(width * (metadata.height / metadata.width)),
            fit: 'cover',
            withoutEnlargement: true
          })
          .webp(QUALITY_SETTINGS.webp)
          .toFile(outputPath);

        const optimizedSize = (await fs.stat(outputPath)).size;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
        
        console.log(`Optimized ${size} version: ${outputPath}`);
        console.log(`Size reduction: ${savings}% (${(originalSize/1024).toFixed(2)}KB -> ${(optimizedSize/1024).toFixed(2)}KB)`);
      }
    }
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

async function processImages() {
  const inputDir = path.join(__dirname, '../public/images');
  const outputDir = path.join(__dirname, '../public/images/optimized');

  try {
    // Créer le dossier de sortie s'il n'existe pas
    await fs.mkdir(outputDir, { recursive: true });

    // Nettoyer le dossier de sortie
    const existingFiles = await fs.readdir(outputDir);
    for (const file of existingFiles) {
      await fs.unlink(path.join(outputDir, file));
    }

    // Lire tous les fichiers du dossier d'entrée
    const files = await fs.readdir(inputDir);

    // Filtrer pour ne garder que les images
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to process`);

    // Traiter chaque image
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const baseName = path.parse(file).name;
      
      console.log(`\nProcessing: ${file}`);
      await optimizeImage(inputPath, outputDir, baseName);
    }

    console.log('\nImage optimization complete!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Exécuter le script
processImages();
