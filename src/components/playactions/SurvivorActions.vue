<template>
  <div class="buttons-container survivors">
    <button
      v-if="
        !resolvedRoadCard &&
          playerSupplyCards.length != 0 &&
          survivorsGreeted != true
      "
      @click="greetSurvivors"
    >
      Greet Survivors
    </button>
    <button v-if="survivorsGreeted && survivorsGood" @click="getSupply">
      Get Supply
    </button>
    <span class="supply-buttons" v-else-if="survivorsGreeted && !survivorsGood">
      <button
        v-if="playerSupplyCards.find(molotov => molotov.type === 'Ammo')"
        @click="loseSupply('Ammo')"
      >
        Give Ammo
      </button>
      <button
        v-if="playerSupplyCards.find(molotov => molotov.type === 'Health')"
        @click="loseSupply('Health')"
      >
        Give Health
      </button>
      <button
        v-if="playerSupplyCards.find(molotov => molotov.type === 'Molotov')"
        @click="loseSupply('Molotov')"
      >
        Give Molotov
      </button>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SurvivorActions',
  data: function() {
    return {
      survivorsGood: null,
      survivorsGreeted: false
    }
  },
  computed: mapState({
    currentRoadCard: state => state.currentRoadCard,
    playerSupplyCards: state => state.playerSupplyCards,
    resolvedRoadCard: state => state.resolvedRoadCard,
    supplyCards: state => state.supplyCards
  }),
  methods: {
    greetSurvivors() {
      let message

      // Set player die roll
      let roll = this.getRandomInt(1, 10)

      // Figure out if survivors are good or evil
      if (roll > 5) {
        // Set message
        message = `You rolled a ${roll}, so the survivors are good and want to give you a supply`

        this.survivorsGood = true
      } else {
        // Set message
        message = `You rolled a ${roll}, so the survivors are evil and demand a supply`

        this.survivorsGood = false

        // Check for supplies
        let hasBaseSupply = this.playerSupplyCards
          .map(function(e) {
            return e.type
          })
          .indexOf('Ammo', 'Health', 'Molotov', 'Hunting')

        // If no supplies lose game
        if (hasBaseSupply == -1) {
          // Set message
          message = `You didn't have anything to give, so the survivors took your lives. GAME OVER`

          // Update state for loser
          this.$store.dispatch('setRoadCardResolved', true)
          this.$store.dispatch('loser')
        }
      }

      // Set greeting
      this.survivorsGreeted = true

      // Update state message
      this.$store.dispatch('updateMessage', message)
    },
    getSupply() {
      // Draw supply card
      let supplyGained = this.drawCard(1, this.supplyCards)
      let cardName = supplyGained[0].type

      // Combine with current supplies (Mabye a better way for this)
      supplyGained.push.apply(supplyGained, this.playerSupplyCards)

      // Sort Cards
      supplyGained.sort((a, b) =>
        a.type > b.type ? 1 : b.type > a.type ? -1 : 0
      )

      // Set message
      let message = `You gained a ${cardName} card! Play the next Road card.`

      this.survivorsGreeted = false

      // Set state by updating supply cards and ending looting action
      this.$store.dispatch('supplyCardsDelt', supplyGained)
      this.$store.dispatch('updateMessage', message)
      this.$store.dispatch('setRoadCardResolved', true)
    },
    loseSupply(supply) {
      // Set message
      let message = `Well that wasn't very nice! Play the next Road card.`

      // Find card given up
      let cardIndex = this.playerSupplyCards
        .map(function(e) {
          return e.type
        })
        .indexOf(supply)

      this.survivorsGreeted = false

      // Update state with message and resolve card
      this.$store.dispatch('removeUsedSupply', cardIndex)
      this.$store.dispatch('updateMessage', message)
      this.$store.dispatch('setRoadCardResolved', true)
    }
  }
}
</script>

<style scoped>
.supply-buttons {
  display: flex;
  width: 100%;
}
</style>
