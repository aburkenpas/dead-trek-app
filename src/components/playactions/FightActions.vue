<template>
  <div class="fight-buttons">
    <div class="buttons-container">
      <button @click="fight('melee')">Melee Attack</button>
      <!-- Need to check if card is in players hand for bottom two -->
      <button v-if="playerSupplyCards.includes('Ammo')" @click="fight('ammo')">Ammo Attack</button>
      <button v-if="playerSupplyCards.includes('Molotov')" @click="fight('molotov')">Molotov Attack</button>
      <!-- Need to add die roll step -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FightActions',
  computed: mapState({
    currentRoadCard: state => state.currentRoadCard,
    playerSupplyCards: state => state.playerSupplyCards
  }),
  methods: {
    fight: function(attack) {
      let numberToDefeat
      let roll
      let cardIndex
      let message

      if (attack == 'melee') {
        numberToDefeat = this.currentRoadCard.melee
      } else if (attack == 'ammo') {
        numberToDefeat = this.currentRoadCard.ammo
        cardIndex = this.playerSupplyCards.indexOf('Ammo')
        // Update supply state
        this.$store.dispatch('removeUsedSupply', cardIndex)
      } else if (attack == 'molotov') {
        numberToDefeat = this.currentRoadCard.molotov
        cardIndex = this.playerSupplyCards.indexOf('Molotov')
        // Update supply state
        this.$store.dispatch('removeUsedSupply', cardIndex)
      }

      roll = this.getRandomInt(1, 10)
      if (roll >= numberToDefeat) {
        message = `Great job you got him by rolling a ${roll}. Play your next Road card`
        // Update state
        this.$store.dispatch('setRoadCardResolved', true)
        this.$store.dispatch('setRoadCardResolved', true, message)
        this.$store.dispatch('updateMessage', message)
      } else {
        if (attack == 'melee') {
          cardIndex = this.playerSupplyCards.indexOf('Health')
          if (cardIndex == -1) {
            message = `GAME OVER`
            // Update state
            this.$store.dispatch('loser')
            this.$store.dispatch('updateMessage', message)
          } else {
            message = `You rolled a ${roll} and you needed to roll a ${numberToDefeat}.  You lose one health card.`
            this.$store.dispatch('removeUsedSupply', cardIndex)
            this.$store.dispatch('updateMessage', message)
          }
        } else {
          message = `You rolled a ${roll} and you needed to roll a ${numberToDefeat}`
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
.buttons-container {
  display: flex;
  justify-content: center;
  max-width: 700px;
  margin: 20px auto;
}
</style>
