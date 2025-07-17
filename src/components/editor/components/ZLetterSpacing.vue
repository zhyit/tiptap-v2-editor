<script setup>
import ZIcon from "../../ZIcon.vue";
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";

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
const groupVisible = ref(false)
const list = ref([
  "1pt",
  "1.5pt",
  "2pt",
  "2.5pt",
  "3pt",
  "3.5pt",
  "4pt",
  "4.5pt",
  "5pt",
  "1em",
  "1.5em",
  "2em",
  "2.5em",
  "3em",
  "3.5em",
  "4em",
  "4.5em",
  "5em",
])

const active = computed(() => {
  return props.editor?.getAttributes('paragraph').letterSpacing || props.editor?.getAttributes('heading').letterSpacing || ''
})

const handle_click = () => {
  groupVisible.value = !groupVisible.value
}
const handle_close_group = () => {
  groupVisible.value = false
}
const handle_set = (letterSpacing) => {
  props.editor.chain().focus().setLetterSpacing(letterSpacing).run()
  handle_close_group()
}
const handle_clear = () => {
  props.editor.chain().focus().unsetLetterSpacing().run()
  handle_close_group()
}
</script>

<template>
  <div class="tiptap-btn-icon-box" v-click-outside="handle_close_group">
    <z-icon :title="t('editor.toolbar.letterSpacing')" @click="handle_click" :active.sync="!!active">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="tiptap-btn-icon">
        <path d="M1.188 21.156l1.23 1.23 0.89 0.89-2.12-2.12zm0.005-0.051l2.12-2.115-0.836 0.835-1.28 1.28z" :fill="color"/>
        <path d="M0.44 21.112c0-0.194 0.072-0.386 0.219-0.533l2.124-2.124a0.75 0.75 0 1 1 1.06 1.06l-0.837 0.836h18.01l-0.837-0.837a0.75 0.75 0 1 1 1.06-1.06l2.12 2.124c0.152 0.153 0.225 0.351 0.219 0.554a0.756 0.756 0 0 1-0.219 0.552l-2.12 2.124a0.75 0.75 0 0 1-1.06-1.062l0.89-0.892H2.95l0.89 0.892a0.75 0.75 0 0 1-1.058 1.062L0.66 21.684a0.75 0.75 0 0 1-0.219-0.532v-0.044z" :fill="color"/>
        <path d="M17.64 17.11l-2.595-7.277H8.984L6.38 17.11H4.5l6.11-17.09h0.932V0h1.852L20.48 17.11zm-3.24-9.1l-2.38-6.676-2.38 6.676z" :fill="color"/>
      </svg>
    </z-icon>
    <div class="tiptap-btn-group" v-if="groupVisible">
      <div class="font-family-item">
        <p @click="handle_clear">{{ t('editor.letterSpacing.clear') }}</p>
        <p v-for="(item, index) in list" :key="index" @click="handle_set(item)" >{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../../assets/css/index.css";
</style>