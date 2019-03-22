<template>
  <div class="player-supply-cards">
    <slot>
      <ShuffleButton @cards-delt="deltCards" />
    </slot>
    <div class="current-hand">
      <div class="card" v-for="card in supplyCards" :key="card.id">
        <img
          v-if="card == 'Ammo'"
          src="../assets/images/cards/supply/ammo.png"
          :alt="card"
        />
        <img
          v-else-if="card == 'Health'"
          src="../assets/images/cards/supply/health.png"
          :alt="card"
        />
        <img
          v-else-if="card == 'Molotov'"
          src="../assets/images/cards/supply/molotov.png"
          :alt="card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ShuffleButton from './ShuffleButton.vue'

export default {
  name: 'PlayerSupplyCards',
  data: function() {
    return {
      supplyCards: [],
      supplyCardImages: [
        './assets/images/cards/supply/ammo.png',
        './assets/images/cards/supply/health.png'
      ]
    }
  },
  components: {
    ShuffleButton
  },
  methods: {
    deltCards: function(cards) {
      this.supplyCards = cards
      this.supplyCards.sort()
      this.$emit('started-game', true)
      this.$emit('players-cards', this.supplyCards)
      console.log(this.supplyCards)
      return this.supplyCards
    }
  }
}
</script>

<style>
.current-hand {
  background: #fff;
  display: flex;
  justify-content: space-around;
}

.card img {
  width: 100%;
}
</style>
