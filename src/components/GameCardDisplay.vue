<template>
  <div class="game-card-display-container">
    <div class="game-card-display">
      <slot>
        <RoadCard v-if="!isLooting" :currentCard="currentCard" />
        <StoreCards v-else :currentLootCard="currentLootCard" />
      </slot>
    </div>
    <GameButtons
      v-if="isPlaying"
      :playerHand="playerHand"
      @current-card="getCard"
      @is-looting="isGoingToLooting"
      @current-looting-card="setCurrentLootCard"
    />
  </div>
</template>

<script>
import RoadCard from './RoadCard.vue'
import StoreCards from './StoreCards.vue'
import GameButtons from './GameButtons.vue'

export default {
  name: 'GameCardDisplay',
  components: {
    RoadCard,
    StoreCards,
    GameButtons
  },
  data: function() {
    return {
      currentCard: {
        type: 'Start'
      },
      isLooting: false,
      currentLootCard: null
    }
  },
  props: {
    isPlaying: {
      type: Boolean
    },
    playerHand: {
      type: Array
    }
  },
  methods: {
    getCard: function(card) {
      this.currentCard = card
      return this.currentCard
    },
    isGoingToLooting: function(looting) {
      this.isLooting = looting
      return this.isLooting
    },
    setCurrentLootCard: function(lootCard) {
      this.currentLootCard = lootCard
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
