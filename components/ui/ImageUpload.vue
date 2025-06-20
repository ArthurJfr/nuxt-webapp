<template>
  <div class="image-upload">
    <div 
      class="upload-preview" 
      :class="{ 'has-image': previewUrl }"
      @click="triggerFileInput"
    >
      <img 
        v-if="previewUrl" 
        :src="previewUrl" 
        alt="Aperçu" 
        class="preview-image"
      >
      <div v-else class="upload-placeholder">
        <FontAwesomeIcon :icon="['fas', 'camera']" class="upload-icon" />
        <span>Cliquez pour ajouter une photo</span>
      </div>
    </div>
    
    <div class="upload-actions" v-if="previewUrl">
      <button type="button" class="file-input-label change-btn" @click="triggerFileInput">
        <FontAwesomeIcon :icon="['fas', 'edit']" />
        Changer
      </button>
      <button type="button" class="remove-btn" @click="removeImage">
        <FontAwesomeIcon :icon="['fas', 'trash']" />
        Supprimer
      </button>
    </div>
    
    <button v-else type="button" class="file-input-label" @click="triggerFileInput">
      <FontAwesomeIcon :icon="['fas', 'upload']" />
      Sélectionner une image
    </button>
    
    <input 
      type="file"
      ref="fileInput"
      class="hidden-input"
      accept="image/*"
      @change="handleFileChange"
    >
    
    <p v-if="error" class="error-message">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif']

const emit = defineEmits(['update:modelValue'])
const previewUrl = ref('')
const fileInput = ref<HTMLInputElement>()
const error = ref('')

const triggerFileInput = () => {
  fileInput.value?.click()
}

const removeImage = () => {
  previewUrl.value = ''
  emit('update:modelValue', null)
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  error.value = ''
  
  if (file) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      error.value = 'Format de fichier non supporté. Utilisez JPG, PNG ou GIF.'
      return
    }
    
    if (file.size > MAX_FILE_SIZE) {
      error.value = 'L\'image ne doit pas dépasser 2MB'
      return
    }

    emit('update:modelValue', file)
    previewUrl.value = URL.createObjectURL(file)
  }
}
</script>

<style lang="scss" scoped>
.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .upload-preview {
    width: 150px;
    height: 150px;
    background-color: rgba(255, 255, 255, 0.05);
    border: 2px dashed rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      border-color: $primary;
    }

    &.has-image {
      border-style: solid;
      border-color: rgba(255, 255, 255, 0.2);
    }
  }

  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    text-align: center;

    .upload-icon {
      font-size: 2rem;
      color: $gray-400;
    }

    span {
      font-size: 0.875rem;
      color: $gray-400;
    }
  }
  
  .upload-actions {
    display: flex;
    gap: 1rem;
  }
  
  .file-input-label, .remove-btn {
    background-color: rgba(255, 255, 255, 0.1);
    color: $white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.875rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: $primary;
    }
  }
  
  .remove-btn {
    background-color: rgba($error, 0.2);
    color: $white;
    
    &:hover {
      background-color: $error;
    }
  }

  .hidden-input {
    display: none;
  }

  .error-message {
    color: $error;
    font-size: 0.875rem;
    text-align: center;
    margin-top: 0.5rem;
  }
}
</style> 