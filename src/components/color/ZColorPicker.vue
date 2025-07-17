<template>
  <div class="color-picker" :style="style">
    <!-- 颜色预览 -->
    <div class="color-preview" :style="{ backgroundColor: currentColor }"></div>

    <!-- 拾色盘 -->
    <div
        class="saturation-panel"
        ref="saturationPanel"
        @mousedown="startSaturationDrag"
        @touchstart.passive="startSaturationDrag"
        :style="{ backgroundColor: `hsl(${hue}, 100%, 50%)` }"
    >
      <div class="saturation-white">
        <div class="saturation-black"></div>
        <div
            class="picker-cursor"
            :style="{
            left: `${saturation * 100}%`,
            top: `${(1 - brightness) * 100}%`,
          }"
        ></div>
      </div>
    </div>

    <!-- 色相条 -->
    <div
        class="hue-slider"
        ref="hueSlider"
        @mousedown="startHueDrag"
        @touchstart.passive="startHueDrag"
    >
      <div
          class="hue-slider-thumb"
          :style="{ left: `${hue / 3.6}%` }"
      ></div>
    </div>

    <!-- 颜色值显示 -->
    <div class="color-values">
      <div class="color-input-group">
        <label>HEX</label>
        <input type="text" v-model="hexValue" @input="updateFromHex" @blur="validateHex"/>
      </div>
      <div class="color-input-group">
        <label>RGB</label>
        <input type="number" v-model.number="rgb.r" min="0" max="255" @input="updateFromRgb"/>
        <input type="number" v-model.number="rgb.g" min="0" max="255" @input="updateFromRgb"/>
        <input type="number" v-model.number="rgb.b" min="0" max="255" @input="updateFromRgb"/>
      </div>
      <div class="color-input-group">
        <label>HSV</label>
        <input type="number" v-model.number="hsv.h" min="0" max="360" @input="updateFromHsv"/>
        <input type="number" v-model.number="hsv.s" min="0" max="100" @input="updateFromHsv"/>
        <input type="number" v-model.number="hsv.v" min="0" max="100" @input="updateFromHsv"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const model = defineModel({default: '#ff0000'})
const props = defineProps({
  style: {
    type: Object,
    default: () => ({})
  }
})

// 合并样式，确保父组件传入的样式优先级更高
const style = computed(() => ({
  '--color-picker-width': '260px', // 默认值
  ...props.style // 父组件传入的样式会覆盖默认值
}))

// DOM 引用
const saturationPanel = ref(null)
const hueSlider = ref(null)

// 颜色值
const hexValue = ref(model.value)
const rgb = ref({
  r: 255,
  g: 0,
  b: 0
})
const hsv = ref({
  h: 0,
  s: 100,
  v: 100
})

// 计算属性
const saturation = computed(() => hsv.value.s / 100)
const brightness = computed(() => hsv.value.v / 100)
const hue = computed(() => hsv.value.h)

const currentColor = computed(() => {
  return `rgb(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b})`
})

// HSV 转 RGB
const hsvToRgb = (h, s, v) => {
  s = s / 100
  v = v / 100
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2 - 1)))
  const m = v - c

  let r = 0, g = 0, b = 0

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  }
}

// RGB 转 HSV
const rgbToHsv = (r, g, b) => {
  r = r / 255
  g = g / 255
  b = b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6
    else if (max === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4

    h = Math.round(h * 60)
    if (h < 0) h += 360
  }

  const s = max === 0 ? 0 : Math.round((delta / max) * 100)
  const v = Math.round(max * 100)

  return { h, s, v }
}

// RGB 转 HEX
const rgbToHex = (r, g, b) => {
  return `#${[r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')}`
}

// HEX 转 RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// 更新所有颜色值
const updateAllValues = () => {
  // 更新 RGB
  const newRgb = hsvToRgb(hsv.value.h, hsv.value.s, hsv.value.v)
  rgb.value = newRgb

  // 更新 HEX
  hexValue.value = rgbToHex(newRgb.r, newRgb.g, newRgb.b)

  // 触发更新
  model.value = hexValue.value
}

// 从 HSV 更新
const updateFromHsv = () => {
  hsv.value.s = Math.min(100, Math.max(0, hsv.value.s))
  hsv.value.v = Math.min(100, Math.max(0, hsv.value.v))
  hsv.value.h = hsv.value.h % 360
  if (hsv.value.h < 0) hsv.value.h += 360

  updateAllValues()
}

// 从 RGB 更新
const updateFromRgb = () => {
  rgb.value.r = Math.min(255, Math.max(0, rgb.value.r))
  rgb.value.g = Math.min(255, Math.max(0, rgb.value.g))
  rgb.value.b = Math.min(255, Math.max(0, rgb.value.b))

  hsv.value = rgbToHsv(rgb.value.r, rgb.value.g, rgb.value.b)
  hexValue.value = rgbToHex(rgb.value.r, rgb.value.g, rgb.value.b)

  // 触发更新
  model.value = hexValue.value
}

