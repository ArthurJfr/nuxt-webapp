const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Ignorer les interfaces loopback et non-IPv4
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  
  return 'localhost';
}

const localIP = getLocalIP();
console.log('\n🌐 Accès réseau local:');
console.log(`📱 iPhone/Mobile: http://${localIP}:8080`);
console.log(`💻 Desktop: http://localhost:8080`);
console.log(`🔗 IP Locale: ${localIP}`);
console.log('\n📋 Instructions:');
console.log('1. Connectez votre iPhone au même WiFi que votre PC');
console.log(`2. Ouvrez Safari sur iPhone et allez à: http://${localIP}:8080`);
console.log('3. Ajoutez à l\'écran d\'accueil pour une expérience PWA complète\n'); 