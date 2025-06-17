// Script pour convertir les SVG en PNG
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Équivalent de __dirname dans ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer des icônes PNG simplifiées en utilisant Canvas ASCII art
const createPngData = (size) => {
  // Pour une approche simple, nous allons créer des fichiers PNG de base64
  // Dans un vrai projet, vous utiliseriez sharp, canvas, ou un service externe
  
  const canvas = {
    width: size,
    height: size,
    data: new Array(size * size * 4).fill(0) // RGBA
  };
  
  // Créer un dégradé simple du bleu au violet
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const index = (y * size + x) * 4;
      
      // Créer un arrière-plan avec dégradé
      const progress = (x + y) / (size * 2);
      canvas.data[index] = Math.floor(79 + progress * (124 - 79));     // R
      canvas.data[index + 1] = Math.floor(70 + progress * (58 - 70));  // G  
      canvas.data[index + 2] = Math.floor(229 + progress * (237 - 229)); // B
      canvas.data[index + 3] = 255; // A
      
      // Ajouter une forme de livre simple au centre
      const centerX = size / 2;
      const centerY = size / 2;
      const bookWidth = size * 0.4;
      const bookHeight = size * 0.3;
      
      if (x >= centerX - bookWidth/2 && x <= centerX + bookWidth/2 &&
          y >= centerY - bookHeight/2 && y <= centerY + bookHeight/2) {
        canvas.data[index] = 255;     // R
        canvas.data[index + 1] = 255; // G  
        canvas.data[index + 2] = 255; // B
        canvas.data[index + 3] = 255; // A
      }
    }
  }
  
  return canvas;
};

// Fonction pour créer un fichier PNG simple (format de base)
const createSimplePNG = (size) => {
  // Créer un PNG minimal avec notre design
  const canvas = createPngData(size);
  
  // En réalité, pour un vrai PNG, vous devriez utiliser une bibliothèque comme 'sharp' ou 'canvas'
  // Ici, nous créons une représentation simple
  return {
    width: size,
    height: size,
    data: canvas.data
  };
};

// Tailles d'icônes requises
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Créer des icônes de remplacement simples
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

console.log('🎨 Génération des icônes PNG pour WikiNotes...\n');

sizes.forEach(size => {
  const fileName = `icon-${size}x${size}.png`;
  const filePath = path.join(iconsDir, fileName);
  
  // Créer un fichier PNG simple (placeholder)
  const pngData = createSimplePNG(size);
  
  // Pour cette démonstration, nous créons un fichier de référence
  fs.writeFileSync(filePath.replace('.png', '.txt'), 
    `Icône PNG ${size}x${size} pour WikiNotes
Couleurs: Dégradé bleu (#4F46E5) vers violet (#7C3AED)
Contenu: Logo livre avec stylo et initiales "WN"
Utilisation: ${getIconUsage(size)}`);
  
  console.log(`✅ Référence créée: ${fileName}`);
});

function getIconUsage(size) {
  const usages = {
    72: 'Notifications Android',
    96: 'Notifications Android HD',
    128: 'Écran d\'accueil Android',
    144: 'Écran d\'accueil Android HD', 
    152: 'Écran d\'accueil iOS',
    192: 'Écran d\'accueil Android haute résolution',
    384: 'Splash screen',
    512: 'App store et splash screen HD'
  };
  return usages[size] || 'Usage général';
}

console.log('\n🎉 Références d\'icônes créées !');
console.log('\n📝 ÉTAPES SUIVANTES pour créer de vraies icônes PNG :');
console.log('1. Installer sharp: npm install sharp');
console.log('2. Ou utiliser un service en ligne comme https://realfavicongenerator.net/');
console.log('3. Ou créer manuellement avec Photoshop/GIMP/Figma');
console.log('\n🎨 Design suggéré:');
console.log('- Arrière-plan: Dégradé bleu-violet (#4F46E5 → #7C3AED)');
console.log('- Icône: Livre ouvert avec stylo (blanc)');
console.log('- Texte: "WN" ou "WikiNotes" selon la taille');
console.log('- Coins arrondis: 15% de la taille de l\'icône'); 