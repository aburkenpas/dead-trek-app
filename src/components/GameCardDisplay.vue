<template>
  <div class="game-card-display-container">
    <div class="game-card-display">
      <slot>
        <RoadCard :currentCard="currentCard" />
      </slot>
    </div>
    <GameButtons v-if="isPlaying" @current-card="getCard" />
  </div>
</template>

<script>
import RoadCard from './RoadCard.vue'
import GameButtons from './GameButtons.vue'

export default {
  name: 'GameCardDisplay',
  components: {
    RoadCard,
    GameButtons
  },
  data: function() {
    return {
      currentCard: {
        type: 'Start'
      }
    }
  },
  props: {
    isPlaying: {
      type: Boolean
    }
  },
  methods: {
    getCard: function(card) {
      this.currentCard = card
      return this.currentCard
    }
  }
}
</script>

<style scoped>
.game-card-display {
  height: 500px;
  width: 500px;
  background: grey;
  margin: 0 auto;
}
</style>
