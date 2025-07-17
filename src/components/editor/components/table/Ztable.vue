<script setup>
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import ZIcon from "../../../ZIcon.vue";

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
const mouseRow = ref(1)
const mouseCol = ref(1)

const handle_click = () => {
  groupVisible.value = !groupVisible.value
  if (!groupVisible.value) {
    resetOver()
  }
}
const handle_close_group = () => {
  groupVisible.value = false
  resetOver()
}
const resetOver = () => {
  mouseRow.value = 1
  mouseCol.value = 1
}
const handle_table_over = (e) => {
  const cell = e.target.closest('.tiptap-table-small-cell-box')
  if (!cell) return
  mouseCol.value = parseInt(cell.dataset.col)
  mouseRow.value = parseInt(cell.dataset.row)
}
const handle_table_click = () => {
  props.editor.chain().focus().insertTable({ rows: mouseRow.value, cols: mouseCol.value, withHeaderRow: true }).run()
  handle_close_group()
}
</script>

<template>
  <div class="tiptap-btn-icon-box" v-click-outside="handle_close_group">
    <z-icon :title="t('editor.toolbar.table')" @click="handle_click" :active.sync="editor?.isActive('table')">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
           :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
           class="tiptap-btn-icon">
        <path d="M12 3v18"/>
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M3 9h18"/>
        <path d="M3 15h18"/>
      </svg>
      <svg width="24" height="24" class="button-dropdown-small"
           viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
              :fill="color"></path>
      </svg>
    </z-icon>
    <div class="tiptap-btn-group" v-if="groupVisible" @mouseover="handle_table_over" @click="handle_table_click">
      <div v-for="col in 10" :key="col" class="tiptap-table-small-box">
        <div v-for="row in 10" :key="row" class="tiptap-table-small-cell-box"
             :class="{'tiptap-table-small-cell-box-active' : row <= mouseRow && col <= mouseCol}"
             :data-row="row" :data-col="col"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../../../assets/css/index.css";
</style>