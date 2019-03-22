<template>
  <div class="road-card">
    <div class="current-card">{{ currentCard.type }}</div>
  </div>
</template>

<script>
export default {
  name: 'RoadCard',
  props: {
    currentCard: {
      type: Object
    }
  }
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
