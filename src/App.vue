<template>
  <div id="app">
    <CardsLeft />
    <div class="message">{{ message }}</div>
    <GameCardDisplay />
    <PlayerSupplyCards />
  </div>
</template>

<script>
import CardsLeft from './components/CardsLeft.vue'
import GameCardDisplay from './components/GameCardDisplay.vue'
import PlayerSupplyCards from './components/PlayerSupplyCards.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    CardsLeft,
    PlayerSupplyCards,
    GameCardDisplay
  },
  computed: mapState({
    message: state => state.message
  })
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

.message {
  color: white;
  font-size: 24px;
  width: 100%;
  text-align: center;
  margin: 30px 0;
}
</style>
