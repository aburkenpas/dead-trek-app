<template>
  <div class="store-action-buttons">
    <button class="caution" v-if="!looting" @click="startLooting">
      Loot Store
    </button>
    <button class="caution" v-if="!looting" @click="skipping">
      Skip Store
    </button>
    <LootingActions v-if="looting" />
  </div>
</template>

<script>
import LootingActions from './LootingActions.vue'
import { mapState } from 'vuex'

export default {
  name: 'StoreActions',
  components: {
    LootingActions
  },
  computed: mapState({
    looting: state => state.looting
  }),
  methods: {
    startLooting: function() {
      // Set loot message
      let message = `See what you can find`

      // Set state to looting and update message
      this.$store.dispatch('updateMessage', message)
      this.$store.dispatch('lootingStatus', true)
    },
    skipping: function() {
      // Set skip message
      let message = `Not worth it! Play next road card`

      // Set state to looting and update message
      this.$store.dispatch('updateMessage', message)
      this.$store.dispatch('setRoadCardResolved', true)
    }
  }
}
</script>

<style scoped>
.store-action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}
</style>
