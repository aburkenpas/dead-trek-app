<template>
  <div class="fight-buttons">
    <div class="buttons-container">
      <button @click="fight('melee')">Melee Attack</button>
      <!-- Need to check if card is in players hand for bottom two -->
      <button
        v-if="playerSupplyCards.find(ammo => ammo.type === 'Ammo')"
        @click="fight('ammo')"
      >
        Ammo Attack
      </button>
      <button
        v-if="
          playerSupplyCards.find(molotov => molotov.type === 'Molotov') &&
            !looting
        "
        @click="fight('molotov')"
      >
        Molotov Attack
      </button>
      <!-- Need to add die roll step -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FightActions',
  props: {
    currentEvent: {
      type: Number
    },
    events: {
      type: Number
    }
  },
  computed: mapState({
    currentRoadCard: state => state.currentRoadCard,
    playerSupplyCards: state => state.playerSupplyCards,
    looting: state => state.looting,
    currentLootCard: state => state.currentLootCard
  }),
  methods: {
    fight: function(attack) {
      let cardStats
      let numberToDefeat
      let roll
      let cardIndex
      let message

      // Determine if fighting in store
      if (this.looting) {
        cardStats = this.currentLootCard
      } else {
        cardStats = this.currentRoadCard
      }

      // Set win number and update play card state if ammo or molotov
      if (attack == 'melee') {
        numberToDefeat = cardStats.melee
      } else if (attack == 'ammo') {
        numberToDefeat = cardStats.ammo
        cardIndex = this.playerSupplyCards.indexOf('Ammo')

        // Update supply state
        this.$store.dispatch('removeUsedSupply', cardIndex)
      } else if (attack == 'molotov') {
        numberToDefeat = this.currentRoadCard.molotov
        cardIndex = this.playerSupplyCards.indexOf('Molotov')

        // Update supply state
        this.$store.dispatch('removeUsedSupply', cardIndex)
      }

      // Set player die roll
      roll = this.getRandomInt(1, 10)

      // Determine outcome based on die roll and fight style
      if (roll >= numberToDefeat) {
        // Update state by if store or not
        if (this.looting) {
          // Set message
          if (this.currentEvent == this.events) {
            message = `Great job you got him by rolling a ${roll}. All events complete. Play your next Road card`
            this.$store.dispatch('setRoadCardResolved', true)
          } else {
            message = `Great job you got him by rolling a ${roll}. Play your next Looting card`
          }
          this.$store.dispatch('setLootActionStatus', false)
        } else {
          // Set message
          message = `Great job you got him by rolling a ${roll}. Play your next Road card`
          this.$store.dispatch('setRoadCardResolved', true)
        }

        // Update state with message
        this.$store.dispatch('updateMessage', message)
      } else {
        // Determine game status by fight style and supplies
        if (attack == 'melee') {
          // See if player has health
          cardIndex = this.playerSupplyCards.indexOf('Health')

          // Determine game status by if health
          if (cardIndex == -1) {
            // Set game message
            message = `GAME OVER`

            // Update game state to loser
            this.$store.dispatch('loser')
            this.$store.dispatch('updateMessage', message)
          } else {
            // Set message
            message = `You rolled a ${roll} and you needed to roll a ${numberToDefeat}.  You lose one health card.`

            // Update state remove used supply and send message
            this.$store.dispatch('removeUsedSupply', cardIndex)
            this.$store.dispatch('updateMessage', message)
          }
        } else {
          // Set message
          message = `You rolled a ${roll} and you needed to roll a ${numberToDefeat}`

          // Update state with message
          this.$store.dispatch('updateMessage', message)
        }
      }
    }
  }
}
</script>

<style scoped>
.message {
  width: 100%;
  color: #fff;
  font-size: 30px;
  text-align: center;
}

.fight-buttons {
  width: 100%;
}

.buttons-container {
  display: flex;
  justify-content: center;
  max-width: 700px;
  margin: 20px auto;
}
</style>
