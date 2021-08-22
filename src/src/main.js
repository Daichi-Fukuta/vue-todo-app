import Vue from 'vue'
import App from './App.vue'
import rotuer from './router';

Vue.config.productionTip = false

new Vue({
  router: rotuer,
  render: h => h(App),
}).$mount('#app')
