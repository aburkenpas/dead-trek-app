<template>
  <div class="road-card">
    <div class="current-card">{{ currentRoadCard }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RoadCard',
  computed: mapState({
    currentRoadCard: state => state.currentRoadCard.type
  })
}
</script>

<style scoped>
.current-card {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}
</style>
