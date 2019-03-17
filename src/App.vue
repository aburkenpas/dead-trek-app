<template>
  <div id="app">
    <GameCardDisplay :isPlaying="isPlaying" />
    <PlayerSupplyCards @started-game="startGame" />
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
      isPlaying: false
    }
  },
  methods: {
    startGame: function() {
      this.isPlaying = true
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
