<script setup>
import * as Y from "yjs";
import {WebsocketProvider} from "y-websocket";
import {useI18n} from 'vue-i18n'
import StarterKit from '@tiptap/starter-kit'
import {EditorContent, useEditor} from "@tiptap/vue-3";
import {ResizeImage} from "../extensions/resizeImage.js";
import {LetterSpacing} from "../extensions/letterSpacing.js";
import {TextStyle} from "@tiptap/extension-text-style";
import {FontFamily} from "@tiptap/extension-font-family";
import {Color} from "@tiptap/extension-color";
import {TextIndent} from "../extensions/textIndex.js";
import {Subscript} from "@tiptap/extension-subscript";
import {Superscript} from "@tiptap/extension-superscript";
import {TaskList} from "@tiptap/extension-task-list";
import {TaskItem} from "@tiptap/extension-task-item";
import {TextAlign} from "@tiptap/extension-text-align";
import {Table} from "@tiptap/extension-table";
import {TableRow} from "@tiptap/extension-table-row";
import {TableHeader} from "@tiptap/extension-table-header";
import {TableCell} from "@tiptap/extension-table-cell";
import {Collaboration} from "@tiptap/extension-collaboration";
import {CollaborationCursor} from "@tiptap/extension-collaboration-cursor";
import {Placeholder} from "@tiptap/extension-placeholder";
import {CodeBlockLowlight} from "@tiptap/extension-code-block-lowlight";
import {all, createLowlight} from 'lowlight';
import {h, ref} from "vue";
import ZItalic from "./components/ZItalic.vue";
import ZBlob from "./components/ZBlob.vue";
import ZStrike from "./components/ZStrike.vue";
import ZHeading from "./components/ZHeading.vue";
import ZOrderedList from "./components/ZOrderedList.vue";
import ZBulletList from "./components/ZBulletList.vue";
import ZTaskList from "./components/ZTaskList.vue";
import ZUnderline from "./components/ZUnderline.vue";
import ZCode from "./components/ZCode.vue";
import ZCodeBlock from "./components/ZCodeBlock.vue";
import ZSubscript from "./components/ZSubscript.vue";
import ZSuperscript from "./components/ZSuperscript.vue";
import ZBlockquote from "./components/ZBlockquote.vue";
import ZAlignLeft from "./components/ZAlignLeft.vue";
import ZAlignCenter from "./components/ZAlignCenter.vue";
import ZAlignRight from "./components/ZAlignRight.vue";
import ZAlignJustify from "./components/ZAlignJustify.vue";
import ZImage from "./components/ZImage.vue";
import ZUndo from "./components/ZUndo.vue";
import ZRedo from "./components/ZRedo.vue";
import ZFontColor from "./components/ZFontColor.vue";
import ZHighlight from "./components/ZHighlight.vue";
import ZListItem from "./components/ZListItem.vue";
import Ztable from "./components/table/Ztable.vue";
import ZFontFamily from "./components/ZFontFamily.vue";
import ZTableOperate from "./components/table/ZTableOperate.vue";
import ZTextIndex from "./components/ZTextIndex.vue";
import ZLetterSpacing from "./components/ZLetterSpacing.vue";
import 'katex/dist/katex.min.css'
import {Mathematics} from "@tiptap/extension-mathematics";


