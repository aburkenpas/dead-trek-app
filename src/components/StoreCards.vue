<template>
  <div v-if="currentLootCard != null" class="playable-store-cards">
    {{ currentLootCard.type }}
  </div>
</template>

<script>
export default {
  name: 'StoreCards',
  props: {
    currentLootCard: {
      type: Object
    }
  }
}
</script>

<style scoped></style>
