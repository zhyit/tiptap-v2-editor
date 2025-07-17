<script setup>
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import ZDialog from "../ZDialog.vue";
import ZColorPicker from "./ZColorPicker.vue";
import ZButton from "../ZButton.vue";

const model = defineModel()
const {t} = useI18n()
const emits = defineEmits(["sel", "clear"])
const presetColors = ref([
  '#000000', '#e53935', '#fbc02d', '#43a047', '#1e88e5',
  '#8e24aa', '#f06292', '#ff9800', '#795548', '#ffffff'
])
const colorPickerVisible = ref(false)

const handle_set_color = (color) => {
  model.value = color
  colorPickerVisible.value = false
  emits('sel', color)
}
const handle_unset_color = () => {
  colorPickerVisible.value = false
  emits('clear')
}
const handle_show_color_view = () => {
  colorPickerVisible.value = true
}
const handle_dialog_confirm = () => {
  handle_dialog_cancel()
  emits('sel', model.value)
}
const handle_dialog_cancel = () => {
  colorPickerVisible.value = false
}

</script>

<template>
  <div>
    <div class="font-box">
      <button
          v-for="color in presetColors"
          :key="color"
          :title="color"
          class="font-btn"
          :style="{ backgroundColor: color }"
          @click="handle_set_color(color)"
      />
    </div>
    <div style="display: flex;align-items: center;justify-content: space-between;">
      <div title="自定义颜色" @click="handle_show_color_view">
        <svg class="font-btn" width="24" height="24" fill="rgba(36, 39, 46, 0.78)" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M12 3a9 9 0 0 0 0 18 1.5 1.5 0 0 0 1.1-2.5c-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8Zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
              fill-rule="nonzero"></path>
        </svg>
      </div>
      <button @click="handle_unset_color" class="rm-btn font-btn" :title="t('editor.toolbar.reColor')">❌</button>
    </div>
    <z-dialog v-model="colorPickerVisible" width="260px">
      <z-color-picker v-model="model" @confirm="handle_set_color"/>
      <div class="btn-box">
        <z-button type="primary" @click="handle_dialog_confirm">确定</z-button>
        <z-button @click="handle_dialog_cancel">取消</z-button>
      </div>
    </z-dialog>
  </div>
</template>

<style scoped>
.font-box {
  width: 120px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 5px;
}

.font-btn {
  width: 20px;
  height: 20px;
}

.font-btn:hover {
  cursor: pointer;
}

.rm-btn {
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.btn-box {
  margin-top: 20px;
  text-align: right;
}
</style>