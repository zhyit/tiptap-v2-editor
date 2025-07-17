import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {i18n} from './i18n'


const click_out_side = {
    beforeMount(el, binding) {
        el.clickOutsideEvent = function(event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value();
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
    },
};

createApp(App).directive('click-outside', click_out_side).use(i18n).mount('#app')
