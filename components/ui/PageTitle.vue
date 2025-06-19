<template>

    <div class="page-title" :class="type">
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
    },
    icon: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false,
        validator: value => ['primary', 'secondary', 'tertiary'].includes(value)
    }
})
</script>


<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.primary {
    .page-title__title {
        color: $primary-500;
    }
    .page-title__description {
        color: $primary-400;
    }
}

.secondary {
    .page-title__title {
        color: $secondary-500;
    }
    .page-title__description {
        color: $secondary-400;
    }
}

.tertiary {
    .page-title__title {
        color: $tertiary-500;
    }
    .page-title__description {
        color: $tertiary-400;
    }
}

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
