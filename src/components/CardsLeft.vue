<template>
  <div class="cards-left">
    <div class="display-container">
      <div class="title">Cards Left</div>
      <div class="number">{{ cardsLeft }}</div>
    </div>
    <div class="display-container">
      <div class="title">Block</div>
      <div class="number">{{ cardsLeftInBlock }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CardsLeft',
  computed: mapState({
    cardsLeft: state => state.cardsLeft,
    cardsLeftInBlock: state => state.cardsLeftInBlock
  })
}
</script>

<style scoped>
.cards-left {
  position: absolute;
  color: white;
  width: 70px;
  padding-top: 10px;
  right: 0;
}

.title {
  font-family: 'VTC Letterer Pro', sans-serif;
  text-align: center;
}

.number {
  font-family: 'Bangers', cursive;
  font-size: 40px;
  text-align: center;
  padding-bottom: 8px;
}

@media screen and (max-width: 950px) {
  .cards-left {
    position: relative;
    display: flex;
    color: white;
    width: 200px;
    margin: 20px auto 0;
    padding-top: 10px;
    right: 0;
  }

  .display-container {
    padding: 0 20px;
  }
}
</style>
