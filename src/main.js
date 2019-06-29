import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)
new Vuex.Store(store)

Vue.mixin({
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    },
    drawCard(amount = 1, deck) {
      let startingCardAmount = amount
      let cardsDrawn = []
      let i = 0

      // Deal Cards
      while (i < startingCardAmount) {
        let CardCount = deck.length - 1
        let randomNumber = this.getRandomInt(0, CardCount)
        let randomCard = deck[randomNumber]

        // There has to be a more eligant way to do this.
        this.$store.dispatch('removedDeltCards', randomNumber)
        cardsDrawn.push(randomCard)
        i++
      }

      return cardsDrawn
    },
    addToHand(cardToAdd, playerSupplies) {
      let itemGained = [cardToAdd]

      // Add item to supplies hand
      itemGained.push.apply(itemGained, playerSupplies)

      // Sort Cards
      itemGained.sort((a, b) =>
        a.type > b.type ? 1 : b.type > a.type ? -1 : 0
      )

      return itemGained
    }
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
