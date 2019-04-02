<template>
  <div class="buttons-container hunting">
    <button
      class="danger"
      v-if="!resolvedRoadCard && playerHasAmmo != -1"
      @click="hunt"
    >
      Use Ammo To Hunt
    </button>
    <button class="caution" v-if="!resolvedRoadCard" @click="skip">
      Skip Hunting
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HuntingActions',
  computed: {
    playerHasAmmo() {
      return this.playerSupplyCards
        .map(function(e) {
          return e.type
        })
        .indexOf('Ammo')
    },
    ...mapState({
      currentRoadCard: state => state.currentRoadCard,
      playerSupplyCards: state => state.playerSupplyCards,
      resolvedRoadCard: state => state.resolvedRoadCard,
      supplyCards: state => state.supplyCards
    })
  },
  methods: {
    hunt() {
      let message
      let roll = this.getRandomInt(1, 10)

      // Update state
      this.$store.dispatch('removeUsedSupply', this.playerHasAmmo)

      if (roll > 5) {
        message = `Great job you rolled a ${roll} got food!  Play next road card`
        let foodAddedToSupplies = this.addToHand(
          this.currentRoadCard,
          this.playerSupplyCards
        )

        // Update state
        this.$store.dispatch('supplyCardsDelt', foodAddedToSupplies)
      } else {
        message = `You missed by rolling a ${roll}!  Better luck next time.  Play next road card`
      }

      // Update state with message
      this.$store.dispatch('updateMessage', message)
      this.$store.dispatch('setRoadCardResolved', true)
    },
    skip() {
      let message

      if (this.playerHasAmmo != -1) {
        message = `Not worth risking ammo.  Play next road card`
      } else {
        message = `Dang no ammo.  Play next road card`
      }

      // Set state status and update message
      this.$store.dispatch('updateMessage', message)
      this.$store.dispatch('setRoadCardResolved', true)
    }
  }
}
</script>

<style scoped>
.buttons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}
</style>
