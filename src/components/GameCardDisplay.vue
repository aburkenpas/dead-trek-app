<template>
  <div class="game-card-display-container">
    <div class="game-card-display">
      <slot>
        <RoadCard v-if="!looting" />
        <StoreCards v-else />
      </slot>
    </div>
    <GameButtons v-if="playing" />
  </div>
</template>

<script>
import RoadCard from './RoadCard.vue'
import StoreCards from './StoreCards.vue'
import GameButtons from './GameButtons.vue'
import { mapState } from 'vuex'

export default {
  name: 'GameCardDisplay',
  components: {
    RoadCard,
    StoreCards,
    GameButtons
  },
  computed: mapState({
    playing: state => state.playing,
    looting: state => state.looting
  })
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
