<template>
  <div class="buttons-container trap">
    <button v-if="!resolvedRoadCard" @click="useSupply">Use {{ currentRoadCard.supply }}</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TrapActions',
  computed: mapState({
    currentRoadCard: state => state.currentRoadCard,
    playerSupplyCards: state => state.playerSupplyCards,
    resolvedRoadCard: state => state.resolvedRoadCard
  }),
  methods: {
    useSupply() {
      let message

      // See if user has required card
      let cardNeeded = this.currentRoadCard.supply
      let playerHasCard = this.playerSupplyCards
        .map(function(e) {
          return e.type
        })
        .indexOf(cardNeeded)

      if (playerHasCard != -1) {
        // Set message
        message = `Good thing you had ${this.currentRoadCard.supply}`

        // Update state for resolved and remove card
        this.$store.dispatch('removeUsedSupply', playerHasCard)
        this.$store.dispatch('setRoadCardResolved', true)
      } else {
        // Set message
        message = `You didn't have ${cardNeeded}. GAME OVER`

        // Update state for loser
        this.$store.dispatch('setRoadCardResolved', true)
        this.$store.dispatch('loser')
      }

      // Update state message
      this.$store.dispatch('updateMessage', message)
    }
  }
}
</script>

<style scoped></style>
