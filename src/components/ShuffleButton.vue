<template>
  <div v-if="!playing" class="shuffle-button-container">
    <button @click="deal">Deal Supply Cards</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ShuffleButton',
  computed: mapState({
    supplyCards: state => state.supplyCards,
    playing: state => state.playing,
    playerSupplyCards: state => state.playerSupplyCards
  }),
  methods: {
    deal() {
      let startingCardAmount = 15
      let drawnCards

      drawnCards = this.drawCard(startingCardAmount, this.supplyCards)

      // Sort cards
      drawnCards.sort((a, b) =>
        a.type > b.type ? 1 : b.type > a.type ? -1 : 0
      )

      // Change state
      this.$store.dispatch('startGame')
      this.$store.dispatch('supplyCardsDelt', drawnCards)
    }
  }
}
</script>

<style>
.shuffle-button-container {
  padding: 50px 0;
}
</style>
