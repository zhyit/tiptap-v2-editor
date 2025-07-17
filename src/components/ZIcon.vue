<script setup>
const model = defineModel()
const emits = defineEmits(['click'])
const props = defineProps({
  title: {
    type: String,
    default: () => {
      return ""
    }
  },
  active: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  icon: {
    type: String,
    default: () => {
      return ''
    }
  }
})

const handle_click = () => {
  emits('click')
}

</script>

<template>
  <div class="tiptap-btn" :title="title" @click="handle_click" :class="{ 'tiptap-btn-active': active}">
    <slot/>
  </div>
</template>

<style scoped>

</style>