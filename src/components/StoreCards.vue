<template>
  <div v-if="currentLootCard != null" class="playable-store-cards">
    {{ currentLootCard.type }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StoreCards',
  computed: mapState({
    currentLootCard: state => state.currentLootCard,
    looting: state => state.looting
  })
}
</script>

<style scoped></style>
