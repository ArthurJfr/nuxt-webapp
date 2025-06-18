# 🎨 Système de Thème Global - WikiNotes

## Vue d'ensemble

Le système de thème de WikiNotes utilise des variables CSS et un composable Vue pour une gestion cohérente des thèmes clair et sombre dans toute l'application.

## 🔧 Architecture

### 1. Composable `useTheme()`
```typescript
const { theme, isDark, isLight, toggleTheme, setTheme } = useTheme()
```

**Propriétés disponibles :**
- `theme` : `'light' | 'dark' | 'auto'`
- `isDark` : `boolean` - true si le thème sombre est actif
- `isLight` : `boolean` - true si le thème clair est actif
- `toggleTheme()` : Basculer entre clair et sombre
- `setTheme(newTheme)` : Définir un thème spécifique

### 2. Variables CSS Globales

**Variables de base :**
```css
:root {
  --bg-primary: #f8fafc;      /* Arrière-plan principal */
  --bg-secondary: #ffffff;     /* Arrière-plan secondaire */
  --bg-tertiary: #f1f5f9;     /* Arrière-plan tertiaire */
  --bg-card: #ffffff;         /* Arrière-plan des cartes */
  --bg-card-hover: #f8fafc;   /* Survol des cartes */
  
  --text-primary: #0f172a;    /* Texte principal */
  --text-secondary: #334155;  /* Texte secondaire */
  --text-tertiary: #64748b;   /* Texte tertiaire */
  --text-muted: #94a3b8;      /* Texte atténué */
  
  --border-color: #e2e8f0;    /* Bordures principales */
  --border-light: #f1f5f9;    /* Bordures claires */
  
  --shadow-color: rgba(0, 0, 0, 0.1);        /* Ombres normales */
  --shadow-color-strong: rgba(0, 0, 0, 0.15); /* Ombres fortes */
}
```

**Thème sombre (`:root.dark`) :**
```css
:root.dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --bg-card: #1e293b;
  --bg-card-hover: #334155;
  
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --text-muted: #64748b;
  
  --border-color: #475569;
  --border-light: #334155;
  
  --shadow-color: rgba(0, 0, 0, 0.3);
  --shadow-color-strong: rgba(0, 0, 0, 0.5);
}
```

## 📝 Utilisation dans les Composants

### 1. Pages et Composants Vue

```vue
<template>
  <div class="my-component">
    <h1>Titre</h1>
    <p>Contenu</p>
  </div>
</template>

<script setup>
// Optionnel : accès au thème dans le script
const { isDark } = useTheme()
</script>

<style lang="scss" scoped>
.my-component {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: all 0.3s ease; // Important pour les transitions fluides
  
  h1 {
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-secondary);
  }
  
  &:hover {
    background: var(--bg-card-hover);
    box-shadow: 0 8px 12px var(--shadow-color-strong);
  }
}
</style>
```

### 2. Classes Utilitaires CSS

```html
<!-- Arrière-plans -->
<div class="bg-primary">Arrière-plan principal</div>
<div class="bg-card">Carte</div>

<!-- Textes -->
<h1 class="text-primary">Titre principal</h1>
<p class="text-secondary">Texte secondaire</p>
<span class="text-muted">Texte atténué</span>

<!-- Bordures -->
<div class="border-theme">Bordure normale</div>
<div class="border-light-theme">Bordure claire</div>
```

### 3. Mixins SCSS Disponibles

```scss
// Page d'authentification
.auth-page {
  @include auth-page-base;
}

// Carte d'authentification
.auth-card {
  @include auth-card;
}

// Input d'authentification
input {
  @include auth-input;
}

// Glassmorphisme
.glass-element {
  @include glassmorphism-floating-light('medium');
}

// Version sombre (automatique avec les classes CSS)
.my-app--dark .glass-element {
  @include glassmorphism-floating-dark('medium');
}
```

## 🎯 Bonnes Pratiques

### 1. Toujours utiliser les variables CSS
```scss
// ✅ Correct
.my-element {
  background: var(--bg-card);
  color: var(--text-primary);
}

// ❌ Incorrect
.my-element {
  background: #ffffff;
  color: #000000;
}
```

### 2. Ajouter des transitions
```scss
.my-element {
  background: var(--bg-card);
  transition: all 0.3s ease; // Transition fluide entre thèmes
}
```

### 3. Tester les deux thèmes
- Toujours vérifier l'apparence en mode clair ET sombre
- Utiliser le bouton de basculement dans les paramètres
- Vérifier les contrastes et la lisibilité

### 4. Classes conditionnelles pour cas spéciaux
```vue
<template>
  <div class="my-component" :class="{ 'my-component--dark': isDark }">
    <!-- Contenu -->
  </div>
</template>

<script setup>
const { isDark } = useTheme()
</script>

<style lang="scss" scoped>
.my-component {
  // Styles de base
  
  &--dark {
    // Styles spécifiques au mode sombre si nécessaire
  }
}
</style>
```

## 🚀 Configuration Automatique

Le système s'initialise automatiquement grâce au plugin `plugins/theme.client.ts` :

1. **Détection des préférences sauvegardées** dans localStorage
2. **Application immédiate** du thème au DOM
3. **Mise à jour de la meta theme-color** pour PWA
4. **Écoute des changements** système en mode auto

## 📱 Intégration PWA

Le thème s'intègre parfaitement avec la PWA :
- **Meta theme-color** mise à jour automatiquement
- **Couleurs de la status bar** adaptées
- **Cohérence** entre l'app web et installée

## 🔄 Migration des Composants Existants

Pour migrer un composant existant :

1. **Remplacer les couleurs hardcodées** par les variables CSS
2. **Ajouter des transitions** pour la fluidité
3. **Tester** en mode clair et sombre
4. **Supprimer les media queries** `prefers-color-scheme` obsolètes

Exemple de migration :
```scss
// Avant
.old-component {
  background: #ffffff;
  color: #000000;
  border: 1px solid #e5e5e5;
}

// Après
.old-component {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}
```

## 🎨 Personnalisation

Pour ajouter de nouvelles variables de thème :

1. **Ajouter dans `assets/scss/main.scss`** :
```scss
:root {
  --my-custom-color: #your-light-color;
}

:root.dark {
  --my-custom-color: #your-dark-color;
}
```

2. **Utiliser dans vos composants** :
```scss
.my-element {
  color: var(--my-custom-color);
}
```

Le système de thème garantit une expérience utilisateur cohérente et moderne sur tous les appareils ! 🎉 