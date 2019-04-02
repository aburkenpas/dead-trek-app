<template>
  <div class="fight-buttons">
    <div class="buttons-container">
      <button class="danger" @click="fight('melee')">Melee Attack</button>
      <!-- Need to check if card is in players hand for bottom two -->
      <button
        class="danger"
        v-if="playerSupplyCards.find(ammo => ammo.type === 'Ammo')"
        @click="fight('ammo')"
      >
        Ammo Attack
      </button>
      <button
        class="danger"
        v-if="
          playerSupplyCards.find(molotov => molotov.type === 'Molotov') &&
            !looting
        "
        @click="fight('molotov')"
      >
        Molotov Attack
      </button>
      <button
        class="danger"
        v-if="
          playerSupplyCards.find(molotov => molotov.type === 'Special') &&
            !looting
        "
        @click="useSpecial"
      >
        Use Special
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
  data() {
    return {
      hitPointsRemoved: 1
    }
  },
  computed: {
    enemyHitPoints() {
      return this.currentRoadCard.hitPoints
    },
    ...mapState({
      currentRoadCard: state => state.currentRoadCard,
      playerSupplyCards: state => state.playerSupplyCards,
      looting: state => state.looting,
      currentLootCard: state => state.currentLootCard
    })
  },
  methods: {
    useSpecial() {
      let message = `That thing works well!  Play next Road card`

      // Find ammo in playerhand
      let cardIndex = this.playerSupplyCards
        .map(function(e) {
          return e.type
        })
        .indexOf('Special')

      // Set state
      this.$store.dispatch('removeUsedSupply', cardIndex)
      this.$store.dispatch('setRoadCardResolved', true)
      this.$store.dispatch('updateMessage', message)
    },
    fight(attack) {
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

        // Find ammo in playerhand
        cardIndex = this.playerSupplyCards
          .map(function(e) {
            return e.type
          })
          .indexOf('Ammo')

        // Update supply state
        this.$store.dispatch('removeUsedSupply', cardIndex)
      } else if (attack == 'molotov') {
        numberToDefeat = this.currentRoadCard.molotov

        // Find molotov in playerhand
        cardIndex = this.playerSupplyCards
          .map(function(e) {
            return e.type
          })
          .indexOf('Molotov')

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
            this.$store.dispatch('lootingStatus', false)
          } else {
            message = `Great job you got him by rolling a ${roll}. Play your next Looting card`
          }
          this.$store.dispatch('setCurrentLootingCard', 'Start Next Loot')
          this.$store.dispatch('setLootActionStatus', false)
        } else {
          if (this.enemyHitPoints == this.hitPointsRemoved) {
            // Set message
            message = `Great job you got it by rolling a ${roll}. Play your next Road card.`
            this.$store.dispatch('setRoadCardResolved', true)
          } else {
            let hitPointsToGo = this.enemyHitPoints - this.hitPointsRemoved

            // Set message
            message = `Great job you got it by rolling a ${roll}. Knock off another hitpoint! Only ${hitPointsToGo} to go.`
          }

          // Iterate the hitpoints removed
          this.hitPointsRemoved++
        }

        // Update state with message
        this.$store.dispatch('updateMessage', message)
      } else {
        // Determine game status by fight style and supplies
        if (attack == 'melee') {
          // See if player has health
          cardIndex = this.playerSupplyCards
            .map(function(e) {
              return e.type
            })
            .indexOf('Health')

          // Determine game status by if health
          if (cardIndex == -1) {
            // Set game message
            message = `GAME OVER`

            // Update game state to loser
            this.$store.dispatch('loser')
            this.$store.dispatch('updateMessage', message)
            this.$store.dispatch('setRoadCardResolved', true) // To clear out buttons
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
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}
</style>
