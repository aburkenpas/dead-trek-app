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

<style lang="scss">
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

button {
  font-size: 20px;
  background: rgb(1, 89, 1);
  font-family: 'VTC Letterer Pro', sans-serif;
  color: #ffffff;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 6px #01300f;
  padding: 10px 40px;
  border: 0;
  border-radius: 3px;
  margin: 10px auto;
  display: block;
  position: relative;
  cursor: pointer;
  transition: none;
  outline: none;

  &:hover {
    box-shadow: 0 4px #01300f;
    top: 2px;
  }

  &:active {
    box-shadow: 0 0 #01300f;
    top: 6px;
  }
}

button.caution {
  background: #fdca40;
  box-shadow: 0 6px #b6922d;

  &:hover {
    box-shadow: 0 4px #b6922d;
    top: 2px;
  }

  &:active {
    box-shadow: 0 0 #b6922d;
    top: 6px;
  }
}

button.danger {
  background: rgb(147, 32, 11);
  box-shadow: 0 6px #6c0606;

  &:hover {
    box-shadow: 0 4px #6c0606;
    top: 2px;
  }

  &:active {
    box-shadow: 0 0 #6c0606;
    top: 6px;
  }
}

@media screen and (max-width: 950px) {
  .logo {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 150px;
    height: auto;
  }
}
</style>
