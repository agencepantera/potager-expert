import fs from 'fs/promises';
import path from 'path';
import https from 'https';

const FONTS = [
  {
    family: 'Playfair Display',
    weights: ['400', '700'],
    styles: ['normal']
  },
  {
    family: 'Source Sans Pro',
    weights: ['400', '600'],
    styles: ['normal']
  }
];

const CSS_API = 'https://fonts.googleapis.com/css2';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function downloadFont(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function downloadFonts() {
  // Créer les dossiers nécessaires
  const fontsDir = path.join(process.cwd(), 'public', 'fonts');
  await fs.mkdir(fontsDir, { recursive: true });

  // Construire l'URL pour Google Fonts
  const fontFamilies = FONTS.map(font => {
    const weights = font.weights.join(';');
    return `family=${font.family.replace(/ /g, '+')}:wght@${weights}`;
  }).join('&');

  const url = `${CSS_API}?${fontFamilies}&display=swap`;
  
  // Télécharger le CSS de Google Fonts
  const css = await downloadFont(url);
  
  // Extraire les URLs des fichiers de police
  const fontUrls = css.match(/https:\/\/fonts\.gstatic\.com\/[^)]+/g) || [];
  
  // Télécharger chaque fichier de police
  for (const fontUrl of fontUrls) {
    const fontData = await downloadFont(fontUrl);
    const fontFileName = path.basename(fontUrl);
    await fs.writeFile(path.join(fontsDir, fontFileName), fontData);
  }
  
  // Générer le CSS local
  let localCss = css.replace(
    /https:\/\/fonts\.gstatic\.com\/[^)]+/g,
    (match) => `/fonts/${path.basename(match)}`
  );
  
  // Sauvegarder le CSS local
  await fs.writeFile(
    path.join(process.cwd(), 'src', 'styles', 'fonts.css'),
    localCss
  );
  
  console.log('Polices téléchargées et CSS généré avec succès !');
}

downloadFonts().catch(console.error);
