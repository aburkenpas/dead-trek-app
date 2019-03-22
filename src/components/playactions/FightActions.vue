<template>
  <div class="fight-buttons">
    <div class="message">{{ message }}</div>
    <div class="buttons-container">
      <button @click="fight('melee')">Melee Attack</button>
      <!-- Need to check if card is in players hand for bottom two -->
      <button v-if="playerHand.includes('Ammo')" @click="fight('ammo')">
        Ammo Attack
      </button>
      <button v-if="playerHand.includes('Molotov')" @click="fight('molotov')">
        Molotov Attack
      </button>
      <!-- Need to add die roll step -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'FightActions',
  data: function() {
    return {
      resolvedRoadCard: false,
      message: 'Chose your attack style'
    }
  },
  props: {
    currentCard: {
      type: Object
    },
    playerHand: {
      type: Array
    }
  },
  beforeCreate: function() {
    //Check hand status
  },
  methods: {
    fight: function(attack) {
      let numberToDefeat
      let roll
      let cardIndex

      if (attack == 'melee') {
        numberToDefeat = this.currentCard.melee
      } else if (attack == 'ammo') {
        numberToDefeat = this.currentCard.ammo
        cardIndex = this.playerHand.indexOf('Ammo')
        this.playerHand.splice(cardIndex, 1)
      } else if (attack == 'molotov') {
        numberToDefeat = this.currentCard.molotov
        cardIndex = this.playerHand.indexOf('Molotov')
        this.playerHand.splice(cardIndex, 1)
      }

      roll = this.getRandomInt(1, 10)
      if (roll >= numberToDefeat) {
        this.resolvedRoadCard = true
        this.message = `Great job you got him by rolling a ${roll}`
        setTimeout(() => {
          this.$emit('resolved-card', this.resolvedRoadCard)
        }, 3000)
      } else {
        if (attack == 'melee') {
          cardIndex = this.playerHand.indexOf('Health')
          if (cardIndex == -1) {
            this.gameOver = true
            this.message = `GAME OVER`
          } else {
            this.playerHand.splice(cardIndex, 1)
            this.message = `You rolled a ${roll} and you needed to roll a ${numberToDefeat}.  You lose one health card.`
          }
        } else {
          this.message = `You rolled a ${roll} and you needed to roll a ${numberToDefeat}`
        }
      }
    },
    getRandomInt: function(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
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
