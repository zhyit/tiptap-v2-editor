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
  props.editor.chain().focus().setTextAlign('center').run()
}
</script>

<template>
  <z-icon :title="t('editor.toolbar.alignCenter')" @click="handle_click" :active.sync="editor?.isActive({textAlign: 'center'})">
    <svg width="24" height="24" class="tiptap-btn-icon" viewBox="0 0 24 24" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
            :fill="color"></path>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
            :fill="color"></path>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z"
            :fill="color"></path>
    </svg>
  </z-icon>
</template>

<style scoped>
@import "../../../assets/css/index.css";
</style>