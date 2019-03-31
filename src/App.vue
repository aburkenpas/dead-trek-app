<template>
  <div id="app">
    <img
      class="logo"
      src="./assets/images/Dead Trek_Logo-White.png"
      alt="Dead Trek"
    />
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
@import url('https://fonts.googleapis.com/css?family=Bangers');
@font-face {
  font-family: 'VTC Letterer Pro';
  src: url('./assets/fonts/VTC_letterer_pro.ttf');
}

body {
  background: #000000;
  background-image: url('./assets/images/broken_noise.png');
}

#app {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-top: 30px;
  position: relative;
}

.message {
  font-family: 'Bangers', cursive;
  letter-spacing: 2px;
  color: white;
  font-size: 35px;
  width: 100%;
  text-align: center;
  margin: 30px auto;
  max-width: 600px;
  height: 120px;
}

.logo {
  position: absolute;
  width: 150px;
  height: auto;
}
</style>
