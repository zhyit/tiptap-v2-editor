<script setup>
import {useI18n} from "vue-i18n";
import Zh1 from "./ZH1.vue";
import Zh4 from "./ZH4.vue";
import Zh3 from "./ZH3.vue";
import Zh2 from "./ZH2.vue";
import {ref} from "vue";
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

const handle_click = () => {
  groupVisible.value = !groupVisible.value
}
const handle_close_group = () => {
  groupVisible.value = false
}
</script>

<template>
  <div class="tiptap-btn-icon-box" v-click-outside="handle_close_group">
    <z-icon :title="t('editor.toolbar.heading')" @click="handle_click" :active.sync="editor?.isActive('heading')">
      <svg width="24" height="24" class="tiptap-btn-icon" viewBox="0 0 24 24" fill="currentColor"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6 3C6.55228 3 7 3.44772 7 4V11H17V4C17 3.44772 17.4477 3 18 3C18.5523 3 19 3.44772 19 4V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V13H7V20C7 20.5523 6.55228 21 6 21C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3Z"
            :fill="color"></path>
      </svg>
      <svg width="24" height="24" class="button-dropdown-small"
           viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
              :fill="color"></path>
      </svg>
    </z-icon>
    <div class="tiptap-btn-group" v-if="groupVisible">
      <Zh1 :editor="editor"/>
      <Zh2 :editor="editor"/>
      <Zh3 :editor="editor"/>
      <Zh4 :editor="editor"/>
    </div>
  </div>
</template>

<style scoped>
@import "../../../assets/css/index.css";
</style>