<script setup>
import {useI18n} from "vue-i18n";
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

const handle_click = () => {
  props.editor.chain().focus().setTextAlign('right').run()
}
</script>

<template>
  <z-icon :title="t('editor.toolbar.alignRight')" @click="handle_click" :active.sync="editor?.isActive({textAlign: 'right'})">
    <svg width="24" height="24" class="tiptap-btn-icon" viewBox="0 0 24 24" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
            :fill="color"></path>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M8 12C8 11.4477 8.44772 11 9 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H9C8.44772 13 8 12.5523 8 12Z"
            :fill="color"></path>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M6 18C6 17.4477 6.44772 17 7 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H7C6.44772 19 6 18.5523 6 18Z"
            :fill="color"></path>
    </svg>
  </z-icon>
</template>

<style scoped>
@import "../../../assets/css/index.css";
</style>