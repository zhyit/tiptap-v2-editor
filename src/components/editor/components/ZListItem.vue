<script setup>
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import ZBulletList from "./ZBulletList.vue";
import ZTaskList from "./ZTaskList.vue";
import ZOrderedList from "./ZOrderedList.vue";
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
    <z-icon :title="t('editor.toolbar.listItem')" @click="handle_click" :active.sync="editor?.isActive('listItem')">
      <svg width="24" height="24" class="tiptap-btn-icon" viewBox="0 0 24 24" fill="currentColor"
           xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M7 6C7 5.44772 7.44772 5 8 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H8C7.44772 7 7 6.55228 7 6Z"
              :fill="color"></path>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M7 12C7 11.4477 7.44772 11 8 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H8C7.44772 13 7 12.5523 7 12Z"
              :fill="color"></path>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M7 18C7 17.4477 7.44772 17 8 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H8C7.44772 19 7 18.5523 7 18Z"
              :fill="color"></path>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M2 6C2 5.44772 2.44772 5 3 5H3.01C3.56228 5 4.01 5.44772 4.01 6C4.01 6.55228 3.56228 7 3.01 7H3C2.44772 7 2 6.55228 2 6Z"
              :fill="color"></path>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M2 12C2 11.4477 2.44772 11 3 11H3.01C3.56228 11 4.01 11.4477 4.01 12C4.01 12.5523 3.56228 13 3.01 13H3C2.44772 13 2 12.5523 2 12Z"
              :fill="color"></path>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M2 18C2 17.4477 2.44772 17 3 17H3.01C3.56228 17 4.01 17.4477 4.01 18C4.01 18.5523 3.56228 19 3.01 19H3C2.44772 19 2 18.5523 2 18Z"
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
      <z-ordered-list :editor="editor"/>
      <z-bullet-list :editor="editor"/>
      <z-task-list :editor="editor"/>
    </div>
  </div>
</template>

<style scoped>
@import "../../../assets/css/index.css";
</style>