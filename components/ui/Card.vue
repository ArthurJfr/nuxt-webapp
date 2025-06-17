<template>
    <div  class="card"  :class="props.type">
        <slot></slot>
    </div>
</template>
  
  <script setup>
  import { ref } from 'vue';

  const props = defineProps({
    type: {
      type: String,
      required: true,
      validator: value => ['primary', 'secondary', 'bordered', 'clickable', 'iconcard', 'home-card', 'feature-card'].includes(value)
    },
    color: {
      type: String,
      required: false,
      default: 'primary'
    },
    icon: {
      type: Array,
      required: false,
      default: ['fa-solid', 'fa-circle-info']
    }
  });
  </script>
  
  <style lang="scss" scoped>
  @use "@/assets/scss/variables" as *;
  
  .card {
    background-color: $bg-card;
    border-radius: 1rem;
    padding: 2rem;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

    // Carte avec icône
  .home-card {
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px);
    border-radius: 1rem;
    padding: 2rem;
    transition: all 0.3s ease;
    position: relative;
    color: $primary-dark;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
    }
  }

  .feature-card {
    background-color: $bg-card;
    border-radius: 1rem;
    padding: 2rem;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      
      .feature-action .arrow-icon {
        transform: translateX(5px);
      }
      
      .feature-icon {
        transform: scale(1.1);
      }
    }
    
    .feature-icon {
      font-size: 2rem;
      color: $primary;
      margin-bottom: 1.5rem;
      transition: transform 0.3s ease;
    }
    
    .feature-title {
      font-size: 1.5rem;
      color: $primary-dark;
      margin-bottom: 1rem;
    }
    
    .feature-description {
      color: $markdown-text;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .feature-action {
      display: inline-flex;
      align-items: center;
      color: $primary;
      font-weight: 500;
      
      .arrow-icon {
        margin-left: 0.5rem;
        transition: transform 0.2s ease;
      }
    }
  }


  .primary {
    background-color: $bg-card;
    border-radius: 1rem;
    padding: 2rem;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    color: $primary-dark;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .feature-icon {
      font-size: 2rem;
      color: $primary;
      margin-bottom: 1.5rem;
      transition: transform 0.3s ease;
    }
    
    .feature-title {
      font-size: 1.5rem;
      color: $primary-dark;
      margin-bottom: 1rem;
    }
    
    .feature-description {
      color: $markdown-text;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .feature-action {
      display: inline-flex;
      align-items: center;
      color: $primary;
      font-weight: 500;
      
      .arrow-icon {
        margin-left: 0.5rem;
        transition: transform 0.2s ease;
      }
    }
  }


  </style>
  