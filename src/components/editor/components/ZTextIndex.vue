<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import ZIcon from "../../ZIcon.vue";

const {t} = useI18n()
const props = defineProps({
  editor: {
    type: Object,
    required: true
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})

const active = computed(() => {
  return props.editor?.getAttributes('paragraph').indent || ''
})

const handle_click = () => {
  props.editor.chain().focus().toggleTextIndent().run()
}
</script>

<template>
  <z-icon :title="t('editor.toolbar.textIndex')" @click="handle_click" :active.sync="!!active">
    <svg class="tiptap-btn-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <g transform="scale(0.0234375)">
        <path d="M0 0h1024v1024H0z" :fill="color" fill-opacity="0"></path>
        <path
            d="M851.2 806.4a44.8 44.8 0 0 1 0 89.6H172.8a44.8 44.8 0 0 1 0-89.6h678.4zM211.84 128c4.864 0 9.6 1.728 13.248 4.736l163.072 137.216c10.816 9.024 11.52 24.512 1.792 34.496L225.088 443.264a20.928 20.928 0 0 1-27.968-1.28 17.536 17.536 0 0 1-5.12-12.288V146.304C192 136.192 200.832 128 211.84 128zM832 256a44.8 44.8 0 0 1 0 89.6H537.6a44.8 44.8 0 0 1 0-89.6H832z m19.2 275.2a44.8 44.8 0 0 1 0 89.6H172.8a44.8 44.8 0 0 1 0-89.6h678.4z"
            :fill="color"></path>
      </g>
    </svg>
  </z-icon>
</template>

<style scoped>
@import "../../../assets/css/index.css";
</style>