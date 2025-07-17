<script setup>
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
const groupVisible = ref(false)
const font_family_list = ref([
    "微软雅黑",
    "宋体",
    "黑体",
    "Inter",
    "Comic Sans MS, Comic Sans",
    "serif",
    "monospace",
    "cursive"
])

const active = computed(() => {
  return props.editor?.getAttributes('textStyle').fontFamily || ''
})

const handle_click = () => {
  groupVisible.value = !groupVisible.value
}
const handle_close_group = () => {
  groupVisible.value = false
}
const handle_set = (family) => {
  props.editor.chain().focus().setFontFamily(family).run()
  handle_close_group()
}
const handle_clear = () => {
  props.editor.chain().focus().unsetFontFamily().run()
  handle_close_group()
}
</script>

<template>
  <div class="tiptap-btn-icon-box" v-click-outside="handle_close_group">
    <z-icon :title="t('editor.toolbar.fontFamily')" @click="handle_click" :active.sync="!!active">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
           :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="tiptap-btn-icon">
        <path
            d="M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z"/>
      </svg>
    </z-icon>
    <div class="tiptap-btn-group" v-if="groupVisible">
      <div class="font-family-item">
        <p @click="handle_clear">{{t('editor.fontFamily.clear')}}</p>
        <p :style="`font-family: ${item};`" v-for="(item, index) in font_family_list" :key="index" @click="handle_set(item)">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../../assets/css/index.css";
</style>