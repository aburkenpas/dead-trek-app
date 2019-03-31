<template>
  <div class="buttons-container bridge-down">
    <button v-if="!resolvedRoadCard" @click="addTwoCards">
      Detour Add - Two Cards
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BridgeDownActions',
  computed: mapState({
    resolvedRoadCard: state => state.resolvedRoadCard
  }),
  methods: {
    addTwoCards() {
      // Set message
      let message = `2 cards have been added to this block.  Play next Road card`

      // Update state with added cards, message and card resolved.
      this.$store.dispatch('updateMessage', message)
      this.$store.dispatch('addTwoCards')
      this.$store.dispatch('setRoadCardResolved', true)
    }
  }
}
</script>

<style scoped></style>
