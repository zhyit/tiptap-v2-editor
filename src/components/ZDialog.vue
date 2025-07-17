<script setup>
import {onBeforeUnmount, onMounted} from "vue";

const model = defineModel()
const props = defineProps({
  width: {
    type: String,
    default: '50%'
  }
})

const handle_close = () => {
  model.value = false
}
const handle_key_down = (e) => {
  if (e.key === 'Escape') handle_close()
}

onMounted(() => {
  window.addEventListener('keydown', handle_key_down);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handle_key_down);
});
</script>

<template>
  <div v-if="model" class="z-modal-backdrop" @click.self="handle_close">
    <div class="z-modal-content" tabindex="0" :style="{width: props.width}">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.z-modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 999;
}

.z-modal-content {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.2s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>