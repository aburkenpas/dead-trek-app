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

<style scoped></style>
