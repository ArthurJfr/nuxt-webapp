<template>
  <div ref="container" class="model-container"></div>
</template>

<script setup> 
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const props = defineProps({
  modelPath: {
    type: String,
    required: false,
    default: '/models/minecraft_cube.glb'
  },
  scale: {
    type: Number,
    required: false,
    default: 1
  },
  positionY: {
    type: Number,
    required: false,
    default: 1
  },
  pov: {
    type: String,
    required: false,
    default: '0 0 0'
  }       
});

const modelPath = props.modelPath;

const container = ref(null);
let scene, camera, renderer, model, controls, mixer;
let animationFrameId;

// Configuration de base pour la scène Three.js
const setupScene = () => {
  // Création de la scène
  scene = new THREE.Scene();
  scene.background = null; // Rendre l'arrière-plan transparent

  // Ajout de lumières
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // Ajout d'une lumière d'accentuation pour plus de profondeur
  const spotLight = new THREE.SpotLight(0xffffff, 1.0);
  spotLight.position.set(-5, 5, 0);
  scene.add(spotLight);

  // Création de la caméra avec un point de vue extérieur
  const containerWidth = container.value.clientWidth;
  const containerHeight = container.value.clientHeight;
  camera = new THREE.PerspectiveCamera(30, containerWidth / containerHeight, 0.1, 1000);

  // Utiliser la propriété pov pour positionner la caméra
  const povCoords = props.pov.split(' ').map(coord => parseFloat(coord));
  camera.position.set(
    povCoords[0] || 8, 
    povCoords[1] || 4, 
    povCoords[2] || 8
  );

  camera.lookAt(0, 0, 0); // Regarder vers le centre

  // Création du renderer avec fond transparent
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(containerWidth, containerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.value.appendChild(renderer.domElement);

  // Ajout des contrôles
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5; // Rotation plus lente
  
  // Limiter l'angle de rotation vertical pour garder une vue du dessus
  controls.minPolarAngle = Math.PI / 6; // 30 degrés
  controls.maxPolarAngle = Math.PI / 2.5; // ~72 degrés
};

// Chargement du modèle GLTF
const loadModel = () => {
  const loader = new GLTFLoader();
  
  loader.load(
    modelPath,
    (gltf) => {
      model = gltf.scene;
      
      // Réduire la taille du modèle
      model.scale.set(props.scale, props.scale, props.scale); // Taille réduite
      
      // Ajuster la position pour qu'il soit bien centré
      model.position.y = props.positionY; // Légèrement plus bas pour équilibrer la vue
      
      // Configurer les matériaux et textures
      model.traverse((node) => {
        if (node.isMesh) {
          // S'assurer que les matériaux réagissent à la lumière
          node.material.needsUpdate = true;
          
          // Si le matériau a une texture, s'assurer qu'elle est correctement configurée
          if (node.material.map) {
            node.material.map.needsUpdate = true;
            node.material.colorSpace = THREE.SRGBColorSpace;
          }
        }
      });
      
      // Si le modèle a des animations
      if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      }
      
      scene.add(model);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% chargé');
    },
    (error) => {
      console.error('Une erreur est survenue lors du chargement du modèle', error);
    }
  );
};

// Animation de la scène
const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  
  if (controls) controls.update();
  
  if (mixer) mixer.update(0.016);
  
  renderer.render(scene, camera);
};

// Gestion du redimensionnement
const handleResize = () => {
  const containerWidth = container.value.clientWidth;
  const containerHeight = container.value.clientHeight;
  
  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize(containerWidth, containerHeight);
};

onMounted(() => {
  setupScene();
  loadModel();
  animate();
  
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  
  // Nettoyage du modèle et de ses ressources
  if (model) {
    model.traverse((object) => {
      if (object.isMesh) {
        if (object.geometry) object.geometry.dispose();
        
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => {
              if (material.map) material.map.dispose();
              material.dispose();
            });
          } else {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        }
      }
    });
  }
  
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }
  
  if (controls) controls.dispose();
  
  // Supprimer le nœud du DOM
  if (container.value && renderer && renderer.domElement) {
    container.value.removeChild(renderer.domElement);
  }
  
  // Nettoyage des références
  scene = null;
  camera = null;
  renderer = null;
  model = null;
  controls = null;
  mixer = null;
});
</script>

<style scoped>
.model-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: transparent !important;
}
</style>
