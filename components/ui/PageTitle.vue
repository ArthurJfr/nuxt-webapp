<template>

    <div class="page-title">
        <h1 class="page-title__title">{{ props.title }}</h1>
        <p class="page-title__description">{{ props.description }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
            required: true
    },
    description: {
        type: String,
        required: false
    }   
})
</script>


<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.page-title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    .page-title__title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: $gray-700;
    }

    .page-title__description {
        font-size: 1rem;
        color: $gray-400;
    }
}
</style>
