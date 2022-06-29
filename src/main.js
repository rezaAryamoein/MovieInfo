import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import VueDatepickerUi from 'vue-datepicker-ui'
import 'vue-datepicker-ui/lib/vuedatepickerui.css';


import "bootstrap/dist/css/bootstrap.min.css"

import VueIco, {icoClose, icoKeyboardArrowDown} from 'vue-ico'


createApp(App).use(store).use(VueIco).use(router).use('Datepicker', VueDatepickerUi).use(VueAxios, axios).mount('#app')
import "bootstrap/dist/js/bootstrap.js"
