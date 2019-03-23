<template>
  <div class="buttons-container store-buttons">
    <button @click="looting">Loot Store</button>
    <button @click="skipping">Skip Store</button>
  </div>
</template>

<script>
export default {
  name: 'StoreActions',
  props: {
    currentCard: {
      type: Object
    }
  },
  methods: {
    looting: function() {
      this.$store.dispatch('lootingStatus', true)
    },
    skipping: function() {
      this.$store.dispatch('setRoadCardResolved', true)
    }
  }
}
</script>

<style scoped></style>
