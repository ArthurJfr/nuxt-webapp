// Script pour générer les icônes PWA
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Équivalent de __dirname dans ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer une icône SVG simple pour WikiNotes
const createWikiNotesIcon = (size) => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#gradient)"/>
  
  <!-- Book icon -->
  <g transform="translate(${size * 0.2}, ${size * 0.2})">
    <!-- Book pages -->
    <rect x="0" y="${size * 0.1}" width="${size * 0.5}" height="${size * 0.5}" rx="${size * 0.02}" fill="white" opacity="0.9"/>
    <rect x="${size * 0.05}" y="${size * 0.05}" width="${size * 0.5}" height="${size * 0.5}" rx="${size * 0.02}" fill="white" opacity="0.7"/>
    
    <!-- Pen -->
    <line x1="${size * 0.35}" y1="${size * 0.15}" x2="${size * 0.55}" y2="${size * 0.35}" stroke="white" stroke-width="${size * 0.02}" stroke-linecap="round"/>
    <circle cx="${size * 0.57}" cy="${size * 0.37}" r="${size * 0.03}" fill="white"/>
  </g>
  
  <!-- App name -->
  <text x="${size / 2}" y="${size * 0.85}" font-family="Arial, sans-serif" font-size="${size * 0.08}" font-weight="bold" text-anchor="middle" fill="white">WN</text>
</svg>`;
};

// Tailles d'icônes requises
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Créer le dossier icons s'il n'existe pas
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Générer les icônes SVG
sizes.forEach(size => {
  const svgContent = createWikiNotesIcon(size);
  const fileName = `icon-${size}x${size}.svg`;
  const filePath = path.join(iconsDir, fileName);
  
  fs.writeFileSync(filePath, svgContent);
  console.log(`✅ Créée: ${fileName}`);
});

console.log('\n🎉 Toutes les icônes SVG ont été générées !');
console.log('\n📝 Note: Pour une PWA optimale, convertissez les SVG en PNG avec un outil comme:');
console.log('- https://convertio.co/svg-png/');
console.log('- GIMP, Photoshop, ou Figma');
console.log('\n📱 Les icônes seront utilisées pour:');
console.log('- 72x72, 96x96: Android notifications');
console.log('- 128x128, 144x144: Android écran d\'accueil');
console.log('- 152x152: iOS écran d\'accueil');
console.log('- 192x192: Android écran d\'accueil haute résolution');
console.log('- 384x384, 512x512: Splash screens et app store'); 