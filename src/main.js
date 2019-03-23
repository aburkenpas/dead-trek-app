import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    getRandomInt: function(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    }
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
