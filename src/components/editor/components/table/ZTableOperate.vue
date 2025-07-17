<script setup>
import ZIcon from "../../../ZIcon.vue";
import {useI18n} from "vue-i18n";

const model = defineModel()
const {t} = useI18n()
const props = defineProps({
  editor: {
    type: Object,
    required: true
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  pos: {
    type: String,
    default: 'top',
  }
})

const handle_click_insert_col_before = () => {
  props.editor.chain().focus().addColumnBefore().run()
}
const handle_click_insert_col_after = () => {
  props.editor.chain().focus().addColumnAfter().run()
}
const handle_click_del_col = () => {
  props.editor.chain().focus().deleteColumn().run()
}
const handle_click_insert_row_before = () => {
  props.editor.chain().focus().addRowBefore().run()
}
const handle_click_insert_row_after = () => {
  props.editor.chain().focus().addRowAfter().run()
}
const handle_click_del_row = () => {
  props.editor.chain().focus().deleteRow().run()
}
const handle_click_del_table = () => {
  props.editor.chain().focus().deleteTable().run()
}
const handle_click_merge_cell = () => {
  props.editor.chain().focus().mergeCells().run()
}
const handle_click_split_cell = () => {
  props.editor.chain().focus().splitCell().run()
}
</script>

<template>
  <div v-if="model" :class="`tiptap-float-group tiptap-table-box tiptap-table-box-${pos}`">
    <div class="tiptap-table-operate-group">
      <z-icon :title="t('editor.toolbar.delTable')" @click="handle_click_del_table">
        <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="tiptap-btn-icon">
          <g fill-rule="nonzero" :fill="color">
            <path d="M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14ZM5 6v12h14V6H5Z"></path>
            <path d="m14.4 8.6 1.1 1-2.4 2.4 2.4 2.4-1.1 1.1-2.4-2.4-2.4 2.4-1-1.1 2.3-2.4-2.3-2.4 1-1 2.4 2.3z"></path>
          </g>
        </svg>
      </z-icon>
      <z-icon :title="t('editor.toolbar.mergeCell')" @click="handle_click_merge_cell">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="tiptap-btn-icon">
          <path d="M12 21v-6"/>
          <path d="M12 9V3"/>
          <path d="M3 15h18"/>
          <path d="M3 9h18"/>
          <rect width="18" height="18" x="3" y="3" rx="2"/>
        </svg>
      </z-icon>
      <z-icon :title="t('editor.toolbar.splitCell')" @click="handle_click_split_cell">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="tiptap-btn-icon">
          <path d="M12 15V9"/>
          <path d="M3 15h18"/>
          <path d="M3 9h18"/>
          <rect width="18" height="18" x="3" y="3" rx="2"/>
        </svg>
      </z-icon>
    </div>
    <div class="tiptap-table-operate-group">
      <z-icon :title="t('editor.toolbar.insertColumnBefore')" @click="handle_click_insert_col_before">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="tiptap-btn-icon">
          <path fill-rule="nonzero"
                d="M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v1h8V6H5v1a1 1 0 1 1-2 0V5c0-.6.4-1 1-1h15Zm0 9h-4v5h4v-5ZM8 8c.5 0 1 .4 1 .9V11h2a1 1 0 0 1 .1 2H9v2a1 1 0 0 1-2 .1V13H5a1 1 0 0 1-.1-2H7V9c0-.6.4-1 1-1Zm11-2h-4v5h4V6Z"
                :fill="color"></path>
        </svg>
      </z-icon>
      <z-icon :title="t('editor.toolbar.insertColumnAfter')" @click="handle_click_insert_col_after">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="tiptap-btn-icon">
          <path fill-rule="nonzero"
                d="M20 4c.6 0 1 .4 1 1v2a1 1 0 0 1-2 0V6h-8v12h8v-1a1 1 0 0 1 2 0v2c0 .5-.4 1-.9 1H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h15ZM9 13H5v5h4v-5Zm7-5c.5 0 1 .4 1 .9V11h2a1 1 0 0 1 .1 2H17v2a1 1 0 0 1-2 .1V13h-2a1 1 0 0 1-.1-2H15V9c0-.6.4-1 1-1ZM9 6H5v5h4V6Z"
                :fill="color"></path>
        </svg>
      </z-icon>
      <z-icon :title="t('editor.toolbar.delColumn')" @click="handle_click_del_col">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="tiptap-btn-icon">
          <path fill-rule="nonzero"
                d="M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14Zm-4 4h-2V6h-2v2H9V6H5v12h4v-2h2v2h2v-2h2v2h4V6h-4v2Zm.3.5 1 1.2-3 2.3 3 2.3-1 1.2L12 13l-3.3 2.6-1-1.2 3-2.3-3-2.3 1-1.2L12 11l3.3-2.5Z"
                :fill="color"></path>
        </svg>
      </z-icon>
    </div>
    <div class="tiptap-table-operate-group">
      <z-icon :title="t('editor.toolbar.insertRowBefore')" @click="handle_click_insert_row_before">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="tiptap-btn-icon">
          <path fill-rule="nonzero"
                d="M6 4a1 1 0 1 1 0 2H5v6h14V6h-1a1 1 0 0 1 0-2h2c.6 0 1 .4 1 1v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-.6.4-1 1-1h2Zm5 10H5v4h6v-4Zm8 0h-6v4h6v-4ZM12 3c.5 0 1 .4 1 .9V6h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 .1V8H9a1 1 0 0 1 0-2h2V4c0-.6.4-1 1-1Z"
                :fill="color"></path>
        </svg>
      </z-icon>
      <z-icon :title="t('editor.toolbar.insertRowAfter')" @click="handle_click_insert_row_after">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="tiptap-btn-icon">
          <path fill-rule="nonzero"
                d="M12 13c.5 0 1 .4 1 .9V16h2a1 1 0 0 1 .1 2H13v2a1 1 0 0 1-2 .1V18H9a1 1 0 0 1-.1-2H11v-2c0-.6.4-1 1-1Zm6 7a1 1 0 0 1 0-2h1v-6H5v6h1a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1V6c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v13c0 .5-.4 1-.9 1H18ZM11 6H5v4h6V6Zm8 0h-6v4h6V6Z"
                :fill="color"></path>
        </svg>
      </z-icon>
      <z-icon :title="t('editor.toolbar.delRow')" @click="handle_click_del_row">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="tiptap-btn-icon">
          <path fill-rule="nonzero"
                d="M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14Zm0 2H5v3h2.5v2H5v2h2.5v2H5v3h14v-3h-2.5v-2H19v-2h-2.5V9H19V6Zm-4.7 1.8 1.2 1L13 12l2.6 3.3-1.2 1-2.3-3-2.3 3-1.2-1L11 12 8.5 8.7l1.2-1 2.3 3 2.3-3Z"
                :fill="color"></path>
        </svg>
      </z-icon>
    </div>
  </div>
</template>

<style scoped>
@import "../../../../assets/css/index.css";
</style>