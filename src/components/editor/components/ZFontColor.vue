<script setup>
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import ZColorSel from "../../color/ZColorSel.vue";
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
const colorVal = ref('#000000')

const active = computed(() => {
  return props.editor?.getAttributes('textStyle').color || ''
})

const handle_click = () => {
  groupVisible.value = !groupVisible.value
}
const handle_close_group = () => {
  groupVisible.value = false
}
const handle_set = (color) => {
  props.editor.chain().focus().setColor(color).run()
  handle_close_group()
}
const handle_clear = () => {
  props.editor.chain().focus().unsetColor().run()
  handle_close_group()
}
</script>

<template>
  <div class="tiptap-btn-icon-box" v-click-outside="handle_close_group">
    <z-icon :title="t('editor.toolbar.fontColor')" @click="handle_click" :active.sync="!!active">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24" class="tiptap-btn-icon">
        <path d="M208,232.90024H48c-6.6,0-12-5.39999-12-12v-14.40001c0-6.60001,5.4-12,12-12h160c6.60001,0,12,5.39999,12,12
	v14.40001C220,227.50024,214.60001,232.90024,208,232.90024z" :fill="colorVal ? colorVal : color"/>
        <path d="M158.48753,134.10918H97.54886c-0.82861,0.00278-1.57206,0.50967-1.87733,1.28l-12.736,32.30934
	c-1.99412,5.05745-7.71054,7.54079-12.768,5.54666c-5.05746-1.99411-7.54078-7.71054-5.54667-12.76799l0,0l52.672-133.61066
	c0.53968-1.37193,1.86442-2.27343,3.33868-2.27201h14.72c1.472,0,2.79466,0.896,3.33867,2.272l52.69333,133.65332
	c1.98528,5.04567-0.49567,10.74539-5.54134,12.73067s-10.74539-0.49567-12.73067-5.54134l-12.73599-32.32001
	c-0.3067-0.77394-1.05551-1.2816-1.888-1.28 M151.41553,112.73316l-22.39999-56.896
	c-0.21654-0.54787-0.8362-0.81647-1.38407-0.59994c-0.27433,0.10842-0.49152,0.32561-0.59994,0.59994l-22.464,56.89601
	c-0.21797,0.5473,0.049,1.16766,0.5963,1.38564c0.12589,0.05014,0.26019,0.07584,0.3957,0.0757h44.86401
	c0.5891,0.00058,1.06712-0.47653,1.0677-1.06563c0.00014-0.13551-0.02556-0.26981-0.0757-0.39571" :fill="color"/>
      </svg>
    </z-icon>
    <div class="tiptap-btn-group" v-if="groupVisible">
      <z-color-sel @clear="handle_clear" @sel="handle_set" v-model="colorVal"/>
    </div>
  </div>
</template>

<style scoped>
@import "../../../assets/css/index.css";
</style>