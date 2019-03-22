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
      this.$emit('looting', true)
    },
    skipping: function() {
      this.$emit('skip-resolved-card', true)
    }
  }
}
</script>

<style scoped></style>
