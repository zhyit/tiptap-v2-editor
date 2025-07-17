<script setup>
const props = defineProps({
  type: {
    type: String,
    default: () => {
      return 'default';
    }
  }
})
</script>

<template>
  <div class="z-btn" :class="'z-' + type">
    <slot/>
  </div>
</template>

<style scoped>
.z-btn {
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  display: inline;
}
.z-btn:hover {
  cursor: pointer;
}

.z-default {
  border: 1px solid #b5b4b4;
  color: #686868;
}
.z-default:hover {
  border: 1px solid #8ac1f8;
  background-color: white;
  color: #71c8f8;
}

.z-primary {
  background-color: #5aa8f4;
  border: 1px solid #5aa8f4;
  color: white;
}
.z-primary:hover {
  background-color: #90c0ed;
}
</style>