// 从 HEX 更新
const updateFromHex = () => {
  if (/^#[0-9A-F]{6}$/i.test(hexValue.value)) {
    const newRgb = hexToRgb(hexValue.value)
    if (newRgb) {
      rgb.value = newRgb
      hsv.value = rgbToHsv(newRgb.r, newRgb.g, newRgb.b)
      // 触发更新
      model.value = hexValue.value
    }
  }
}

// HEX 验证
const validateHex = () => {
  if (!/^#[0-9A-F]{6}$/i.test(hexValue.value)) {
    hexValue.value = rgbToHex(rgb.value.r, rgb.value.g, rgb.value.b)
  }
}

// 开始拾色盘拖动
const startSaturationDrag = (e) => {
  e.preventDefault()

  const moveHandler = (moveEvent) => {
    if (!saturationPanel.value) return

    const rect = saturationPanel.value.getBoundingClientRect()
    let clientX = 0
    let clientY = 0

    if (moveEvent.touches) {
      clientX = moveEvent.touches[0].clientX
      clientY = moveEvent.touches[0].clientY
    } else {
      clientX = moveEvent.clientX
      clientY = moveEvent.clientY
    }

    let x = clientX - rect.left
    let y = clientY - rect.top

    x = Math.max(0, Math.min(rect.width, x))
    y = Math.max(0, Math.min(rect.height, y))

    hsv.value.s = Math.round((x / rect.width) * 100)
    hsv.value.v = 100 - Math.round((y / rect.height) * 100)
    updateAllValues()
  }

  const upHandler = () => {
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('touchmove', moveHandler)
    document.removeEventListener('mouseup', upHandler)
    document.removeEventListener('touchend', upHandler)
  }

  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('touchmove', moveHandler, { passive: false })
  document.addEventListener('mouseup', upHandler)
  document.addEventListener('touchend', upHandler)

  // 触发第一次更新
  moveHandler(e)
}

// 开始色相条拖动
const startHueDrag = (e) => {
  e.preventDefault()

  const moveHandler = (moveEvent) => {
    if (!hueSlider.value) return

    const rect = hueSlider.value.getBoundingClientRect()
    let clientX = 0

    if (moveEvent.touches) {
      clientX = moveEvent.touches[0].clientX
    } else {
      clientX = moveEvent.clientX
    }

    let x = clientX - rect.left
    x = Math.max(0, Math.min(rect.width, x))

    hsv.value.h = Math.round((x / rect.width) * 360)
    updateAllValues()
  }

  const upHandler = () => {
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('touchmove', moveHandler)
    document.removeEventListener('mouseup', upHandler)
    document.removeEventListener('touchend', upHandler)
  }

  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('touchmove', moveHandler, { passive: false })
  document.addEventListener('mouseup', upHandler)
  document.addEventListener('touchend', upHandler)

  // 触发第一次更新
  moveHandler(e)
}

// 初始化颜色
const initColor = (hex) => {
  const newRgb = hexToRgb(hex)
  if (newRgb) {
    rgb.value = newRgb
    hsv.value = rgbToHsv(newRgb.r, newRgb.g, newRgb.b)
    hexValue.value = hex
  }
}

// 监听 props.modelValue 变化
watch(() => model.value, (newVal) => {
  if (newVal !== hexValue.value) {
    initColor(newVal)
  }
})

// 组件挂载时初始化
onMounted(() => {
  initColor(model.value)
})

</script>

<style scoped>
.color-picker {
  display: inline-flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: var(--color-picker-width, 260px);
  box-sizing: border-box;
}

.color-preview {
  width: 100%;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.saturation-panel {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 4px;
  overflow: hidden;
  cursor: crosshair;
}

.saturation-white {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}

.saturation-black {
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}

.picker-cursor {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  border-radius: 50%;
  transform: translate(-6px, -6px);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  pointer-events: none;
}

.hue-slider {
  position: relative;
  width: 100%;
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(
      to right,
      #ff0000,
      #ffff00,
      #00ff00,
      #00ffff,
      #0000ff,
      #ff00ff,
      #ff0000
  );
  cursor: ew-resize;
}

.hue-slider-thumb {
  position: absolute;
  width: 6px;
  height: 16px;
  top: -2px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  transform: translateX(-3px);
  pointer-events: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
}

.color-values {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.color-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-input-group label {
  width: 32px;
  font-size: 12px;
  color: #666;
}

.color-input-group input {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
  outline: 1px solid #9ccfed;
}

.color-input-group input[type="number"]::-webkit-inner-spin-button,
.color-input-group input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>