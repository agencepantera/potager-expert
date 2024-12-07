import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

// Configuration pour les différentes tailles d'images
const sizes = {
    mobile: {
        width: 640,
        quality: 75,
        effort: 6
    },
    tablet: {
        width: 1024,
        quality: 70,
        effort: 6
    },
    desktop: {
        width: 1280,
        quality: 65,
        effort: 6
    }
};

async function optimizeImage(inputPath, filename) {
    const ext = path.extname(filename);
    const name = path.basename(filename, ext);
    
    if (ext.toLowerCase() === '.webp') {
        const metadata = await sharp(inputPath).metadata();
        
        for (const [device, config] of Object.entries(sizes)) {
            try {
                // Ne pas agrandir les images plus petites que la taille cible
                const targetWidth = Math.min(config.width, metadata.width);
                
                // Calculer la hauteur proportionnelle
                const targetHeight = Math.round((targetWidth * metadata.height) / metadata.width);
                
                await sharp(inputPath)
                    .resize(targetWidth, targetHeight, {
                        fit: 'cover',
                        position: 'attention' // Utilise l'algorithme d'attention pour un meilleur cadrage
                    })
                    .webp({ 
                        quality: config.quality,
                        effort: config.effort,
                        nearLossless: true,
                        smartSubsample: true,
                        force: true
                    })
                    .toFile(path.join(outputDir, `${name}-${device}${ext}`));
                
                const stats = await fs.stat(path.join(outputDir, `${name}-${device}${ext}`));
                console.log(`Optimized ${filename} for ${device} - Size: ${(stats.size / 1024).toFixed(2)} KB`);
            } catch (error) {
                console.error(`Error processing ${filename} for ${device}:`, error);
            }
        }
    }
}

async function processImages() {
    try {
        // Créer le dossier de sortie s'il n'existe pas
        await fs.mkdir(outputDir, { recursive: true });
        
        const files = await fs.readdir(inputDir);
        
        for (const file of files) {
            if (path.extname(file).toLowerCase() === '.webp') {
                const inputPath = path.join(inputDir, file);
                await optimizeImage(inputPath, file);
            }
        }
        
        console.log('Image optimization complete!');
    } catch (error) {
        console.error('Error processing images:', error);
    }
}

processImages().catch(console.error);
