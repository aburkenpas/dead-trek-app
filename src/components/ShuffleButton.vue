<template>
  <div class="shuffle-button-container">
    <button @click="deal" v-if="playerSupplyCards.length == 0">
      Deal Supply Cards
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ShuffleButton',
  data: function() {
    return {
      playerCards: [],
      supplyCards: [
        'Ammo',
        'Ammo',
        'Ammo',
        'Ammo',
        'Ammo',
        'Ammo',
        'Ammo',
        'Ammo',
        'Ammo',
        'Ammo',
        'Ammo',
        'Ammo',
        'Ammo',
        'Ammo',
        'Health',
        'Health',
        'Health',
        'Health',
        'Health',
        'Health',
        'Health',
        'Health',
        'Health',
        'Health',
        'Health',
        'Health',
        'Health',
        'Health',
        'Molotov',
        'Molotov',
        'Molotov',
        'Molotov',
        'Molotov',
        'Molotov',
        'Molotov'
      ]
    }
  },
  computed: mapState({
    playerSupplyCards: state => state.playerSupplyCards
  }),
  methods: {
    deal() {
      let startingCardAmount = 10
      let i = 0

      // Deal Cards
      while (i < startingCardAmount) {
        let supplyCardCount = this.supplyCards.length - 1
        let randomNumber = this.getRandomInt(0, supplyCardCount)
        let randomSupplyCard = this.supplyCards[randomNumber]
        this.supplyCards.splice(randomNumber, 1)
        this.playerCards.push(randomSupplyCard)
        i++
      }

      // Sort cards
      this.playerCards.sort()

      // Change state
      this.$store.dispatch('startGame')
      this.$store.dispatch('supplyCardsDelt', this.playerCards)
    }
  }
}
</script>

<style>
.shuffle-button-container {
  padding: 100px 0;
}

button {
  font-size: 20px;
  background: green;
  color: #ffffff;
  padding: 10px 40px;
  border: 0;
  border-radius: 3px;
  margin: 0 auto;
  display: block;
  cursor: pointer;
}
</style>