const lowlight = createLowlight(all)
const {t, locale} = useI18n()
// 创建共享文档
// const ydoc = new Y.Doc()
// 连接 WebSocket 服务
// const provider = new WebsocketProvider('ws://localhost:30333/yjs', 'ws-tiptap', ydoc)
// 实例化编辑器
const editor = useEditor({
  content: ``,
  extensions: [
    TextStyle,
    FontFamily.configure({
      types: ['textStyle'],
    }),
    Color.configure({
      types: ['textStyle'],
    }),
    TextIndent,
    LetterSpacing,
    Subscript,
    Superscript,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    ResizeImage.configure({
      inline: true,
      allowBase64: true
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Mathematics,
    StarterKit.configure({
      // history: false, //使用 Tiptap 的 Collaboration 时，它带有自己的历史扩展，您必须禁用 StarterKit 中包含的扩展以避免冲突。Undo/Redo History
      codeBlock: false
    }),
    Placeholder.configure({
      placeholder: t('editor.placeholder'),
    }),
    /*Collaboration.configure({
      document: ydoc,
    }),
    CollaborationCursor.configure({
      provider: provider,
      user: {
        name: 'User A',
        color: '#ffcc00',
      },
    }),*/
  ],
  onSelectionUpdate: ({editor}) => {
    handle_table_sel(editor)
  },
})
const toolbar_obj = ref({
  bold: () => h(ZBlob, {editor: editor.value}),
  italic: () => h(ZItalic, {editor: editor.value}),
  strike: () => h(ZStrike, {editor: editor.value}),
  heading: () => h(ZHeading, {editor: editor.value}),
  orderedList: () => h(ZOrderedList, {editor: editor.value}),
  bulletList: () => h(ZBulletList, {editor: editor.value}),
  taskList: () => h(ZTaskList, {editor: editor.value}),
  listItem: () => h(ZListItem, {editor: editor.value}),
  underline: () => h(ZUnderline, {editor: editor.value}),
  code: () => h(ZCode, {editor: editor.value}),
  codeBlock: () => h(ZCodeBlock, {editor: editor.value}),
  subscript: () => h(ZSubscript, {editor: editor.value}),
  superscript: () => h(ZSuperscript, {editor: editor.value}),
  blockquote: () => h(ZBlockquote, {editor: editor.value}),
  alignLeft: () => h(ZAlignLeft, {editor: editor.value}),
  alignCenter: () => h(ZAlignCenter, {editor: editor.value}),
  alignRight: () => h(ZAlignRight, {editor: editor.value}),
  alignJustify: () => h(ZAlignJustify, {editor: editor.value}),
  image: () => h(ZImage, {editor: editor.value}),
  undo: () => h(ZUndo, {editor: editor.value}),
  redo: () => h(ZRedo, {editor: editor.value}),
  fontColor: () => h(ZFontColor, {editor: editor.value}),
  fontFamily: () => h(ZFontFamily, {editor: editor.value}),
  highlight: () => h(ZHighlight, {editor: editor.value}),
  table: () => h(Ztable, {editor: editor.value}),
  textIndex: () => h(ZTextIndex, {editor: editor.value}),
  letterSpacing: () => h(ZLetterSpacing, {editor: editor.value}),
})
const toolbar_group = ref([
  [
    toolbar_obj.value['undo'],
    toolbar_obj.value['redo'],
  ],
  [
    toolbar_obj.value['bold'],
    toolbar_obj.value['italic'],
    toolbar_obj.value['strike'],
    toolbar_obj.value['blockquote'],
    toolbar_obj.value['underline'],
  ],
  [
    toolbar_obj.value['heading'],
    toolbar_obj.value['listItem'],
  ],
  [
    toolbar_obj.value['code'],
    toolbar_obj.value['codeBlock'],
  ],
  [
    toolbar_obj.value['superscript'],
    toolbar_obj.value['subscript'],
  ],
  [
    toolbar_obj.value['alignLeft'],
    toolbar_obj.value['alignCenter'],
    toolbar_obj.value['alignRight'],
    toolbar_obj.value['alignJustify'],
  ],
  [
    toolbar_obj.value['image'],
    toolbar_obj.value['table']
  ],
  [
    toolbar_obj.value['fontColor'],
    toolbar_obj.value['highlight'],
    toolbar_obj.value['fontFamily'],
  ],
  [
    toolbar_obj.value['textIndex'],
    toolbar_obj.value['letterSpacing']
  ]
])
const table_operate_obj = ref({
  visible: false,
  top: 0,
  left: 0,
  posDir: 'top'
})

const handle_table_sel = (editor) => {
  const isInTable = editor.isActive('table')
  table_operate_obj.value.visible = isInTable

  if (isInTable) {
    const dom = editor.view.domAtPos(editor.state.selection.$anchor.pos).node
    const tableEl = dom.closest('table')
    if (tableEl) {
      const rect = tableEl.getBoundingClientRect()
      const margin = 50 // 控件浮层高度

      // 判断视口上方/下方是否有空间
      const spaceAbove = rect.top - 30
      const spaceBelow = window.innerHeight - rect.bottom
      // console.log(spaceBelow, spaceAbove)
      if (spaceAbove > margin) {
        table_operate_obj.value.posDir = 'top'
        table_operate_obj.value.top = rect.top + window.scrollY - margin + 40
        table_operate_obj.value.left = rect.left + window.scrollX + rect.width / 2
      } else {
        table_operate_obj.value.posDir = 'bottom'
        table_operate_obj.value.top = rect.bottom + window.scrollY + 10
        table_operate_obj.value.left = rect.left + window.scrollX + rect.width / 2
      }
    }
  }
}


// 语言切换时，重建编辑器
/*watch(() => locale, () => {
  if (editor.value) {
    editor.value.view.updateState(editor.value.state) // 手动刷新 placeholder
  }
})*/

</script>

<template>
  <div class="tiptap-editor-box" v-if="editor">
    <!-- 工具栏 -->
    <div class="tiptap-btn-box">
      <div class="tiptap-btn-group-box" v-for="(item, index) in toolbar_group" :key="index">
        <Component :is="items" v-for="(items, idx) in item" :key="idx"/>
      </div>
    </div>
    <!-- 编辑区 -->
    <editor-content :editor="editor" class="tiptap-content-box"/>

    <!--表格操作区-->
    <z-table-operate :editor="editor" v-model="table_operate_obj.visible" :style="{
    position: 'absolute',
    top: `${table_operate_obj.top}px`,
    left: `${table_operate_obj.left}px`,
    transform: table_operate_obj.posDir === 'top'
      ? 'translate(-50%, -100%)'
      : 'translate(-50%, 0)',
  }" :pos.sync="table_operate_obj.posDir === 'top' ? 'bottom' : 'top'"/>
  </div>
</template>

<style scoped>
/* 推荐添加基本样式 */
:deep(.ProseMirror) {
  :first-child {
    margin-top: 0;
  }

  outline: none;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  height: calc(100% - 5px);
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;

  p {
    word-break: break-all;
  }

  /*展示新段落内容为空时的提示语*/

  p.is-empty::before {
    content: attr(data-placeholder);
    color: #aaa;
    float: left;
    height: 0;
    pointer-events: none;
  }

  blockquote {
    border-left: 3px solid rgba(61, 37, 20, .12);
    margin: 1rem 0;
    padding-left: .5rem;
  }

  code {
    background-color: mediumpurple;
    border-radius: 0.4rem;
    color: black;
    font-size: 0.85rem;
    padding: 3px 5px;
  }

  pre {
    background: black;
    border-radius: 0.5rem;
    color: white;
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }

    /* Code styling */

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  /* List styles */

  ul, ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-bottom: 0.25em;
    }
  }

  /* Task list specific styles */

  ul[data-type="taskList"] {
    list-style: none;
    margin-left: 0;
    padding: 0;

    li {
      align-items: flex-start;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }

    input[type="checkbox"] {
      cursor: pointer;
    }

    ul[data-type="taskList"] {
      margin: 0;
    }
  }

  /* Heading styles */

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1, h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4, h5, h6 {
    font-size: 1rem;
  }

  /* Table-specific styling */

  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td, th {
      border: 1px solid rgba(61, 37, 20, .12);
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      background-color: rgba(61, 37, 20, .05);
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: rgba(61, 37, 20, .08);
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: #6A00F5;
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  /* Mathematics extension styles*/
  .Tiptap-mathematics-editor {
    background: #202020;
    color: #fff;
    font-family: monospace;
    padding: 0.2rem 0.5rem;
  }

  .Tiptap-mathematics-render {
    padding: 0 0.25rem;

    &--editable {
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #eee;
      }
    }
  }

  .Tiptap-mathematics-editor,
  .Tiptap-mathematics-render {
    border-radius: 0.25rem;
    display: inline-block;
  }

  /* Give a remote user a caret */
  .collaboration-cursor__caret {
    border-left: 1px solid #0d0d0d;
    border-right: 1px solid #0d0d0d;
    margin-left: -1px;
    margin-right: -1px;
    pointer-events: none;
    position: relative;
    word-break: normal;
  }

  /* Render the username above the caret */
  .collaboration-cursor__label {
    border-radius: 3px 3px 3px 0;
    color: #0d0d0d;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    left: -1px;
    line-height: normal;
    padding: 0.1rem 0.3rem;
    position: absolute;
    top: -1.4em;
    user-select: none;
    white-space: nowrap;
  }

}

.tiptap-editor-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

.tiptap-btn-box {
  display: flex;
  align-items: center;
  margin: 3px 0;

  .tiptap-btn-group-box {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .tiptap-btn-group-box + .tiptap-btn-group-box {
    border-left: 1px solid #cccccc;
  }
}

.tiptap-content-box {
  flex: 1;
}
</style>