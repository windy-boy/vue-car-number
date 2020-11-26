import Vue from 'vue'
import App from './App.vue'
import CarNumber from '../packages'

Vue.config.productionTip = false

Vue.use(CarNumber)

new Vue({
  render: h => h(App),
}).$mount('#app')
