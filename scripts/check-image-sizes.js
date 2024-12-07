import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function getFileSize(filePath) {
    const stats = await fs.stat(filePath);
    return stats.size;
}

async function compareImageSizes() {
    const originalDir = path.join(__dirname, '../public/images');
    const optimizedDir = path.join(__dirname, '../public/images/optimized');

    console.log('\nImage Size Comparison:\n');
    console.log('Original Images:');
    console.log('-'.repeat(50));

    const originalFiles = await fs.readdir(originalDir);
    let totalOriginal = 0;
    let totalOptimized = 0;

    for (const file of originalFiles) {
        if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
            const originalSize = await getFileSize(path.join(originalDir, file));
            totalOriginal += originalSize;
            console.log(`${file}: ${await formatBytes(originalSize)}`);
        }
    }

    console.log('\nOptimized Images:');
    console.log('-'.repeat(50));

    const optimizedFiles = await fs.readdir(optimizedDir);
    for (const file of optimizedFiles) {
        const size = await getFileSize(path.join(optimizedDir, file));
        totalOptimized += size;
        console.log(`${file}: ${await formatBytes(size)}`);
    }

    console.log('\nSummary:');
    console.log('-'.repeat(50));
    console.log(`Total Original Size: ${await formatBytes(totalOriginal)}`);
    console.log(`Total Optimized Size: ${await formatBytes(totalOptimized)}`);
    console.log(`Total Savings: ${await formatBytes(totalOriginal - totalOptimized)} (${((1 - totalOptimized/totalOriginal) * 100).toFixed(2)}%)`);
}

compareImageSizes();
