<template>
  <div class="player-supply-cards">
    <slot>
      <ShuffleButton />
    </slot>
    <div class="current-hand">
      <div class="card" v-for="card in playerSupplyCards" :key="card.id">
        <img
          v-if="card.type == 'Ammo'"
          src="../assets/images/cards/supply/ammo.png"
          :alt="card"
        />
        <img
          v-else-if="card.type == 'Health'"
          src="../assets/images/cards/supply/health.png"
          :alt="card"
        />
        <img
          v-else-if="card.type == 'Molotov'"
          src="../assets/images/cards/supply/molotov.png"
          :alt="card"
        />
        <img
          v-else-if="card.type == 'Special' && card.type == 'Chainsaw'"
          src="../assets/images/cards/loot/chainsaw.png"
          alt
        />
        <img
          v-else-if="card.type == 'Special' && card.type == 'Flame Thrower'"
          src="../assets/images/cards/loot/flame-thrower.png"
          alt
        />
        <img
          v-else-if="card.type == 'Special' && card.type == 'Minigun'"
          src="../assets/images/cards/loot/minigun.png"
          alt
        />
        <img
          v-else-if="card.type == 'Special' && card.type == 'Grenade'"
          src="../assets/images/cards/loot/grenade.png"
          alt
        />
        <img
          v-else-if="card.type == 'Special' && card.type == 'Bazooka'"
          src="../assets/images/cards/loot/bazooka.png"
          alt
        />
        <img
          v-else-if="card.type == 'Food' || card.type == 'Hunting'"
          src="../assets/images/cards/loot/food.png"
          :alt="card"
        />
        <img
          v-else-if="card.type == 'Start'"
          src="../assets/images/cards/supply/supply-card-back.png"
          :alt="card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ShuffleButton from './ShuffleButton.vue'
import { mapState } from 'vuex'

export default {
  name: 'PlayerSupplyCards',
  components: {
    ShuffleButton
  },
  computed: mapState({
    playerSupplyCards: state => state.playerSupplyCards
  })
}
</script>

<style>
.current-hand {
  display: flex;
  justify-content: space-around;
}

.card img {
  width: 100%;
}
</style>
