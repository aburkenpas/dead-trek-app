<template>
  <div id="app">
    <GameCardDisplay :isPlaying="isPlaying" :playerHand="playerHand" />
    <PlayerSupplyCards
      @started-game="startGame"
      @players-cards="setPlayerCards"
    />
  </div>
</template>

<script>
import GameCardDisplay from './components/GameCardDisplay.vue'
import PlayerSupplyCards from './components/PlayerSupplyCards.vue'

export default {
  name: 'app',
  components: {
    PlayerSupplyCards,
    GameCardDisplay
  },
  data: function() {
    return {
      isPlaying: false,
      playerHand: []
    }
  },
  methods: {
    startGame: function() {
      this.isPlaying = true
    },
    setPlayerCards: function(hand) {
      this.playerHand = hand
    }
  }
}
</script>

<style>
body {
  background: #000;
}
#app {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>
