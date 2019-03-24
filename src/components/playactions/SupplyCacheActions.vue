<template>
  <div class="buttons-container supply-cache">
    <button v-if="!resolvedRoadCard" @click="addTwoSupplies">
      Draw 2 Supply Cards
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SupplyCacheActions',
  computed: mapState({
    resolvedRoadCard: state => state.resolvedRoadCard,
    supplyCards: state => state.supplyCards,
    playerSupplyCards: state => state.playerSupplyCards
  }),
  methods: {
    addTwoSupplies() {
      // Draw supply card
      let supplyGained = this.drawCard(2, this.supplyCards)

      // Combine with current supplies (Mabye a better way for this)
      supplyGained.push.apply(supplyGained, this.playerSupplyCards)

      // Sort Cards
      supplyGained.sort((a, b) =>
        a.type > b.type ? 1 : b.type > a.type ? -1 : 0
      )

      // Set message
      let message = `Awesome! Free supplies`

      // Set state by updating supply cards and ending looting action
      this.$store.dispatch('supplyCardsDelt', supplyGained)
      this.$store.dispatch('updateMessage', message)
      this.$store.dispatch('setRoadCardResolved', true)
    }
  }
}
</script>

<style scoped></style>
